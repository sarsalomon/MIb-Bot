import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';


interface UserCreationAttrs {
    phone: string,
    password: string,
    chatId: number;
    role: string,
    disctrictId: number,
    status: number
}


@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '1', description: 'Unique'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey:true})
    id: number;

    @ApiProperty({example: '+998975442203', description: 'Phone number'})
    @Column({type: DataType.STRING, unique:true, allowNull: false})
    phone: string;

    @ApiProperty({example: 'MIB', description: 'Password'})
    @Column({type: DataType.STRING,  allowNull: false})
    password: string;

    @ApiProperty({example: '645234554', description: 'ChatId'})
    @Column({type: DataType.BIGINT, unique: true, allowNull: false})
    chatId: number;
    
    @ApiProperty({example: 'Role', description: 'Password'})
    @Column({type: DataType.STRING,  allowNull: false})
    role: string;

    @ApiProperty({example: 'DistricId', description: 'Password'})
    @Column({type: DataType.BIGINT,  allowNull: false})
    districtId: number;

    @ApiProperty({example: 'DistricId', description: 'Password'})
    @Column({type: DataType.INTEGER,  allowNull: false})
    status: number;
}