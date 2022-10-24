import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Chat } from './chat.entity';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'chat_id' })
  chat_id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user: User) => user.messages, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id'
  })
  user: User

  @ManyToOne(() => Chat, (chat: Chat) => chat.messages, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'chat_id', referencedColumnName: 'id'})
  chat: Chat

};