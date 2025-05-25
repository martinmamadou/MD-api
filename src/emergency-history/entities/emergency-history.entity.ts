import { Emergency } from "src/emergency/entities/emergency.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('emergency_history')  
export class EmergencyHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @ManyToOne(() => Emergency)
    @JoinColumn({ name: 'id_emergency' })
    emergency: Emergency;

    @Column()
    view_date: Date;  
}
