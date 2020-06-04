import { APIGatewayEvent } from 'aws-lambda';
import dbConnect from '../lib/dbConnect';
import RawLogService from '../services/RawLogService';
import summarizeRawLogs from '../lib/RawLogSummary/summarizeRawLogs';

let db; // Memoize db - lambda can reuse this connection

const test = async (): Promise<any> => {
  db = (db || await dbConnect());
  await summarizeRawLogs(db);
  return { statusCode: 204, headers: {} };
};

const create = async (event: APIGatewayEvent): Promise<any> => {
  let response;

  try {
    if (!event.body) { throw new Error('Must provide body params'); }

    const logs = JSON.parse(event.body).audit_log;
    db = (db || await dbConnect());
    const rawLogService = new RawLogService(logs, event.path, db);
    const responseBody = await rawLogService.createRawLog();
    response = {
      statusCode: 201,
      headers: {},
      body: JSON.stringify(responseBody),
    };
  } catch (e) {
    response = {
      statusCode: 500,
      headers: {},
      body: JSON.stringify({ error: e.message }),
    };
  }

  return response;
};


export {
  create, // eslint-disable-line import/prefer-default-export
  test,
};
