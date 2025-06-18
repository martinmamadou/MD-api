import { ChallengeCategory } from "src/challenge_category/entities/challenge_category.entity";
import { UserChallenge } from "src/user_challenge/entities/user_challenge.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity({ name: 'challenge' })
export class Challenge {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    points: number;

    @Column()
    target: string

    @Column()
    is_active: Boolean

    @Column()
    badge_url: string

    @Column()
    created_at: Date

    @Column()
    estimated_duration: number

    @OneToMany(() => UserChallenge, userChallenge => userChallenge.challenge)
    userChallenges: UserChallenge[];

    @ManyToOne(() => ChallengeCategory, category => category.challenges)
    @JoinColumn({ name: 'category_id' })
    category: ChallengeCategory;
}

