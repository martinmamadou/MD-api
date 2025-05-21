import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'emergency'})
export class Emergency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  tips: string;

  @Column()
  category: string;

  @Column()
  created_at: Date;
}
