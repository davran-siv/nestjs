import {DeepPartial, DeleteResult, EntityManager, EntitySchema, ObjectType, Repository} from 'typeorm'

export const BaseRepository = (Entity: any) => {
  abstract class BaseRepository<Entity> extends Repository<Entity> {
    createOrUpdateOne(entityLike: DeepPartial<Entity>, entityManager?: EntityManager): Promise<Entity> {
      const entity = this.create(entityLike)
      return entityManager ? entityManager.save(entity) : this.save(entity)
    }

    createOrUpdateMany(entityLikes: DeepPartial<Entity>[], entityManager?: EntityManager): Promise<Entity[]> {
      const entities = entityLikes.map(it => this.create(it))
      return entityManager ? entityManager.save(entities) : this.save(entities)
    }

    deleteById(criteria: number | number[], entityManager?: EntityManager): Promise<DeleteResult> {
      return entityManager
        ? entityManager.delete(Entity, criteria)
        : this.delete(criteria)
    }
  }

  return BaseRepository
}
