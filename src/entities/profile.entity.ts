// profile.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({name: 'profiles'})
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.profile, { cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToMany(() => Profile, (profile) => profile.followers)
    @JoinTable({
        name: 'profile_followers', // bảng pivot
        joinColumn: {
            name: 'follower_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'following_id',
            referencedColumnName: 'id',
        },
    })
    following: Profile[];

    @ManyToMany(() => Profile, (profile) => profile.following)
    followers: Profile[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
