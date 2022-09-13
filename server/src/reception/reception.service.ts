import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reception } from './reception.model';
import { createReception } from './dto/reception.dto';

@Injectable()
export class ReceptionService {

    constructor(@InjectModel(Reception) private receptionRepository: typeof Reception) {}

    async createApple(dto: createReception) {
        const chatId = dto.chatId;
        const condidate = await this.receptionRepository.findOne({where: {chatId}, include: {all: true}})

        if (condidate) {
            throw new HttpException('', HttpStatus.BAD_REQUEST);
        } else {
            const appel = await this.receptionRepository.create(dto);
            return appel;
        }
        
    }

    async updateApple() {
        
    }

}
