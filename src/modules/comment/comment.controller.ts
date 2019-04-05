import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger'
import { CurrentUser } from '../../common/currentUser.decorator'
import Injectables from '../../consts/Injectables'
import { JwtPayloadDto } from '../auth/interfaces/jwt.interface'
import { CommentCreateDto, CommentResponseDto, CommentUpdateDto } from './comment.interface'
import { CommentService } from './comment.service'

@ApiUseTags('Comment')
@ApiBearerAuth()
@Controller('comment')
export class CommentController {
  constructor(
    @Inject(Injectables.services.comment) private readonly service: CommentService
  ) {
  }

  @Post()
  @ApiOperation({ title: 'Create comment' })
  @ApiCreatedResponse({ description: 'A comment was successfully created', type: CommentResponseDto })
  @UseGuards(AuthGuard())
  async createOne(@Body() dto: CommentCreateDto, @CurrentUser() user: JwtPayloadDto): Promise<CommentResponseDto> {
    return this.service.createOne(dto, user.id)
  }

  @Get(':id')
  @ApiOperation({ title: 'Get a comment by id' })
  @ApiOkResponse({ description: 'Comment received', type: CommentResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @UseGuards(AuthGuard())
  async findCommentById(@Param('id') id: string): Promise<CommentResponseDto> {
    return this.service.findCommentById(id)
  }

  @Get()
  @ApiOperation({ title: 'Get my comments' })
  @ApiOkResponse({ description: 'Comments received', type: CommentResponseDto })
  @UseGuards(AuthGuard())
  async findManyMyComments(@CurrentUser() user: JwtPayloadDto): Promise<CommentResponseDto[]> {
    return this.service.findManyByAuthorId(user.id)
  }

  @Get(':id/getReplies')
  @ApiOperation({ title: 'Get replies to comment by id' })
  @ApiOkResponse({ description: 'Comments received', type: CommentResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @UseGuards(AuthGuard())
  async findRepliesToComment(@Param('id') id: string): Promise<CommentResponseDto[]> {
    return this.service.findManyRepliesByParentCommentId(id)
  }

  @Put()
  @ApiOperation({ title: 'Update a comment by id' })
  @ApiOkResponse({ description: 'Comment successfully updated', type: CommentResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @UseGuards(AuthGuard())
  async updateOneComment(@Body() dto: CommentUpdateDto,
                         @CurrentUser() user: JwtPayloadDto): Promise<CommentResponseDto> {
    return this.service.updateOne(dto, user.id)
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete a comment by id' })
  @ApiOkResponse({ description: 'Comment successfully deleted', type: CommentResponseDto })
  @UseGuards(AuthGuard())
  async deleteOneComment(@Param('id') id: string,
                         @CurrentUser() user: JwtPayloadDto): Promise<void> {
    return this.service.deleteOne(id, user.id)
  }
}
