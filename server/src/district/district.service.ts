import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createDistrict } from './dto/district.dto';
import { District } from './district.model';

@Injectable()
export class DistrictService {

    constructor(@InjectModel(District) private districtRepository: typeof District) {}

    async createDistrict(dto: createDistrict) {
        const nameUz = dto.nameUz;
        const nameRu = dto.nameRu;
        const nameOz = dto.nameOz;
        const nameEn = dto.nameEn;

        const condidate = await this.districtRepository.findOne({where: {nameUz, nameRu, nameOz, nameEn}, include: {all: true}});

        if (condidate) {
            throw new HttpException(`${nameUz}, ${nameRu}, ${nameOz}, ${nameEn} alaqachon mavjud`, HttpStatus.BAD_REQUEST);
        } else {
            const district = await this.districtRepository.create(dto);
            return district;
        }

    }

    async getAllDistrict() {
        const districts = await this.districtRepository.findAll()
        return districts;
    }

    async getDistrictById() {
        // const district = await this.districtRepository.findOne({where:{}, include: {all:true}})
        // return district;
    }

    async updateDistrict() {

    }

    async delteDistrict() {
        // const district = await this.districtRepository.destroy()
        // return district;
    }

}
