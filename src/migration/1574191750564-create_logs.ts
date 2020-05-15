import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateLogs1574118091844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'log',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'record',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );

  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('log');
  }
}
