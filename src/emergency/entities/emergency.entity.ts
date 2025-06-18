import { EmergencyCategory } from "src/emergency_category/entities/emergency_category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
  created_at: Date;

  @Column()
  category_id: number;

  @ManyToOne(() => EmergencyCategory, (category) => category.emergencies)
  @JoinColumn({ name: "category_id" })
  category: EmergencyCategory;
}
