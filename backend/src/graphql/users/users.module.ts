import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersResolver, UsersService, ConfigService]
})
export class UsersModule {}