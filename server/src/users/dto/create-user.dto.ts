import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class createUserDto {

    @ApiProperty({example: '+998975442203', description: 'Phone Number'})
    @IsString({message: 'String require'})
    readonly phone: string;

    @ApiProperty({example: 'MIB', description: 'Password'})
    @IsString({message: 'String require'})
    @Length(4,16,{message:"4tadan kam emas 16 ko'p emas"})
    readonly password: string;
    
    @ApiProperty({example: '', description: ''})
    readonly chatId: number;

    @ApiProperty({example: '', description: ''})
    @IsString({message: ''})
    readonly role: string;

    @ApiProperty({example: '', description: ''})
    @IsString({message: ''})
    readonly districtId: number;

    @ApiProperty({example: '', description: ''})
    readonly status: number;
}