import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import User from './User'

@Entity('wallet')
export default class Wallet {
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

  @CreateDateColumn({ default: 'NOW()' })
  createdAt: Date

  @UpdateDateColumn({ default: 'NOW()' })
  updatedAt: Date
}
