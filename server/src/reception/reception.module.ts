import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReceptionController } from './reception.controller';
import { Reception } from './reception.model';
import { ReceptionService } from './reception.service';

@Module({
    controllers: [ReceptionController],
    providers: [ReceptionService],
    imports: [
      SequelizeModule.forFeature([Reception])
    ],
    exports: [
      ReceptionService
    ]
  })
export class ReceptionModule {}
