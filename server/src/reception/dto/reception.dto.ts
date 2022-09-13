import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class createReception {

    @ApiProperty({example: '', description: ''})
    readonly chatId: number;

    @ApiProperty({example: '', description: ''})
    @IsString({message: ''})
    readonly passport: string;

    @ApiProperty({example: '', description: ''})
    @IsString({message: ''})
    readonly phone: string;

    @ApiProperty({example: '', description: ''})
    @IsString({message: ''})
    readonly description: string;

    @ApiProperty({example: '', description: ''})
    readonly districtId: number;

    @ApiProperty({example: '', description: ''})
    readonly status: number;

}