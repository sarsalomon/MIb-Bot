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
import { ConfigModule } from '@nestjs/config';
import { I18n, pluralize } from '@grammyjs/i18n';
import * as path from 'path';
import { NestjsGrammyModule } from '@grammyjs/nestjs'

const sessions = new LocalSession({database: 'session_db.json'});

export const i18n = new I18n({
	directory: path.resolve(__dirname, '..', '..', '\src\\bot\\features\\locales'),
	defaultLanguage: 'uz',
	sessionName: 'session',
	useSession: true,
})

console.log(i18n)


@Module({
  controllers: [BotController],
  providers: [BotService, BotUpdate],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
  }),
    SequelizeModule.forFeature([TelegramMembers, Appel, District, Reception, User]),
    TelegrafModule .forRoot({
      middlewares: [sessions.middleware(), i18n.middleware()],
      token: process.env.TELEGRAM
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
