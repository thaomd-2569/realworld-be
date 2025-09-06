import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './database-config.type';

export default registerAs<DatabaseConfig>('database', () => ({
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  name: process.env.DB_NAME || 'testdb',
}));
