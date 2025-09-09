import { Module } from '@nestjs/common';
import { DatabaseSeeder } from './database.seeder';
import { UsersModule } from '../users/users.module';
import { UsersSeeder } from './user.seeder';
import { TagsModule } from '../tags/tags.module';
import { TagsSeeder } from './tag.seeder';

@Module({
  imports: [UsersModule, TagsModule],
  providers: [UsersSeeder, TagsSeeder, DatabaseSeeder],
  exports: [DatabaseSeeder],
})
export class SeedersModule {}
