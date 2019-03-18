import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturingMaterialController } from './manufacturing-material.controller';

describe('ManufacturingMaterial Controller', () => {
  let controller: ManufacturingMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturingMaterialController],
    }).compile();

    controller = module.get<ManufacturingMaterialController>(ManufacturingMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
