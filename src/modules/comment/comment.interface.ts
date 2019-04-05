import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { UserEntity } from '../user/user.entity'
import { CommentEntity } from './comment.entity'

export class CommentResponseDto {
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  commentText: string
  @ApiModelProperty({ type: UserEntity })
  author: UserEntity
  @ApiModelProperty({ type: CommentEntity })
  repliedToComment: CommentEntity | null
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
  @IsOptional()
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

export class CommentDeleteDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  id: string
}
