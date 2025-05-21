import { UserChallenge } from "src/user_challenge/entities/user_challenge.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    badges: string

    @Column()
    created_at: Date

    @Column()
    estimated_duration: number

    @OneToMany(() => UserChallenge, userChallenge => userChallenge.challenge)
    userChallenges: UserChallenge[];
}

