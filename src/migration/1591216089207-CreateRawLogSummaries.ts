/* eslint class-methods-use-this: ["error", { "exceptMethods": ["up", "down"] }] */
/* eslint-disable import/prefer-default-export */

import {
  MigrationInterface, QueryRunner, TableIndex, Table,
} from 'typeorm';

export class CreateRawLogSummaries1591216089207 implements MigrationInterface {
  name = 'CreateRawLogSummaries1591216089207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'raw_log_summaries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'carrier',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'mccmnc',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'service',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'count',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'client_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'error',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'error_description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'acr_value',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'sdk_version',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'summarized_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'raw_log_summaries',
      new TableIndex({
        name: 'index_raw_log_summaries_summarized_at',
        columnNames: ['summarized_at'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX "index_raw_log_summaries_summarized_at";',
    );
    await queryRunner.dropTable('raw_log_summaries');
  }
}
