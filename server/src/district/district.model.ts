import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface DistrictAttr {
    nameUz: string,
    nameRu: string,
    nameOz: string,
    nameEn: string,
    descriptionUz: string,
    descriptionRu: string,
    descriptionOz: string,
    descriptionEn: string,
    phone: string,
    location: string
}

@Table({tableName: 'District'})
export class District extends Model<District, DistrictAttr> {

    @ApiProperty({example: '1', description: 'Unique'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Olmaliq', description: 'Uz DistrictName'})
    @Column({type: DataType.STRING,  unique: true})
    nameUz: string;

    @ApiProperty({example: 'Алмалык', description: 'Ru DistrictName'})
    @Column({type: DataType.STRING})
    nameRu: string;

    @ApiProperty({example: 'Олмалиқ', description: 'Oz DistrictName'})
    @Column({type: DataType.STRING})
    nameOz: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @Column({type: DataType.STRING})
    nameEn: string;

    @ApiProperty({example: 'Olmaliq', description: 'Uz DistrictName'})
    @Column({type: DataType.STRING,  unique: true})
    descriptionUz: string;

    @ApiProperty({example: 'Алмалык', description: 'Ru DistrictName'})
    @Column({type: DataType.STRING})
    descriptionRu: string;

    @ApiProperty({example: 'Олмалиқ', description: 'Oz DistrictName'})
    @Column({type: DataType.STRING})
    descriptionOz: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @Column({type: DataType.STRING})
    descriptionEn: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @Column({type: DataType.STRING})
    command: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @Column({type: DataType.STRING})
    phone: string;

    @ApiProperty({example: 'Almalyk', description: 'En DistrictName'})
    @Column({type: DataType.STRING})
    location: string;
}