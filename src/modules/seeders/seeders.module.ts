import { Module } from '@nestjs/common';
import { DatabaseSeeder } from './database.seeder';
import { UsersModule } from '../users/users.module';
import { UsersSeeder } from './user.seeder';

@Module({
  imports: [UsersModule],
  providers: [UsersSeeder, DatabaseSeeder],
  exports: [DatabaseSeeder],
})
export class SeedersModule {}
