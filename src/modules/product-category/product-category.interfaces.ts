import { ApiModelProperty } from '@nestjs/swagger'
import { ProductCategoryEntity } from './product-category.entity'

export class ProductCategoryCreateDto {
  @ApiModelProperty()
  categoryName: string
  @ApiModelProperty({ required: false })
  isActive?: boolean
  @ApiModelProperty({ required: false })
  parentCategoryId?: string
}

export class ProductCategoryResponseDto {
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  categoryName: string
  @ApiModelProperty()
  isActive: boolean
  @ApiModelProperty({ type: ProductCategoryResponseDto, required: false })
  parentCategory: ProductCategoryResponseDto | null
  @ApiModelProperty({ type: ProductCategoryResponseDto, required: false })
  childCategories: ProductCategoryResponseDto[] | null

  constructor(model: ProductCategoryEntity) {
    this.id = model.id
    this.categoryName = model.categoryName
    this.isActive = model.isActive
    this.parentCategory = model.parentCategory ? ProductCategoryResponseDto.of(model.parentCategory) : null
    this.childCategories = model.childCategories ? model.childCategories.map(it => ProductCategoryResponseDto.of(it)) : []
  }

  static of(model: ProductCategoryEntity): ProductCategoryResponseDto {
    return new ProductCategoryResponseDto(model)
  }
}