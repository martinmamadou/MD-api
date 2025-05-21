import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
