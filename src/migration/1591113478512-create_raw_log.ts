/* eslint class-methods-use-this: ["error", { "exceptMethods": ["up", "down"] }] */
/* eslint-disable import/prefer-default-export */

import {
  MigrationInterface, QueryRunner, Table,
} from 'typeorm';

export class CreateRawLogs1591113478512 implements MigrationInterface {
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
            isNullable: false,
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
            isNullable: false,
          },
          {
            name: 'redirect_uri',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'correlation_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'integer',
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
            isNullable: false,
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
          {
            name: 'usertrait',
            type: 'varchar',
            isNullable: true,
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
