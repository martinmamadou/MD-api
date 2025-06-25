import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity({ name: 'mood_tracker' })
export class MoodTracker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mood: string;

  @Column()
  intensity: string;

  @Column()
  catalyst: string;

  @Column()
  notes: string;

  @Column()
  created_at: Date;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.mood_trackers)
  @JoinColumn({ name: 'user_id' })
  user: User;

}
