import { RewardsCategory } from "src/rewards-category/entities/rewards-category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'rewards'})
export class Reward {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  points_needed: number;

  @Column()
  is_active: boolean;

  @Column()
  created_at: Date;

  @ManyToOne(() => RewardsCategory, (category) => category.rewards)
  @JoinColumn({ name: "category_id" })
  category: RewardsCategory;
}
