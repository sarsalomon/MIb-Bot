import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Appel } from './appel.model';
import { createApple } from './dto/appel.dto';

@Injectable()
export class AppelService {

    constructor(@InjectModel(Appel) private appelRepository: typeof Appel) {}

    async createApple(dto: createApple) {
        const chatId = dto.chatId;
        const condidate = await this.appelRepository.findOne({where: {chatId}, include: {all: true}})

        if (condidate) {
            throw new HttpException('', HttpStatus.BAD_REQUEST);
        } else {
            const appel = await this.appelRepository.create(dto);
            return appel;
        }
        
    }

    async updateApple() {
        
    }

}
