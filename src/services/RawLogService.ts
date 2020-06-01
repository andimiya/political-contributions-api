/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import { APIGatewayEvent } from 'aws-lambda';
import dbConnect from '../lib/dbConnect';
import { RawLog, API, STATUS } from '../entities/RawLog';
import RawLogParam from '../interfaces/RawLogParam';
import InvalidRawLogResponse from '../interfaces/InvalidRawLogResponse';
import RawLogResponse from '../interfaces/RawLogResponse';

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

    await Promise.all(this.logs.map(log => this.validateAndSave(log)))

    return {
      record_count: this.validLogs,
      errors: this.invalidLogs,
    };
  }

  static assignRawLogParams(params: RawLogParam): RawLog {
    const rawLog = new RawLog();
    rawLog.api = API[params.api];
    rawLog.mccmnc = params.mccmnc;
    rawLog.timestamp = (new Date(params.timestamp));
    rawLog.status = (params.status ? STATUS[params.status] : null);
    rawLog.client_id = params.client_id;

    return rawLog;
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

  async validateAndSave(log: RawLogParam): Promise<any> {
    try {
      const rawLog = RawLogService.assignRawLogParams(log);
      if (await rawLog.isValid()) {
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
