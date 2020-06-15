import { Connection } from 'typeorm';
import { QueryLogSchema } from './queryLogSchema';

const BASIC_FIELDS = [
  'mccmnc',
  'carrier',
  'api',
  'flow',
  'acr_value',
  'sdk_version',
];

function basicFields(queryLog: QueryLogSchema): string {
  return BASIC_FIELDS.map((field) => {
    let value = queryLog[field];

    if (value === undefined) return '';
    if (typeof value === 'string') value = `'${value}'`;

    return ` AND ${field} = ${value}`;
  }).join('');
}

function dateRange(queryLog: QueryLogSchema): string {
  if (!queryLog.starts_at || !queryLog.ends_at) return '';

  return `AND summarized_at between '${queryLog.starts_at}' AND '${queryLog.ends_at}'`;
}

function errorState(queryLog: QueryLogSchema): string {
  if (!queryLog.success) return '';

  return queryLog.success.toLowerCase() === 'true' ? ' AND error IS NULL' : ' AND error IS NOT NULL';
}

function baseQuery(whereClause: string, clientId: string): string {
  return `
    SELECT
      carrier,
      mccmnc,
      api,
      flow,
      client_id,
      error,
      error_description,
      acr_value,
      sdk_version,
      summarized_at,
      SUM(count) as count
    FROM raw_log_summaries
    WHERE client_id = '${clientId}' ${whereClause}
    GROUP BY carrier, mccmnc, api, flow, client_id, error, error_description,
             acr_value, sdk_version, summarized_at
  `;
}

export default async (db: Connection, queryLog: QueryLogSchema): Promise<any> => {
  const whereClause = basicFields(queryLog) + dateRange(queryLog) + errorState(queryLog);
  const query = baseQuery(whereClause, queryLog.client_id);
  const queryRunner = db.createQueryRunner();

  return queryRunner.query(query);
};
