import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import * as process from 'node:process';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { seeds } from '../seeds';

dotenv.config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOSTNAME,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '../../**/*.entity.{js,ts}')],
  seeds: [...seeds],
  migrations: [join(__dirname, '../migrations/*.{js,ts}')],
  synchronize: false,
  logging: true,
};
const PostgresConfig = new DataSource(dataSourceOptions);

export default PostgresConfig;
