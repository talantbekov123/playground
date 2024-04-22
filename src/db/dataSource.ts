import { types } from 'pg';
import { DataSource, DataSourceOptions } from 'typeorm';
import { entities } from './entity';
import { getConfig } from '../config';

const config = getConfig();

// Set type parser for numeric (includes decimal) types
types.setTypeParser(
  // 1700 is a numeric type oid
  1700,
  // Convert to float
  (v) => parseFloat(v),
);

export interface DBConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export const getConnectionOptions = (
  dbConfig: DBConfig,
  host?: string,
): DataSource => {
  const config = dbConfig;

  const connectionOptions: DataSourceOptions = {
    type: 'postgres',
    host: host || config.host,
    port: config.port,
    database: config.database,
    username: config.username,
    password: config.password,
    logging: false,
    synchronize: false,
    migrationsRun: false,
    entities,
    migrations: [`${__dirname}/**/migration/*.{ts,js}`],
  };

  const dataSource = new DataSource(connectionOptions);

  return dataSource;
};

const dataSource = getConnectionOptions(
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_NAME,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
  },
  process.env.DB_HOST,
);

export default dataSource;
