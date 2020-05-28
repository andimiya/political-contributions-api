/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import { APIGatewayEvent } from 'aws-lambda';
import dbConnect from '../lib/dbConnect';
import { RawLog, API, STATUS } from '../entities/RawLog';
import RawLogParam from '../interfaces/RawLogParam';

let db;

function assignRawLogParams(rawLog: RawLog, params: RawLogParam): RawLog {
  rawLog.api = API[params.api];
  rawLog.mccmnc = params.mccmnc;
  rawLog.timestamp = (new Date(params.timestamp));
  rawLog.status = (params.status ? STATUS[params.status] : null);
  rawLog.client_id = params.client_id;

  return rawLog;
}

const createRawLog = async (event: APIGatewayEvent): Promise<any> => {
  if (!event.body) { throw new Error('Must provide body params'); }
  db = (db || await dbConnect());

  const params = JSON.parse(event.body);
  let rawLog = new RawLog();
  rawLog = assignRawLogParams(rawLog, params.raw_log);

  const valid = await rawLog.isValid();
  if (valid) {
    await db.getRepository(RawLog).save(rawLog);
  } else {
    throw new Error(rawLog.validationErrors);
  }
};

export {
  createRawLog,
};
