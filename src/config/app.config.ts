import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'Realworld API',
  env: process.env.APP_ENV || 'local',
  url: process.env.APP_URL || 'http://localhost:8080',
  port: parseInt(process.env.APP_PORT ?? '8080', 10),
  debug: process.env.APP_DEBUG === 'true',
  logLevel: process.env.APP_LOG_LEVEL || 'debug',
}));
