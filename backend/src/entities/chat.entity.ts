import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToMany } from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number
  
  @OneToMany(() => Message, (message: Message) => message.chat, {
    cascade: true
  })
  @JoinColumn({name: 'messages'})
  messages: Message[]

  @ManyToMany(() => User, user => user.chats)
  users: User[]
};