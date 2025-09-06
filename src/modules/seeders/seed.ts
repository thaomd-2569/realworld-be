// src/database/seeders/seed.ts
import { NestFactory } from '@nestjs/core';
import { DatabaseSeeder } from './database.seeder';
import { SeedersModule } from './seeders.module';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seeder = app.get(DatabaseSeeder);
  const args = process.argv.slice(2);
  const clearDb = args.includes('--clear');

  if (clearDb) {
    console.log('🧹 Clearing database before seeding...');
    await seeder.clearDatabase();
  }

  try {
    await seeder.seed();
    console.log('🎉 Seeding process completed!');
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();
