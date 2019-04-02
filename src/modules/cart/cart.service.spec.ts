import { Test, TestingModule } from '@nestjs/testing'
import { CartService, DefaultCartService } from './cart.service'

describe('DefaultCartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultCartService],
    }).compile();

    service = module.get<DefaultCartService>(DefaultCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
