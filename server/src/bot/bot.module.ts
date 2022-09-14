import { forwardRef, Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotController } from './bot.controller';
import * as LocalSession from 'telegraf-session-local';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegramMembers } from './bot.model';
import { Appel } from 'src/appel/appel.model';
import { District } from 'src/district/district.model';
import { AppelModule } from 'src/appel/appel.module';
import { ReceptionModule } from 'src/reception/reception.module';
import { Reception } from 'src/reception/reception.model';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/users.model';

const sessions = new LocalSession({database: 'session_db.json'});

@Module({
  controllers: [BotController],
  providers: [BotService, BotUpdate],
  imports: [
    SequelizeModule.forFeature([TelegramMembers, Appel, District, Reception, User]),
    // forwardRef(() => AppModule),
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: '5602819996:AAG5SO6HPjjedQDumhLS7XBuTt0tK4V-Ak8'
    }),
    
    AppelModule,
    ReceptionModule,
    UsersModule
  ],
  exports: [
    BotService
  ],
})

export class BotModule {}
