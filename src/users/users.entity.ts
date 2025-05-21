import { Stats } from 'src/stats/entities/stats.entity';
import { UserChallenge } from 'src/user_challenge/entities/user_challenge.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
  smoker_type: string;

  @Column()
  smoker_duration: number;

  @Column()
  last_cigaret_smoked: Date;

  @Column()
  goal: string;

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.user)
  userChallenges: UserChallenge[];

  @OneToMany(() => Stats, (stats) => stats.user)
  stats: Stats[];
}
