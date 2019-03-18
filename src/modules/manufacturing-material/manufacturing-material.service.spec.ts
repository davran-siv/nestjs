import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturingMaterialService } from './manufacturing-material.service';

describe('ManufacturingMaterialService', () => {
  let service: ManufacturingMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManufacturingMaterialService],
    }).compile();

    service = module.get<ManufacturingMaterialService>(ManufacturingMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
