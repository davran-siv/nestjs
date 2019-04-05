import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiUseTags } from '@nestjs/swagger'
import { ProductCategoryCreateDto } from './product-category.interfaces'
import { ProductCategoryService } from './product-category.service'

@ApiUseTags('Product category')
@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly service: ProductCategoryService
  ) {
  }

  @Post()
  createOne(@Body() dto: ProductCategoryCreateDto) {
    return this.service.createOne(dto)
  }

  @Get()
  getAll() {
    return this.service.getAll()
  }

}
