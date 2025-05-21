import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'mood_tracker'})
export class MoodTracker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mood: string;

  @Column()
  intensity: number;

  @Column()
  catalyst: string;

  @Column()
  notes: string;

  @Column()
  created_at: Date;
  
}
