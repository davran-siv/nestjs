import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, EntityManager, Repository } from 'typeorm'
import { ProductEntity } from './entities/product.entity'

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly entity: Repository<ProductEntity>
  ) {
  }

  createOrUpdateOne(dto: DeepPartial<ProductEntity>, entityManager?: EntityManager) {
    const entity = this.entity.create(dto)
    return entityManager ? entityManager.save(entity) : this.entity.save(entity)
  }

  getOneById(id: string): Promise<ProductEntity | undefined> {
    return this.entity.createQueryBuilder('product')
               .leftJoinAndSelect('product.category', 'category')
               .leftJoinAndSelect('product.createdBy', 'createdBy')
               .where('product.id = :id', { id })
               .getOne()
  }
}