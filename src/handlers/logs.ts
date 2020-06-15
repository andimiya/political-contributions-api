import { APIGatewayEvent } from 'aws-lambda';
import dbConnect from '../lib/dbConnect';
import RawLogService from '../services/RawLogService';
import QueryLogService from '../services/QueryLogService';
import Response from '../interfaces/Response';
import { errorResponse, invalidResponse } from '../lib/HTTPResponse';

let db; // Memoize db - lambda can reuse this connection

const query = async (event: APIGatewayEvent): Promise<Response> => {
  try {
    db = (db || await dbConnect());
    if (!event.queryStringParameters) return invalidResponse('Must provide query params');

    return QueryLogService(db, event.queryStringParameters);
  } catch (e) {
    return errorResponse(e.message);
  }
};

const create = async (event: APIGatewayEvent): Promise<Response> => {
  try {
    if (!event.body) return invalidResponse('Must provide body params');

    const logs = JSON.parse(event.body).audit_log;
    db = (db || await dbConnect());
    const rawLogService = new RawLogService(logs, event.path, db);

    return rawLogService.createRawLog();
  } catch (e) {
    return errorResponse(e.message);
  }
};


export {
  create, // eslint-disable-line import/prefer-default-export
  query,
};
