import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class createDistrict {

    @ApiProperty({example: 'Olmaliq', description: 'Uz DistrictName'})
    @IsString({message: ''})
    readonly nameUz: string;

    @ApiProperty({example: 'Алмалык', description: 'Ru DistrictName'})
    @IsString({message: ''})
    readonly nameRu: string;

    @ApiProperty({example: 'Олмалиқ', description: 'Oz DistrictName'})
    @IsString({message: ''})
    readonly nameOz: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @IsString({message: ''})
    readonly nameEn: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @IsString({message: ''})
    readonly descriptionUz: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @IsString({message: ''})
    readonly descriptionRu: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @IsString({message: ''})
    readonly descriptionOz: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @IsString({message: ''})
    readonly descriptionEn: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @IsString({message: ''})
    readonly command: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @IsString({message: ''})
    readonly phone: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @IsString({message: ''})
    readonly location: string;
}