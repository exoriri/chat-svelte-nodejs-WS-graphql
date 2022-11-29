import {Resolver, Args, Query, Context, Mutation, Subscription } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { PubSub } from 'graphql-subscriptions';
import { Message, User } from 'src/entities';
import { authorisedUser } from 'src/helpers';

const pubSub = new PubSub();

@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService){};

  @Query('chats')
  async chats(@Context() context) {
    const token = context.req.headers.authorization.split(' ')[1];
    const chats = await this.chatService.getAllChats(token);
    return chats;
  }

  @Query('chat')
  async getChat(@Context() context, @Args('chat_id') chat_id) {
    const token = context.req.headers.authorization.split(' ')[1];
    const chat = await this.chatService.getChatById(chat_id, token);
    return chat;
  }

  @Mutation('sendMessage')
  async sendMessage(@Context() context, @Args('content') content, @Args('chat_id') chat_id) {
    const token = context.req.headers.authorization.split(' ')[1];
    const newMessage = await this.chatService.saveMessage(chat_id, content, token);
    pubSub.publish('newMessage', { ...newMessage })
    return newMessage;
  }

  @Subscription(() => Message, {
    name: 'newMessage',
    filter: (payload, variables) => {
      return payload.chat_id === variables.chat_id;
    },
    resolve: (payload, args, context) => {
      const token = context.req.headers.authorization.split(' ')[1];
      const user = authorisedUser(token) as User;

      if (user === undefined) {
        return {
          __typename: 'Error',
          message: 'You are not authorized'
        }
      };

      return payload;
    }
  })
  newMessage() {
    return pubSub.asyncIterator('newMessage')
  }
}