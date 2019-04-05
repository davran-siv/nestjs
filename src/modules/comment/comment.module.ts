import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Injectables from '../../consts/Injectables'
import { CommentController } from './comment.controller'
import { CommentEntity } from './comment.entity'
import { DefaultCommentRepository } from './comment.repository'
import { DefaultCommentService } from './comment.service'

const CommentServiceProvider = { provide: Injectables.services.comment, useClass: DefaultCommentService }
const CommentRepositoryProvider = { provide: Injectables.repositories.comment, useClass: DefaultCommentRepository }

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity])
  ],
  providers: [CommentServiceProvider, CommentRepositoryProvider],
  controllers: [CommentController]
})
export class CommentModule {
}
