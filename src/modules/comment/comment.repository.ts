import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, EntityManager, Repository } from 'typeorm'
import { CommentEntity } from './comment.entity'
import { CommentUpdateDto } from './comment.interface'

export interface CommentRepository {
  createOne(entityLike: DeepPartial<CommentEntity>, entityManager?: EntityManager): Promise<CommentEntity>

  findCommentById(id: string): Promise<CommentEntity | undefined>

  findManyByAuthorId(userId: string): Promise<CommentEntity[]>

  findManyRepliesByParentCommentId(id: string): Promise<CommentEntity[]>

  updateOne(dto: CommentUpdateDto, userId: string): Promise<void>

  deleteOne(id: string, userId: string): Promise<void>
}

@Injectable()
export class DefaultCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly entity: Repository<CommentEntity>
  ) {
  }

  private getQueryBuilder(entityManager?: EntityManager) {
    return entityManager
      ? entityManager.createQueryBuilder(CommentEntity, 'comment')
      : this.entity.createQueryBuilder('comment')
  }

  createOne(entityLike: DeepPartial<CommentEntity>, entityManager?: EntityManager): Promise<CommentEntity> {
    console.log(entityLike)
    const entity = this.entity.create(entityLike)
    return entityManager ? entityManager.save(entity) : this.entity.save(entity)
  }

  findCommentById(id: string, entityManager?: EntityManager): Promise<CommentEntity | undefined> {
    return this.getQueryBuilder(entityManager)
               .where('comment.id = :id', { id })
               .getOne()
  }

  findManyByAuthorId(userId: string, entityManager?: EntityManager): Promise<CommentEntity[]> {
    return this.getQueryBuilder(entityManager)
               .leftJoin('comment.author', 'author')
               .where('author.id = :userId', { userId })
               .getMany()
  }

  findManyRepliesByParentCommentId(id: string, entityManager?: EntityManager): Promise<CommentEntity[]> {
    return this.getQueryBuilder(entityManager)
               .leftJoin('comment.repliedToComment', 'repliedToComment')
               .where('repliedToComment.id = :id', { id })
               .getMany()
  }

  async updateOne(dto: CommentUpdateDto, userId: string, entityManager?: EntityManager): Promise<void> {
    await this.getQueryBuilder(entityManager)
              .leftJoin('comment.author', 'author')
              .update(CommentEntity)
              .set({
                commentText: dto.commentText,
                updatedAt: new Date()
              })
              .where('id = :id', { id: dto.id })
              .andWhere('author.id = :userId', { userId })
              .execute()
  }

  async deleteOne(id: string, userId: string, entityManager?: EntityManager): Promise<void> {
    await this.getQueryBuilder(entityManager)
              .leftJoin('comment.author', 'author')
              .update(CommentEntity)
              .set({
                isDeleted: true,
                updatedAt: new Date()
              })
              .where('id = :id', { id })
              .andWhere('author.id = :userId', { userId })
              .execute()
  }
}