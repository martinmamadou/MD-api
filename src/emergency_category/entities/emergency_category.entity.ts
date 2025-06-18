import { Emergency } from "src/emergency/entities/emergency.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'emergency_category'})
export class EmergencyCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @OneToMany(() => Emergency, (emergency) => emergency.category)
    emergencies: Emergency[];
}
