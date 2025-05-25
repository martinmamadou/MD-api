import { Reward } from "src/rewards/entities/reward.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "rewards_category" })
export class RewardsCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Reward, reward => reward.category)
  rewards: Reward[];
}
