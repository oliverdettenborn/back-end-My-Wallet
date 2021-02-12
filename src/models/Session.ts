import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  token: string;

  @OneToOne(() => User, (User) => User.id)
  @JoinColumn()
  user: User;
}
