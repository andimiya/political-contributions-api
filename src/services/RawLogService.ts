/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import { Connection } from 'typeorm';
import { RawLog } from '../entities/RawLog';
import Response from '../interfaces/Response';
import { response } from '../lib/HTTPResponse';
import RawLogParser from '../lib/RawLog/RawLogParser';
import RawLogParam from '../interfaces/RawLogParam';
import InvalidRawLogResponse from '../interfaces/InvalidRawLogResponse';
import apiValidators from '../lib/RawLog/apiValidators';
import mccmnc from '../lib/mccmnc';


export default class RawLogService {
  constructor(logs: RawLogParam[], carrierPath: string, db: Connection) {
    this.db = db;
    this.logs = logs;
    this.carrierPath = carrierPath;
    this.validLogs = 0;
    this.invalidLogs = [];
  }

  async createRawLog(): Promise<Response> {
    await Promise.all(this.logs.map((log) => this.validateAndSave(log)));

    const body = {
      record_count: this.validLogs,
      errors: this.invalidLogs,
    };
    return response(body, 201);
  }

  static invalidLogResponse(rawLog: RawLog, log: RawLogParam): InvalidRawLogResponse {
    return {
      reason: rawLog.validationErrorMessages.join(', '),
      record: log,
    };
  }

  static exceptionLogResponse(error: Error, log: RawLogParam): InvalidRawLogResponse {
    return {
      reason: error.message,
      record: log,
    };
  }

  isValidApi(rawLog: RawLog): boolean { // eslint-disable-line class-methods-use-this
    switch (rawLog.api) {
      case 'authorize':
        return apiValidators.validateAuthorizeApi(rawLog);
      case 'token':
        return apiValidators.validateTokenApi(rawLog);
      case 'userinfo':
        return apiValidators.validateUserinfoApi(rawLog);
      case 'userinfo2':
        return apiValidators.validateUserinfoApi(rawLog);
      case 'set':
        return apiValidators.validateSetApi(rawLog);
      case 'usertrait':
        return apiValidators.validateUsertraitApi(rawLog);
      case 'create':
        return apiValidators.validateCreateApi(rawLog);
      case 'provision':
        return apiValidators.validateProvisionApi(rawLog);
      default:
        throw new Error('Provided API does not exist');
    }
  }

  pathMatchesMccmnc(rawLog: RawLog): boolean {
    if (rawLog.mccmnc !== undefined && `/${mccmnc[rawLog?.mccmnc]}` === this.carrierPath) return true;

    const errMsg = `Provided MCCMNC does not match the request path ${this.carrierPath}`;
    rawLog.validationErrorMessages.push(errMsg);
    return false;
  }

  async isValid(rawLog: RawLog): Promise<boolean> {
    return (
      this.pathMatchesMccmnc(rawLog) // Validate log's MCCMNC against request path
      && await rawLog.isValid() // Check Model Validations
      && this.isValidApi(rawLog) // Check API Specific Validations
    );
  }

  async validateAndSave(log: RawLogParam): Promise<any> {
    try {
      const rawLog = RawLogParser(log);

      if (await this.isValid(rawLog)) {
        await this.db.getRepository(RawLog).save(rawLog);
        this.validLogs += 1;
      } else {
        const invalidLogResp = RawLogService.invalidLogResponse(rawLog, log);
        this.invalidLogs.push(invalidLogResp);
      }
    } catch (e) {
      const invalidLogResp = RawLogService.exceptionLogResponse(e, log);
      this.invalidLogs.push(invalidLogResp);
    }
  }

  // Instance Variable Definitions
  db;

  logs;

  validLogs;

  invalidLogs;

  rawLogRepo;

  carrierPath;
}
