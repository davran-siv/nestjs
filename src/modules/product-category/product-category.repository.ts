import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, EntityManager, Repository } from 'typeorm'
import { ProductCategoryEntity } from './product-category.entity'

@Injectable()
export class ProductCategoryRepository {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private readonly entity: Repository<ProductCategoryEntity>
  ) {
  }

  createOrUpdateOne(dto: DeepPartial<ProductCategoryEntity>, entityManager?: EntityManager) {
    const entity = this.entity.create(dto)
    console.log(entity)
    return entityManager ? entityManager.save(entity) : this.entity.save(entity)
  }

  getAll() {
    return this.entity.createQueryBuilder('productCategory')
               .leftJoinAndSelect('productCategory.childCategories', 'childCategories')
               .where('productCategory.parentCategory IS NULL')
               .getMany()
  }

}
