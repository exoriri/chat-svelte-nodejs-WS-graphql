import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number
  
  @OneToMany(() => Message, (message: Message) => message.chat, {
    cascade: true
  })
  @JoinColumn({name: 'messages'})
  messages: Message[]
};