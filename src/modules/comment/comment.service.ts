import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { HttpExceptionMessage } from '../../consts/http-exception-message'
import Injectables from '../../consts/Injectables'
import { CommentCreateDto, CommentResponseDto, CommentUpdateDto } from './comment.interface'
import { CommentRepository } from './comment.repository'

export interface CommentService {
  createOne(dto: CommentCreateDto, authorId: string, entityManager?: EntityManager): Promise<CommentResponseDto>

  findCommentById(id: string, entityManager?: EntityManager): Promise<CommentResponseDto>

  findManyByAuthorId(userId: string, entityManager?: EntityManager): Promise<CommentResponseDto[]>

  findManyRepliesByParentCommentId(id: string, entityManager?: EntityManager): Promise<CommentResponseDto[]>

  updateOne(dto: CommentUpdateDto, userId: string, entityManager?: EntityManager): Promise<CommentResponseDto>

  deleteOne(id: string, userId: string, entityManager?: EntityManager): Promise<void>
}

@Injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @Inject(Injectables.repositories.comment) private readonly repository: CommentRepository
  ) {
  }

  createOne(dto: CommentCreateDto, authorId: string, entityManager?: EntityManager): Promise<CommentResponseDto> {
    const { repliedToCommentId, ...rest } = dto
    const entityLike = {
      ...rest,
      ...repliedToCommentId && { repliedToComment: { id: repliedToCommentId } },
      author: { id: authorId }
    }
    return this.repository.createOne(entityLike, entityManager)
  }

  async findCommentById(id: string): Promise<CommentResponseDto> {
    const comment = await this.repository.findCommentById(id)
    if (!comment) {
      throw new NotFoundException(HttpExceptionMessage.comment.notFound)
    }
    return comment
  }

  findManyByAuthorId(authorId: string): Promise<CommentResponseDto[]> {
    return this.repository.findManyByAuthorId(authorId)
  }

  findManyRepliesByParentCommentId(id: string): Promise<CommentResponseDto[]> {
    return this.repository.findManyRepliesByParentCommentId(id)
  }

  async updateOne(dto: CommentUpdateDto, userId: string): Promise<CommentResponseDto> {
    await this.repository.updateOne(dto, userId)
    return this.findCommentById(dto.id)
  }

  async deleteOne(id: string, userId: string): Promise<void> {
    await this.repository.deleteOne(id, userId)
  }
}
