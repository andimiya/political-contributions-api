import * as moment from 'moment';
import {
  RawLog, API, STATUS, FLOW,
} from '../../entities/RawLog';
import RawLogParam from '../../interfaces/RawLogParam';

function validateTimestampGranularity(timestamp: Date): any {
  if (moment(timestamp, 'YYYY-MM-DD HH:mm:ss:SS', true).isValid()) return;

  throw new Error('Timestamp must be in \'YYYY-MM-DD HH:mm:ss:SS\' format');
}

export default function RawLogParser(params: RawLogParam): RawLog {
  validateTimestampGranularity(params.timestamp);

  const rawLog = new RawLog();
  if (params.flow !== undefined) {
    rawLog.flow = FLOW[params.flow.toLowerCase()];
  }
  if (typeof params.api !== undefined) {
    rawLog.api = API[params.api.toLowerCase()];
  }
  if (params.status !== undefined) {
    rawLog.status = STATUS[params.status.toLowerCase()];
  }
  rawLog.mccmnc = params.mccmnc;
  rawLog.timestamp = (new Date(params.timestamp));
  rawLog.client_id = params.client_id;
  rawLog.scopes = params.scopes;
  rawLog.redirect_uri = params.redirect_uri;
  rawLog.correlation_id = params.correlation_id;
  rawLog.error = params.error;
  rawLog.error_description = params.error_description;
  rawLog.sub = params.sub;
  rawLog.context = params.context;
  rawLog.acr_value = params.acr_value;
  rawLog.sdk_version = params.sdk_version;
  rawLog.event = params.event;
  rawLog.usertrait = params.usertrait;

  return rawLog;
}
