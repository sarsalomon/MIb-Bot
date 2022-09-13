import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { AppelModule } from './appel/appel.module';
import { DistrictModule } from './district/district.module';
import { ReceptionController } from './reception/reception.controller';
import { ReceptionService } from './reception/reception.service';
import { ReceptionModule } from './reception/reception.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [User],
          autoLoadModels: true
        }),
        UsersModule,
        AuthModule,
        BotModule,
        AppelModule,
        DistrictModule,
        ReceptionModule,
      ],
})

export class AppModule {}