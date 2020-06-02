/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import { APIGatewayEvent } from 'aws-lambda';
import dbConnect from '../lib/dbConnect';
import { RawLog } from '../entities/RawLog';
import RawLogParser from '../lib/RawLog/RawLogParser';
import RawLogParam from '../interfaces/RawLogParam';
import InvalidRawLogResponse from '../interfaces/InvalidRawLogResponse';
import RawLogResponse from '../interfaces/RawLogResponse';
import apiValidators from '../lib/RawLog/apiValidators';

let db; // Memoize db - lambda can reuse this

export default class RawLogService {
  constructor(event: APIGatewayEvent) {
    if (!event.body) { throw new Error('Must provide body params'); }

    this.logs = JSON.parse(event.body).audit_log;
    this.validLogs = 0;
    this.invalidLogs = [];
  }

  async createRawLog(): Promise<RawLogResponse> {
    db = (db || await dbConnect());

    await Promise.all(this.logs.map((log) => this.validateAndSave(log)));

    return {
      record_count: this.validLogs,
      errors: this.invalidLogs,
    };
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
    switch (rawLog.apiType()) {
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

  async isValid(rawLog: RawLog): Promise<boolean> {
    return (
      await rawLog.isValid() // Check Model Validations
      && this.isValidApi(rawLog) // Check API Specific Validations
    );
  }

  async validateAndSave(log: RawLogParam): Promise<any> {
    try {
      const rawLog = RawLogParser(log);

      if (await this.isValid(rawLog)) {
        db.getRepository(RawLog).save(rawLog);
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
  logs;

  validLogs;

  invalidLogs;

  rawLogRepo;
}
