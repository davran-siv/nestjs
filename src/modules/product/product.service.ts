import { Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { HttpExceptionMessage } from '../../consts/http-exception-message'
import { ProductCreateDto, ProductResponseDto } from './product.interfaces'
import { ProductRepository } from './product.repository'

@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository
  ) {
  }

  createOne(dto: ProductCreateDto, userId: string, entityManager?: EntityManager) {
    const { categoryId, shopId, ...rest } = dto
    return this.repository.createOrUpdateOne({
      ...rest,
      category: { id: categoryId },
      shop: { id: shopId },
      createdBy: { id: userId }
    }, entityManager)
  }

  async getOneById(id: string): Promise<ProductResponseDto> {
    const product = await this.repository.getOneById(id)
    if (!product) {
      throw new NotFoundException(HttpExceptionMessage.product.notFound)
    }
    return ProductResponseDto.of(product)
  }
}
