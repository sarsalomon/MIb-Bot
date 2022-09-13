import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class createTelegramMember {

    @ApiProperty({example: '+998975442203', description: 'Phone Number'})
    readonly chatId: number;

    @ApiProperty({example: '', description: ''})
    @IsString({message: ''})
    readonly name: string;

    @ApiProperty({example: '', description: ''})
    @IsString({message: ''})
    readonly phone: string;

    @ApiProperty({example: '', description: ''})
    readonly districtId:  number;

    @ApiProperty({example: '', description: ''})
    @IsString({message: ''})
    readonly lang: string;

}