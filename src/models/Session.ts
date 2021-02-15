import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import User from './User'

@Entity('sessions')
export default class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  token: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ default: 'NOW()' })
  createdAt: Date

  @UpdateDateColumn({ default: 'NOW()' })
  updatedAt: Date
}
