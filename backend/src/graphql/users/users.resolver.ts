import {Resolver, Args, Mutation } from '@nestjs/graphql';

@Resolver('Users')
export class UsersResolver {
    @Mutation('authenticate')
    async authenticateUser(@Args('mobile_number') mobile_number: string, password: string) {
        return {
            id: 1,
            avatar_url: 'localhost:3000/girl-face',
            fullname: 'Egor Krid',
            mobile_number,
            chat: [1,2,3,4]
        }
    }
}