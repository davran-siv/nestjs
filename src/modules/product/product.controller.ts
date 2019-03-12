import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '../../common/CurrentUser.decorator'
import { JwtPayloadDto } from '../auth/interfaces/jwt.interface'
import { ProductCreateDto, ProductResponseDto } from './product.interfaces'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
  constructor(
    private readonly service: ProductService
  ) {
  }

  @Post()
  @UseGuards(AuthGuard())
  createOne(@Body() dto: ProductCreateDto, @CurrentUser() user: JwtPayloadDto) {
    return this.service.createOne(dto, user.id)
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  getOneById(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.service.getOneById(id)
  }
}
