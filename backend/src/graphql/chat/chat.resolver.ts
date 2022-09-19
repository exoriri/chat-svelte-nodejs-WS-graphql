import {Resolver, Args, Query } from '@nestjs/graphql';

@Resolver('Chat')
export class ChatResolver {
  @Query('chatMessages')
  async ChatMessages(@Args('chat_id') chat_id: number) {
    return [
        {
            id: 1, 
            user_id: 1,
            messages: [
                {
                    id: 1,
                    user_id: 2,
                    content: `Я мессаж юзера 1 и принадлежу чату ${chat_id}`
                }
            ]
        }
    ]
  }
}