import { ApiModelProperty } from '@nestjs/swagger'
import { ProductResponseDto } from '../product/product.interfaces'

export class CartItemCreateDto {
  @ApiModelProperty()
  cartId: string
  @ApiModelProperty()
  productId: string
  @ApiModelProperty()
  amount: number
}

export class CartItemUpdateDto {
  @ApiModelProperty()
  cartId: string
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  amount: number
}

export class CartItemDeleteDto {
  @ApiModelProperty()
  cartId: string
  @ApiModelProperty()
  id: string
}

export class CartItemResponseDto {
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  amount: number
  @ApiModelProperty({ type: ProductResponseDto })
  product: ProductResponseDto
  @ApiModelProperty()
  createdAt: Date
  @ApiModelProperty()
  updatedAt: Date | null
}