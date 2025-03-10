import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  created_at: Date;

  @Column()
  login_date: Date;

  @Column()
  role: string;

  @Column()
  points: number;

  @Column()
  packet_per_day: number;

  @Column()
  packet_price: number;

  @Column()
  smoker_duration: number;

  @Column()
  last_cigaret_smoked: Date;
  
  @Column()
  goal: string;
}
