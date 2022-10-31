import mysql, { PoolConfig, Pool as PoolType, QueryOptions } from 'mysql';
import Pool from 'mysql/lib/Pool';
import Connection from 'mysql/lib/Connection';
import bluebird from 'bluebird';

bluebird.promisifyAll([Pool, Connection]);

/**
 * Type definition for the promisified Pool type.
 *
 * This has to be updated manually with new promisified methods
 * that users will like to access.
 */
export interface AsyncMySqlPool extends PoolType {
  queryAsync: (options: string | QueryOptions, values?: any) => Promise<any>;
}

/**
 * Attempts to connect to the database by the connection string. If no connection string
 * argument is provided, it tries to use the `DATABASE_URL` environment variable
 * as connection string.
 *
 * This returns a mysql pool connection object.
 */
export const createMySqlPool = (connection?: string): AsyncMySqlPool => {
  const config: PoolConfig = {
    connectionLimit: 1,
    multipleStatements: true,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3000'),
    connectTimeout: 30000, // 30 seconds
    charset: 'utf8mb4'
  };

  return mysql.createPool(config) as AsyncMySqlPool;
};
