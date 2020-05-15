import { createConnection } from 'typeorm';

export default async function createDbConnection() {
  return createConnection({
    type: 'aurora-data-api',
    port: process.env.aws_db_port,
    resourceArn: process.env.aws_db_resource_arn,
    secretArn: process.env.aws_db_secret_arn,
    database: process.env.aws_db_name,
    region: 'us-west-2',
    entities: [
      `${__dirname}../entity/*.js`,
    ],
    subscribers: [
      `${__dirname}../subscriber/*.js`,
    ],
    migrations: [
      `${__dirname}../migration/*.js`,
    ],
    cli: {
      entitiesDir: '../entity',
      migrationsDir: '../migration',
      subscribersDir: '../subscriber',
    },
    synchronize: true,
  });
}
