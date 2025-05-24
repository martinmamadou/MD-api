import { Challenge } from "src/challenge/entities/challenge.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "challenge_category" })
export class ChallengeCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Challenge, challenge => challenge.category)
  challenges: Challenge[];
}
