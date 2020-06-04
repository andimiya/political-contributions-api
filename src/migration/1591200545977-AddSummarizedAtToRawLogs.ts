/* eslint class-methods-use-this: ["error", { "exceptMethods": ["up", "down"] }] */
/* eslint-disable import/prefer-default-export */

import {
  MigrationInterface, QueryRunner, TableColumn, TableIndex,
} from 'typeorm';

export class AddSummarizedAtToRawLogs1591200545977 implements MigrationInterface {
  name = 'AddSummarizedAtToRawLogs1591200545977';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('raw_logs', [
      new TableColumn({
        name: 'summarized_at',
        type: 'timestamp',
        isNullable: true,
      }),
    ]);

    await queryRunner.createIndex(
      'raw_logs',
      new TableIndex({
        name: 'index_raw_logs_summarized_at',
        columnNames: ['summarized_at'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX "index_raw_logs_summarized_at";',
    );
    await queryRunner.query(
      `ALTER TABLE "raw_logs"
      DROP "summarized_at"`,
      undefined,
    );
  }
}
