/* eslint class-methods-use-this: ["error", { "exceptMethods": ["up", "down"] }] */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-multi-str */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class RawLogUniqueness1591113555516 implements MigrationInterface {
  name = 'RawLogUniqueness1591113555516';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE UNIQUE INDEX \"raw_logs_uniqueness_index\" ON \"raw_logs\" \
            (api, status, mccmnc, timestamp, client_id, COALESCE(redirect_uri, ''), \
            correlation_id, COALESCE(usertrait, ''), COALESCE(error, ''), \
            COALESCE(error_description, ''), sub, COALESCE(context, ''), \
            COALESCE(acr_value, ''), COALESCE(sdk_version, ''), \
            COALESCE(event, ''), COALESCE(scopes, ''), COALESCE(flow, ''))",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX "raw_logs_uniqueness_index";',
    );
  }
}
