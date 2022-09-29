import {Resolver, Args, Query, Context } from '@nestjs/graphql';
import { authorisedUser } from 'src/helpers';

@Resolver('Chat')
export class ChatResolver {
  @Query('chatMessages')
  async ChatMessages(@Context() context, @Args('chat_id') chat_id: number) {
    const token = context.req.headers.authorization.split(' ')[1];
    const user = authorisedUser(token);

    if (user !== undefined) {
      return {
        __typename: 'ChatsResult',
        chats: [
          {
            id: 1, 
            user_id: 1,
            messages: [
              {
                id: 1,
                content: 'Я массаге'
              }
            ]
          }
        ]
      };
    } else {
      return {
        __typename: 'Error',
        message: 'You are not authorized'
      }
    }    
  }
}