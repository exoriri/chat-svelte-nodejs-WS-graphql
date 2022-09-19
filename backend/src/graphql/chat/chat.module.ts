import { Module } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';

@Module({
    providers: [ChatResolver]
})
export class ChatModule {};