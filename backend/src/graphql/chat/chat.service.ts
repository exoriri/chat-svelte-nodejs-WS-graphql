import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat, Message, User } from 'src/entities';
import { authorisedUser } from 'src/helpers';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private readonly chatRespository: Repository<Chat>, 
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) 
    {}

    async getAllChats(token: string) {
        const user = authorisedUser(token) as User;

        if (user === undefined) {
          return {
            __typename: 'Error',
            message: 'You are not authorized'
          }
        };

        let foundChatsWithMessages = await this.chatRespository
            .createQueryBuilder('chat')
            .innerJoin('users_chats', 'users_chats', 'users_chats.chat_id = chat.id')
            .innerJoin('message', 'message', 'message.chat_id = users_chats.chat_id')
            .innerJoinAndSelect('chat.users', 'user')
            .where('users_chats.user_id = :id', { id: user.id })
            .select(['message.id', 'message.chat_id', 'user.id'])
            .execute();

        foundChatsWithMessages = foundChatsWithMessages.filter(chat => chat.user_id !== user.id);
                    
        const chats = await foundChatsWithMessages.reduce(async (acc, chat) => {
            const dublicatedChats = [...await acc];
            const foundChatIndex = dublicatedChats.findIndex(dublChat => dublChat.id === chat.message_chat_id);
            const messageUser = await this.messageRepository.findOne({ where: { id: chat.message_id }, relations: { user: true } });
            delete messageUser.user.password;

            const generatedMessageEntity = {
                id: messageUser.id,
                user: messageUser.user,
                chat_id: messageUser.chat_id,
                content: messageUser.content,
                created_at: messageUser.created_at
            };
            
            if (foundChatIndex !== -1) {
                dublicatedChats[foundChatIndex].messages.push(generatedMessageEntity);
                return dublicatedChats;
            } else {
                const userEntity = await this.userRepository.findOne({ where: { id: chat.user_id } });
                delete userEntity.password;

                dublicatedChats.push({
                    id: chat.message_chat_id,
                    user: userEntity,
                    messages: [
                        generatedMessageEntity
                    ]
                });
                return dublicatedChats;
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
        // const foundChat = await this.chatRespository.findOne({ where: { id: chat_id }, relations: ['messages'] });

        let foundChatWithMessages = await this.chatRespository.
            createQueryBuilder('chat')
            .innerJoin('message', 'message', 'message.chat_id = chat.id')
            .innerJoinAndSelect('message.user', 'messageUser')
            .select(['chat', 'messageUser', 'message'])
            .where('chat.id = :chatId', { chatId: chat_id })
            .execute()
        ;

        const destinationUser = (await this.chatRespository.
            createQueryBuilder('chat')
            .innerJoinAndSelect('chat.users', 'user')
            .select(['user'])
            .where('user.id != :userId', { userId: user.id })
            .andWhere('chat.id = :chatId', { chatId: chat_id })
            .execute())[0];

        const chatEntity = {
            id: chat_id,
            user: {
                id: destinationUser.user_id,
                avatar_url: destinationUser.user_avatar_url,
                mobile_number: destinationUser.user_mobile_number,
                fullname: destinationUser.user_fullname
            },
            messages: []
        };

        foundChatWithMessages = foundChatWithMessages.map(chat => (
            {
                id: chat.message_id,
                user_id: chat.message_user_id,
                chat_id: chat.message_chat_id,
                content: chat.message_content,
                created_at: chat.message_created_at,
                user: {
                    id: chat.messageUser_id,
                    avatar_url: chat.messageUser_avatar_url,
                    mobile_number: chat.messageUser_mobile_number,
                    fullname: chat.messageUser_fullname
                }
            }
        ));

        chatEntity.messages = foundChatWithMessages;

        if (user === undefined) {
          return {
            __typename: 'Error',
            message: 'You are not authorized'
          }
        };

        if (foundChatWithMessages.length === 0) {
            return {
                __typename: 'Error',
                message: 'Chat with id not found'
              }
        };

        return {
            __typename: 'Chat',
            ...chatEntity
        }
        
    }
}