import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from './users.model';
import { JwtAutgGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: createUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'Find users'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAutgGuard)
    @Get()
    getAll(){
        return this.userService.getAllUser(); 
    }
}
