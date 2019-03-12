import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductCategoryController } from './product-category.controller'
import { ProductCategoryEntity } from './product-category.entity'
import { ProductCategoryRepository } from './product-category.repository'
import { ProductCategoryService } from './product-category.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategoryEntity])
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, ProductCategoryRepository]
})
export class ProductCategoryModule {
}
