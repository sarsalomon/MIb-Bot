import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService) {}

    async login(userDto: createUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
    }


    async registration(userDto: createUserDto){
        const condidate = await this.userService.getUserByPhone(userDto.phone);
        if (condidate) {
            throw new HttpException('Foydalanuvchi bor', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password:hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {phone: user.phone, id: user.id}
        return {
            token: this.jwtService.sign(payload)
        }
    }


    private async validateUser(userDto: createUserDto) {
        const user = await this.userService.getUserByPhone(userDto.phone);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals){
            return user
        }
        throw new UnauthorizedException({message:'Parol yokiLogin xato'});
    }
}
