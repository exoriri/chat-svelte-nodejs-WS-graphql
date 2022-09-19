import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLSettingModule } from './graphql/graphql.module';
import { ServeStaticModule } from '@nestjs/serve-static';

/** Modules */ 
import { ChatModule } from './graphql/chat/chat.module';
import { UsersModule } from './graphql/users/users.module';

@Module({
  imports: [
    GraphQLSettingModule, 
    ChatModule, 
    UsersModule,     
    ServeStaticModule.forRoot({
      rootPath: `${process.cwd()}/public`,
    })],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
