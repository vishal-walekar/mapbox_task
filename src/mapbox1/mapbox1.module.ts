import { Module } from '@nestjs/common';
import { Mapbox1Service } from './mapbox1.service';
import { Mapbox1Controller } from './mapbox1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mapbox1 } from './entities/mapbox1.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mapbox1])],
  controllers: [Mapbox1Controller],
  providers: [Mapbox1Service]
})
export class Mapbox1Module {}
