import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) { }

    async getProfile(slugName: string): Promise<Profile | null> {
        return await this.profileRepository.findOne({
            where: { user: { slug: slugName } },
            relations: ['user', 'followers', 'followers.user'],
        });
    }

    async followProfile(
        currentUserId: number,
        slugName: string,
    ): Promise<Profile | null> {
        const profile = await this.getProfile(slugName);
        if (!profile) return null;

        const isAlreadyFollowing = profile.followers?.some(
            (follower) => follower.user.id === currentUserId,
        );
        if (isAlreadyFollowing) return profile;

        const followerProfile = await this.profileRepository.findOne({
            where: { user: { id: currentUserId } },
            relations: ['user'],
        });

        if (!followerProfile) return profile;

        profile.followers = [...(profile.followers || []), followerProfile];
        await this.profileRepository.save(profile);

        return profile;
    }

    async unfollowProfile(
        currentUserId: number,
        slugName: string,
    ): Promise<Profile | null> {
        const profile = await this.getProfile(slugName);
        if (!profile) return null;

        profile.followers = (profile.followers || []).filter(
            (follower) => follower.user.id !== currentUserId,
        );
        await this.profileRepository.save(profile);

        return profile;
    }
}
