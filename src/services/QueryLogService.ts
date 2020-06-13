/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { Connection } from 'typeorm';

import Response from '../interfaces/Response';
import { errorResponse, invalidResponse, response } from '../lib/HTTPResponse';
import { QueryLogSchema } from '../lib/queryLogSchema';
import queryLogBuilder from '../lib/queryLogBuilder';

function parseQueryLog(params: any): QueryLogSchema {
  const schema = new QueryLogSchema();
  schema.client_id = params.client_id;
  schema.api = params.api;
  schema.mccmnc = (params.mccmnc ? parseInt(params.mccmnc) : undefined);
  schema.carrier = params.carrier;
  schema.success = params.success;
  schema.flow = params.flow;
  schema.acr_value = params.acr_value;
  schema.sdk_version = params.sdk_version;
  schema.starts_at = params.starts_at;
  schema.ends_at = params.ends_at;

  return schema;
}

export default async (db: Connection, params: any): Promise<Response> => {
  try {
    const queryLog = parseQueryLog(params);
    const valid = await queryLog.isValid();
    if (!valid) return invalidResponse(queryLog.validationErrorMessages);

    const body = { data: await queryLogBuilder(db, queryLog) };
    return response(body);
  } catch (e) {
    return errorResponse(e.message);
  }
};
