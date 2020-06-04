import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { RawLog } from '../entities/RawLog';
import { RawLogSummary } from '../entities/RawLogSummary';

const connectionConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.aws_db_host,
  port: 5432,
  username: process.env.aws_db_username,
  password: process.env.aws_db_password,
  database: process.env.aws_db_name,
  entities: [RawLog, RawLogSummary],
  synchronize: false,
  logging: true,
};

export default async function dbConnect(): Promise<Connection> {
  return createConnection(connectionConfig);
}
