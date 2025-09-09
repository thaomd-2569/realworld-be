import { Injectable } from '@nestjs/common';
import { UsersSeeder } from './user.seeder';
import { TagsSeeder } from './tag.seeder';
// Import other module seeders

@Injectable()
export class DatabaseSeeder {
  constructor(
    private readonly userSeeder: UsersSeeder,
    private readonly tagSeeder: TagsSeeder,
  ) {}

  async seed(): Promise<void> {
    console.log('🌱 Starting database seeding...');

    try {
      // Add other seeders here
      await this.userSeeder.seed();
      await this.tagSeeder.seed();

      console.log('✅ Database seeding completed successfully!');
    } catch (error) {
      console.error('❌ Error during seeding:', error);
      throw error;
    }
  }

  async clearDatabase(): Promise<void> {
    console.log('🧹 Clearing database...');

    try {
      // Add other clear methods here
      await this.userSeeder.clear();

      console.log('✅ Database cleared successfully!');
    } catch (error) {
      console.error('❌ Error during database clearing:', error);
      throw error;
    }
  }
}
