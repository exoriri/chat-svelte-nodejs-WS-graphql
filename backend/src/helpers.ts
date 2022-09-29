import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const authorisedUser = (token: string) => {
    try {
        return jwt.verify(token, configService.get('TOKEN_SECRET'));
    } catch(e) {
        console.log('ERROR on authorisedUser', e);
        return;
    }
}