import { ApiModelProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { ProductCategoryResponseDto } from '../product-category/product-category.interfaces'
import { UserResponseDTO } from '../user/user.interfaces'
import { ProductEntity } from './entities/product.entity'

export class ProductCreateDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  productName: string

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiModelProperty()
  @IsNotEmpty()
  @IsBoolean()
  isInStock: string

  @ApiModelProperty({ required: false })
  @IsString()
  madeOf?: string

  @ApiModelProperty({ required: false })
  @IsString()
  manufacturingProcess?: string

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  categoryId: string
}

export class ProductResponseDto {
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  productName: string
  @ApiModelProperty()
  title: string
  @ApiModelProperty()
  description: string
  @ApiModelProperty()
  isInStock: string
  @ApiModelProperty({ required: false })
  madeOf?: string
  @ApiModelProperty({ required: false })
  manufacturingProcess?: string
  @ApiModelProperty()
  category: ProductCategoryResponseDto
  @ApiModelProperty()
  createdBy: UserResponseDTO

  constructor(model: ProductEntity) {
    this.id = model.id
    this.productName = model.productName
    this.title = model.title
    this.description = model.description
    this.isInStock = model.isInStock
    this.madeOf = model.madeOf
    this.manufacturingProcess = model.manufacturingProcess
    this.category = model.category ? ProductCategoryResponseDto.of(model.category) : null
    this.createdBy = model.createdBy ? UserResponseDTO.of(model.createdBy) : null
  }

  static of(model: ProductEntity): ProductResponseDto {
    return new ProductResponseDto(model)
  }
}
