import { PartialType } from '@nestjs/mapped-types';
import { CreateMapbox1Dto } from './create-mapbox1.dto';

export class UpdateMapbox1Dto extends PartialType(CreateMapbox1Dto) {}
