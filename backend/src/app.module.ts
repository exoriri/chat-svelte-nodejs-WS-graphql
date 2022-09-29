import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';

/** Settings Modules */
import { GraphQLSettingModule } from './graphql/graphql.module';
import { ConfigModuleSettings, TypeOrmModulesSettings } from './db.module';

/** Modules */ 
import { ChatModule } from './graphql/chat/chat.module';
import { UsersModule } from './graphql/users/users.module';

@Module({
  imports: [
    GraphQLSettingModule, 
    ConfigModuleSettings,
    TypeOrmModulesSettings,
    ChatModule, 
    UsersModule,     
    ServeStaticModule.forRoot({
      rootPath: `${process.cwd()}/public`,
    })],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
