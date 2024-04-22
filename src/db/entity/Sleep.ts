import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Sleep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  endTime: Date;

  // duration in milisecods
  @Column({ type: 'numeric', nullable: true, default: null })
  duration: number;

  @ManyToOne(() => User, {
    nullable: true,
  })
  @JoinColumn()
  user: User;
  @Column({ nullable: true })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
