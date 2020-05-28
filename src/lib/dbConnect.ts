import { createConnection, ConnectionOptions } from 'typeorm';
import { RawLog } from '../entities/RawLog';

const connectionConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.aws_db_host,
  port: 5432,
  username: process.env.aws_db_username,
  password: process.env.aws_db_password,
  database: process.env.aws_db_name,
  entities: [RawLog],
  synchronize: false,
  logging: true,
};

export default async function dbConnect(): Promise<any> {
  return createConnection(connectionConfig);
}
