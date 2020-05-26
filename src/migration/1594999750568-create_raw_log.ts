/* eslint class-methods-use-this: ["error", { "exceptMethods": ["up", "down"] }] */
/* eslint-disable import/prefer-default-export */

import {
  MigrationInterface, QueryRunner, Table,
} from 'typeorm';

export class CreateRawLogs1574118091844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'raw_logs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'api',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'flow',
            type: 'integer',
            default: 0,
          },
          {
            name: 'mccmnc',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'timestamp',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'client_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'redirect_uri',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'correlation_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'integer',
            default: 0,
            isNullable: false,
          },
          {
            name: 'error',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'error_description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'sub',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'context',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'acr_value',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sdk_version',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'event',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'scopes',
            type: 'varchar',
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('raw_logs');
  }
}
