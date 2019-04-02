import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger'
import { CartResponseDto } from '../cart/cart.interfaces'
import { CommentCreateDto, CommentResponseDto } from './comment.interface'

@ApiUseTags('Cart')
@ApiBearerAuth()
@Controller('comment')
export class CommentController {

  @Post()
  @ApiOperation({ title: 'Create comment' })
  @ApiCreatedResponse({ description: 'A comment was successfully created', type: CartResponseDto })
  @UseGuards(AuthGuard())
  async createOne(@Body() dto: CommentCreateDto): Promise<CommentResponseDto> {
    return await 'awd' as any
  }

  async findCommentById() {
    return await 'awd' as any
  }

  async findManyMyComemnts() {
    return await 'awd' as any
  }

  async findRepliesToComment() {
    return await 'awd' as any
  }

  async updateOneComment() {
    return await 'awd' as any
  }

  async deleteOneComment() {
    return await 'awd' as any
  }


}
