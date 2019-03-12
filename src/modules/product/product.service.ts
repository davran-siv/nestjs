import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { ProductCreateDto, ProductResponseDto } from './product.interfaces'
import { ProductRepository } from './product.repository'

@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository
  ) {
  }

  createOne(dto: ProductCreateDto, userId, entityManager?: EntityManager) {
    const { categoryId, ...rest } = dto
    return this.repository.createOrUpdateOne({
      ...rest,
      category: { id: categoryId },
      createdBy: { id: userId }
    }, entityManager)
  }

  async getOneById(id: string): Promise<ProductResponseDto> {
    const product = await this.repository.getOneById(id)
    return ProductResponseDto.of(product)
  }
}
