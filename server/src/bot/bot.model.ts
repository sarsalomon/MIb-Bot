import { Column, DataType, Model, Table, Unique } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';


interface TelegramMemberAttrs {
    chatId: number,
    name: string,
    phone: string,
    districtId: number,
    lang: string
}

@Table({tableName: 'TelegramMembers'})
export class TelegramMembers extends Model<TelegramMembers, TelegramMemberAttrs> {
    static getTelegramMemberByID(chatId: number) {
        throw new Error('Method not implemented.');
    }

    @ApiProperty({example: '1', description: 'Unique'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '645234554', description: 'ChatId'})
    @Column({type: DataType.BIGINT, unique: true, allowNull: false})
    chatId: number;

    @ApiProperty({example: 'Yulchiyev Sarvarjon', description: 'Name'})
    @Column({type: DataType.STRING, allowNull: true})
    name: string;

    @ApiProperty({example: '+998975442203', description: 'Phone'})
    @Column({type: DataType.STRING, allowNull: false})
    phone: string;

    @ApiProperty({example: 'Olmaliq Id', description: 'DisctricID'})
    @Column({type: DataType.INTEGER, allowNull: false})
    districtId: number;

    @ApiProperty({example: 'Uz', description: 'Lang'})
    @Column({type: DataType.STRING, allowNull: false})
    lang: string;

}