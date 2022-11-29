import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import { Chat } from './chat.entity';
import { Message } from './message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  avatar_url: string

  @Column()
  mobile_number: string

  @Column()
  fullname: string

  @Column()
  password: string

  @OneToMany(() => Message, (message: Message) => message.user, {
    cascade: true
  })
  messages: Message[]

  @ManyToMany(() => Chat, chat => chat.users)
  @JoinTable({
    name: 'users_chats',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'chat_id',
      referencedColumnName: 'id'
    }
  })
  chats: Chat[]
};