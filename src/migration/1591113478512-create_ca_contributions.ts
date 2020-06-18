/* eslint class-methods-use-this: ["error", { "exceptMethods": ["up", "down"] }] */
/* eslint-disable import/prefer-default-export */

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRawLogs1591113478512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "ca_contributions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "payee",
            type: "varchar",
          },
          {
            name: "amount_paid",
            type: "integer",
          },
          {
            name: "date_paid",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "contributor",
            type: "varchar",
          },
          {
            name: "period_start",
            type: "timestamp",
          },
          {
            name: "period_end",
            type: "timestamp",
          },
          {
            name: "recipient_city",
            type: "varchar",
          },
          {
            name: "recipient_state",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamptz",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamptz",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("ca_contributions");
  }
}
