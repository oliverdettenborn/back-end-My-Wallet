import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'money' })
  amount: string;

  @Column()
  kind: string;

  @Column()
  insertionDate: Date

  @ManyToOne(() => User, user => user.id)
  @JoinColumn()
  user: User;
}
