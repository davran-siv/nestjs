import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
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

export class CommentCreateDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  commentText: string
  @ApiModelProperty({ required: false })
  @IsString()
  repliedToCommentId?: string
}

export class CommentUpdateDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  id: string
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  commentText: string
}

export class CommentdeleteDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  id: string
}
