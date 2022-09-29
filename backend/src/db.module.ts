import { ConfigService, ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "./entities";

const configService = new ConfigService();

export const ConfigModuleSettings = ConfigModule.forRoot();

export const TypeOrmModulesSettings = TypeOrmModule.forRoot({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: entities,
    synchronize: true,
  })