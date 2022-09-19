import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Mapbox1Service } from './mapbox1.service';
import { CreateMapbox1Dto } from './dto/create-mapbox1.dto';
import { UpdateMapbox1Dto } from './dto/update-mapbox1.dto';

@Controller('mapbox1')
export class Mapbox1Controller {
  constructor(private readonly mapbox1Service: Mapbox1Service) {}

  @Post()
  create(@Body() createMapbox1Dto: CreateMapbox1Dto) {
    return this.mapbox1Service.create(createMapbox1Dto);
  }

  @Get()
  findAll() {
    return this.mapbox1Service.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mapbox1Service.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMapbox1Dto: UpdateMapbox1Dto) {
  //   return this.mapbox1Service.update(+id, updateMapbox1Dto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mapbox1Service.remove(+id);
  // }
}
