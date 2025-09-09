// src/modules/users/seeders/users.seeder.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class UsersSeeder {
  constructor(private readonly userService: UsersService) {}

  async seed(): Promise<void> {
    const existingUsers = await this.userService.findAll();

    if (existingUsers.length > 0) {
      console.log('Users already exist, skipping seeding...');
      return;
    }

    const users = [
      {
        email: 'admin@example.com',
        user_name: 'Admin User',
        password: 'Admin@12345', // In a real scenario, ensure to hash passwords
      },
      {
        email: 'user@example.com',
        user_name: 'Regular User',
        password: 'User@12345', // In a real scenario, ensure to hash passwords
      },
      {
        email: 'moderator@example.com',
        user_name: 'Moderator User',
        password: 'Moderator@12345', // In a real scenario, ensure to hash passwords
      },
    ];

    for (const userData of users) {
      const user = await this.userService.create(userData);
      console.log(`Created user: ${user.email}`);
    }

    console.log(`✅ Seeded users successfully`);
  }

  async clear(): Promise<void> {
    await this.userService.clearAll();
    console.log('🧹 Cleared users table');
  }
}
