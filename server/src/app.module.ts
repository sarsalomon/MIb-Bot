import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { AppelModule } from './appel/appel.module';
import { DistrictModule } from './district/district.module';
import { ReceptionModule } from './reception/reception.module';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path"

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            isGlobal:true,
            envFilePath: '.env'
        }),
        // GraphQLModule.forRoot({
        //   driver: ApolloDriver,
        //   playground: true,
        //   typePaths: ['./**/*.graphql'],
        //   autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
        //   definitions: {
        //     path: join(process.cwd(), 'src/graphql.ts'),
        //   }
        // }),
        ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static'),
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