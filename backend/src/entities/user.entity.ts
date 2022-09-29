import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('int', { array: true }) 
  chat: number[]
};