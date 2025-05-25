import { Reward } from "src/rewards/entities/reward.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_rewards')
export class UserReward {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @ManyToOne(() => Reward)
    @JoinColumn({ name: 'id_reward' })
    reward: Reward;

    @Column()
    reclaim_date: Date;
}
