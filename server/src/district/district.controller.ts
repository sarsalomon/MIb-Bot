import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { District } from './district.model';
import { DistrictService } from './district.service';
import { createDistrict } from './dto/district.dto';

@ApiTags('Disctrict')
@Controller('district')
export class DistrictController {

    constructor(private districtService: DistrictService) {}

    @ApiOperation({summary: 'Create district'})
    @ApiResponse({status: 200, type: District})
    @Post('/create')
    create(@Body() districtDto: createDistrict) {
        return this.districtService.createDistrict(districtDto);
    }

    @ApiOperation({summary: 'Find districts'})
    @ApiResponse({status: 200, type: District})
    @Get()
    getall() {
        return this.districtService.getAllDistrict();
    }

}
