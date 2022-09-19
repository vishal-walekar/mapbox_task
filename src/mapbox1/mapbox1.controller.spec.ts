import { Test, TestingModule } from '@nestjs/testing';
import { Mapbox1Controller } from './mapbox1.controller';
import { Mapbox1Service } from './mapbox1.service';

describe('Mapbox1Controller', () => {
  let controller: Mapbox1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Mapbox1Controller],
      providers: [Mapbox1Service],
    }).compile();

    controller = module.get<Mapbox1Controller>(Mapbox1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
