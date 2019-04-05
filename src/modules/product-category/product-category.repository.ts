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

  createOrUpdateOne(dto: DeepPartial<ProductCategoryEntity>, entityManager?: EntityManager): Promise<ProductCategoryEntity> {
    const entity = this.entity.create(dto)
    return entityManager ? entityManager.save(entity) : this.entity.save(entity)
  }

  getAll(): Promise<ProductCategoryEntity[]> {
    return this.entity.createQueryBuilder('productCategory')
               .leftJoinAndSelect('productCategory.childCategories', 'childCategories')
               .where('productCategory.parentCategory IS NULL')
               .getMany()
  }

}
