/* eslint-disable no-multi-str */
import * as moment from 'moment';
import { Connection } from 'typeorm';

const mccmncCaseStatement = `
  CASE
    WHEN (mccmnc=310160 OR mccmnc=310200 OR mccmnc=310210 OR mccmnc=310220 OR mccmnc=310230 OR mccmnc=310240 OR mccmnc=310250 OR mccmnc=310260 OR mccmnc=310270 OR mccmnc=310310 OR mccmnc=310490 OR mccmnc=310660 OR mccmnc=310800) THEN 'tmobile'
    WHEN (mccmnc=310010 OR mccmnc=310012 OR mccmnc=310013 OR mccmnc=310590 OR mccmnc=310890 OR mccmnc=310910 OR mccmnc=311110 OR mccmnc=311270 OR mccmnc=311271 OR mccmnc=311272 OR mccmnc=311273 OR mccmnc=311274 OR mccmnc=311275 OR mccmnc=311276 OR mccmnc=311277 OR mccmnc=311278 OR mccmnc=311279 OR mccmnc=311280 OR mccmnc=311281 OR mccmnc=311282 OR mccmnc=311283 OR mccmnc=311284 OR mccmnc=311285 OR mccmnc=311286 OR mccmnc=311287 OR mccmnc=311288 OR mccmnc=311289 OR mccmnc=311390 OR mccmnc=311480 OR mccmnc=311481 OR mccmnc=311482 OR mccmnc=311483 OR mccmnc=311484 OR mccmnc=311485 OR mccmnc=311486 OR mccmnc=311487 OR mccmnc=311488 OR mccmnc=311489) THEN 'verizon'
    WHEN (mccmnc=312530 OR mccmnc=310120) THEN 'sprint'
    WHEN (mccmnc=310007 OR mccmnc=310560 OR mccmnc=310680 OR mccmnc=310150 OR mccmnc=310170 OR mccmnc=310380 OR mccmnc=310280 OR mccmnc=310410 OR mccmnc=313100) THEN 'att'
  END
`;

function rawLogIdSql(date: string): string {
  return `SELECT id FROM raw_logs WHERE summarized_at IS NULL AND raw_logs.timestamp::date = '${date}'`;
}

function rawLogSummarySql(summaryDate: string, summaryDateTime: string, ids: string[]): string {
  return `
    SELECT
      ${mccmncCaseStatement} AS carrier,
      mccmnc,
      api,
      flow,
      client_id,
      error,
      error_description,
      acr_value,
      sdk_version,
      TO_TIMESTAMP('${summaryDateTime}', 'YYYY-MM-DD HH24:MI:SS:MS')::TIMESTAMP as summarized_at,
      COUNT(DISTINCT(id)) as count
    FROM raw_logs
    WHERE raw_logs.summarized_at IS NULL AND raw_logs.timestamp::date = '${summaryDate}' AND id IN (${ids})
    GROUP BY carrier, mccmnc, api, flow, client_id, error, error_description, acr_value, sdk_version, raw_logs.timestamp::date`;
}

function insertIntoRawLogSummariesSql(summarySql: string): string {
  return `INSERT INTO raw_log_summaries (carrier, mccmnc, api, flow, client_id, error, error_description, acr_value, sdk_version, summarized_at, count) \
          ${summarySql};`;
}

function updateSummarizedAtSql(summaryDateTime: string, ids: string[]): string {
  return `
    UPDATE raw_logs SET summarized_at = TO_TIMESTAMP('${summaryDateTime}', 'YYYY-MM-DD HH24:MI:SS:MS')::TIMESTAMP
    WHERE id IN (${ids});
  `;
}

export default async (db: Connection): Promise<void> => {
  // Setup
  const queryRunner = db.createQueryRunner();
  const now = moment().utc();
  const summaryDateTime = now.format('YYYY-MM-DD HH:mm:ss:SS');
  const summaryDate = now.format('YYYY-MM-DD'); // TODO: Summary date will be set by the CRON job.

  // Take a snapshot of logs we'll be processing by collect their IDs
  // This prevents any issues arrising from records being added during processing
  // If there are no IDs/RawLogs to process we early-return
  let ids = await queryRunner.query(rawLogIdSql(summaryDate));
  if (Object.keys(ids).length === 0) return;
  ids = ids.map((result) => `'${result.id}'`);

  // Wrap inserts in a DB Transaction
  try {
    // Results of summarySql query is used to insert records into the raw_log_summaries table
    const summarySql = rawLogSummarySql(summaryDate, summaryDateTime, ids);
    const insertQuery = insertIntoRawLogSummariesSql(summarySql);
    await queryRunner.startTransaction();
    await queryRunner.query(insertQuery);

    // If successful we'll udpate the records of the saved IDs
    const updateSummarizedSql = updateSummarizedAtSql(summaryDateTime, ids);
    await queryRunner.query(updateSummarizedSql);
    await queryRunner.commitTransaction();
  } catch (e) {
    // Rollback inserts on error
    await queryRunner.rollbackTransaction();
    throw e;
  }
};
