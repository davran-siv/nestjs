import { Injectable } from '@nestjs/common'
import { ProductCategoryCreateDto } from './product-category.interfaces'
import { ProductCategoryRepository } from './product-category.repository'

@Injectable()
export class ProductCategoryService {
  constructor(
    private readonly repository: ProductCategoryRepository
  ) {
  }

  createOne(dto: ProductCategoryCreateDto) {
    const { parentCategoryId, ...rest } = dto
    return this.repository.createOrUpdateOne({
      ...rest,
      parentCategory: parentCategoryId && { id: parentCategoryId }
    })
  }

  getAll() {
    return this.repository.getAll()
  }
}
