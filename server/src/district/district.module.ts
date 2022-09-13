import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DistrictController } from './district.controller';
import { District } from './district.model';
import { DistrictService } from './district.service';

@Module({
    controllers: [DistrictController],
    providers: [DistrictService],
    imports: [
        SequelizeModule.forFeature([District])
    ],
    exports: [
        DistrictService
    ]
})
export class DistrictModule {}
