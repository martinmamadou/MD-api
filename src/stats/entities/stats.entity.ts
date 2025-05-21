import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "stats" })
export class Stats {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cigaret_avoided: number

    @Column()
    money_saved: number

    @Column()
    days_without_smoking: number

    @ManyToOne(() => User, (user) => user.stats)
    @JoinColumn({ name: 'id_user' })
    user: User
}
