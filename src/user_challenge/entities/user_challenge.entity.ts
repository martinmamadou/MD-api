import { Challenge } from "src/challenge/entities/challenge.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user_challenge'})
export class UserChallenge {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @ManyToOne(() => Challenge)
    @JoinColumn({ name: 'id_challenge' })
    challenge: Challenge;

    @Column()
    is_completed: boolean;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    points_earned: number;
}
