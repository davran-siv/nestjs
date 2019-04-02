import { ApiModelProperty } from '@nestjs/swagger'
import { UserEntity } from '../user/user.entity'
import { CommentEntity } from './comment.entity'

export class CommentResponseDto {
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  commentText: string
  @ApiModelProperty({ type: UserEntity })
  author: UserEntity
  @ApiModelProperty()
  repliedToComment: string
  @ApiModelProperty({ type: CommentEntity })
  replies: CommentEntity[]
  @ApiModelProperty()
  createdAt: Date
  @ApiModelProperty()
  updatedAt: Date
}