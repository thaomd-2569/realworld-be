import { Logger, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class CustomLogger implements Logger {
  private logFile: string;

  constructor() {
    const logDir = path.resolve(__dirname, '../../src/logs'); // customize

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    this.logFile = path.join(logDir, `${today}.logs`);
  }

  private write(message: string) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(this.logFile, `[${timestamp}] ${message}\n`);
  }

  private formatQuery(query: string, parameters?: any[]) {
    let formatted = query;
    if (parameters && parameters.length) {
      parameters.forEach((param, i) => {
        const value =
          typeof param === 'string' ? `'${param.replace(/'/g, "''")}'` : param;
        formatted = formatted.replace(`$${i + 1}`, value);
      });
    }
    return formatted;
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.write(`SQL: ${this.formatQuery(query, parameters)}`);
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    this.write(`❌ ERROR: ${error} | ${this.formatQuery(query, parameters)}`);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    this.write(
      `⚠️ SLOW QUERY (${time}ms): ${this.formatQuery(query, parameters)}`,
    );
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.write(`🛠 SCHEMA: ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.write(`📦 MIGRATION: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    if (level !== 'info') {
      this.write(`${level.toUpperCase()}: ${message}`);
    }
  }
}
