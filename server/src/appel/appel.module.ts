import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppelController } from './appel.controller';
import { Appel } from './appel.model';
import { AppelService } from './appel.service';

@Module({
  controllers: [AppelController],
  providers: [AppelService],
  imports: [
    SequelizeModule.forFeature([Appel])
  ],
  exports: [
    AppelService
  ]
})
export class AppelModule {}
