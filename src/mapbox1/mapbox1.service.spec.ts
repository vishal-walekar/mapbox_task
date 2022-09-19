import { Test, TestingModule } from '@nestjs/testing';
import { Mapbox1Service } from './mapbox1.service';

describe('Mapbox1Service', () => {
  let service: Mapbox1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mapbox1Service],
    }).compile();

    service = module.get<Mapbox1Service>(Mapbox1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
