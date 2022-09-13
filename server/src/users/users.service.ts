import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: createUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUser() {
        const users = await this.userRepository.findAll();
        return users;
    }

    async getUserByPhone(phone: string) {
        const user = await this.userRepository.findOne({where:{phone}, include: {all:true}});
        return user;
    }

}
