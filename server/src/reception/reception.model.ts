import { Table, Model, Column, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface ReceptionAttrs {
    chatId: number,
    passport: string,
    phone: string,
    description: string,
    districtId: number,
    status: number
}


@Table({tableName: 'Reception'})
export class Reception extends Model<Reception, ReceptionAttrs> {

    @ApiProperty({example: '1', description: 'Reception Id unique'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '59655185463', description: 'Telegram Member Chat Id'})
    @Column({type: DataType.BIGINT})
    chatId: number;

    @ApiProperty({example: 'AA0000000', description: 'Passport'})
    @Column({type: DataType.STRING})
    passport: string;

    @ApiProperty({example: '+998975442203', description: 'Phone Number'})
    @Column({type: DataType.STRING})
    phone: string;

    @ApiProperty({example: 'Manza qarzdorlikni hal qilib bering', description: 'Reception Description'})
    @Column({type: DataType.STRING})
    description: string;

    @ApiProperty({example: '1', description: 'District Id'})
    @Column({type: DataType.INTEGER})
    districtId: number;

    @ApiProperty({example: '1', description: 'Reception Status (0: Create, 1: Send All, 3: Recieve(District human), 4: Recive(Constler), 5: Done)'})
    @Column({type: DataType.INTEGER})
    status: number;

}