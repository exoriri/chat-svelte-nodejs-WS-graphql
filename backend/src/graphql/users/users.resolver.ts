import {Resolver, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('Users')
export class UsersResolver {
    constructor(private readonly usersService: UsersService){};

    @Mutation('authenticate')
    async authenticateUser(@Args('mobile_number') mobile_number: string, @Args('password') password: string) {
        const user = await this.usersService.authenticate(mobile_number, password);
        return user;
    }
}