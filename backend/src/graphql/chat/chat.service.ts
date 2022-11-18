import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat, Message, User } from 'src/entities';
import { authorisedUser } from 'src/helpers';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private readonly chatRespository: Repository<Chat>, 
        @InjectRepository(Message) private readonly messageRepository: Repository<Message> ) 
    {}

    async getAllChats(token: string) {
        const user = authorisedUser(token) as User;

        if (user === undefined) {
          return {
            __typename: 'Error',
            message: 'You are not authorized'
          }
        };

        const foundMessages = await this.chatRespository
            .createQueryBuilder('chat')
            .innerJoin('users_chats', 'users_chats', 'users_chats.chat_id = chat.id')
            .innerJoin('message', 'message', 'message.chat_id = users_chats.chat_id')
            .where('users_chats.user_id = :id', { id: user.id })
            .select(['message'])
            .execute();

            
        const chats = foundMessages.reduce((acc, message) => {
            const dublicatedChats = [...acc];
            const foundChatIndex = dublicatedChats.findIndex(chat => chat.id === message.message_chat_id);
            const generatedMessageEntity = {
                id: message.message_id,
                user_id: message.message_user_id,
                chat_id: message.message_chat_id,
                content: message.message_content,
                created_at: message.message_created_at
            };


            if (foundChatIndex !== -1) {
                dublicatedChats[foundChatIndex].messages.push(generatedMessageEntity);
                return dublicatedChats;
            } else {
                acc.push({
                    id: message.message_chat_id,
                    messages: [
                        generatedMessageEntity
                    ]
                });
                return acc;
            }
        }, []);

        return {
            __typename: 'ChatsResult',
            result: chats
        }
    }

    async saveMessage(chat_id: number, content: string, token: string) {
        const user = authorisedUser(token) as User;
        

        if (user === undefined) {
          return {
            __typename: 'Error',
            message: 'You are not authorized'
          }
        };

        const message = {
            chat_id,
            content,
            user: user
        };

        const savedMessage = await this.messageRepository.save(message);

        return {
            __typename: 'Message',
            ...savedMessage
        }
    }

    async getChatById(chat_id: number, token: string) {
        const user = authorisedUser(token) as User;
        const foundChat = await this.chatRespository.findOne({ where: { id: chat_id }, relations: ['messages'] });

        if (user === undefined) {
          return {
            __typename: 'Error',
            message: 'You are not authorized'
          }
        };

        if (foundChat === null) {
            return {
                __typename: 'Error',
                message: 'Chat with id not found'
              }
        };

        return {
            __typename: 'Chat',
            ...foundChat
        }
        
    }
}