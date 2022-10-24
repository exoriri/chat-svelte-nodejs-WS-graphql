import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message, Chat, User } from 'src/entities';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';

@Module({
    imports: [TypeOrmModule.forFeature([Chat, Message, User])],
    providers: [ChatResolver, ChatService]
})
export class ChatModule {};