import { Injectable } from '@nestjs/common';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class TagsSeeder {
  constructor(private readonly tagService: TagsService) {}

  async seed(): Promise<void> {
    const existingTags = await this.tagService.findAll();

    if (existingTags.length > 0) {
      console.log('Tags already exist, skipping seeding...');
      return;
    }

    const tags = [
      {
        name: 'Technology',
      },
      {
        name: 'Health',
      },
      {
        name: 'Finance',
      },
    ];

    for (const tagData of tags) {
      const tag = await this.tagService.create(tagData);
      console.log(`Created tag: ${tag.name}`);
    }

    console.log(`✅ Seeded tags successfully`);
  }

  async clear(): Promise<void> {
    await this.tagService.clearAll();
    console.log('🧹 Cleared tags table');
  }
}
