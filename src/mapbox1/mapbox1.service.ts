import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateMapbox1Dto } from './dto/create-mapbox1.dto';
import { UpdateMapbox1Dto } from './dto/update-mapbox1.dto';
import { Mapbox1 } from './entities/mapbox1.entity';

@Injectable()
export class Mapbox1Service {
  // create(createMapbox1Dto: CreateMapbox1Dto) {
  //   return 'This action adds a new mapbox1';
  // }

  constructor(
    @InjectRepository(Mapbox1)
    private readonly mapbox1Repository: Repository<Mapbox1>,
  ) {}
  create(createMapbox1Dto: CreateMapbox1Dto) {
    return this.mapbox1Repository.save(createMapbox1Dto);
  }
  findAll() {
    return this.mapbox1Repository.find();
  }
  

  // findAll() {
  //   return `This action returns all mapbox1`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} mapbox1`;
  // }

  // update(id: number, updateMapbox1Dto: UpdateMapbox1Dto) {
  //   return `This action updates a #${id} mapbox1`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mapbox1`;
  // }
}
