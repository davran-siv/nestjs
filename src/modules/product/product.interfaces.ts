import { ApiModelProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { ManufacturingMaterialResponseDto } from '../manufacturing-material/manufacturing-material.interfaces'
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
  isInStock: boolean

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  height: number

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  width: number

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  length: number

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  weight: number

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  categoryId: string

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  shopId: string

  @ApiModelProperty({ type: ManufacturingMaterialResponseDto, required: false })
  @IsOptional()
  @IsArray()
  madeOf?: ManufacturingMaterialResponseDto[]

  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsString()
  manufacturingProcess?: string
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
  isInStock: boolean

  @ApiModelProperty()
  height: number

  @ApiModelProperty()
  width: number

  @ApiModelProperty()
  length: number

  @ApiModelProperty()
  weight: number

  @ApiModelProperty({ type: ProductCategoryResponseDto })
  category: ProductCategoryResponseDto

  @ApiModelProperty({ type: UserResponseDTO })
  createdBy: UserResponseDTO

  @ApiModelProperty({ type: ManufacturingMaterialResponseDto, required: false })
  madeOf?: ManufacturingMaterialResponseDto[]

  @ApiModelProperty({ required: false })
  manufacturingProcess?: string

  constructor(model: ProductEntity) {
    this.id = model.id
    this.productName = model.productName
    this.title = model.title
    this.description = model.description
    this.isInStock = model.isInStock
    this.madeOf = model.madeOf
    this.manufacturingProcess = model.manufacturingProcess
    this.category = ProductCategoryResponseDto.of(model.category)
    this.createdBy = UserResponseDTO.of(model.createdBy)
  }

  static of(model: ProductEntity): ProductResponseDto {
    return new ProductResponseDto(model)
  }
}
