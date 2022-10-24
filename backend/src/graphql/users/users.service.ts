import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';
import { Repository } from "typeorm";
import { User } from 'src/entities';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly configService: ConfigService ) {}

    async authenticate(mobile_number: string, password: string) {
        const foundUser = await this.userRepository.findOne({ where: { mobile_number } });
        const hashedPassword = crypto.createHash('SHA256').update(password).digest('hex');

        if (foundUser === null) {
            return {
                __typename: 'Error',
                message: 'User with mobile number does not exist'
            }
        };
        if (hashedPassword === foundUser.password) {
            const signedUser = {
                ...foundUser,
                token: jwt.sign({ ...foundUser }, this.configService.get('TOKEN_SECRET'), { expiresIn: '1d' })
            };
            return {
                __typename: 'User',
                ...signedUser
            };
        } else {
            return {
                __typename: 'Error',
                message: 'Password not match'
            }
        }
    }
}