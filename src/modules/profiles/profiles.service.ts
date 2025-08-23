import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile)
        private profilesRepository: Repository<Profile>,
    ) {}

    async findByUserName(userName: string): Promise<Profile | null> {
        return await this.profilesRepository.findOne({
            where: {
                user: {
                    user_name: userName
                }
            },
            relations: ['user'],
        });
    }
}
