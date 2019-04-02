import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { CartItemResponseDto } from '../cart-item/cart-item.interfaces'


export class CartResponseDto {
  @ApiModelProperty()
  id: string
  @ApiModelProperty({ type: CartItemResponseDto })
  items: CartItemResponseDto[]
}

export class AddItemToCartDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  productId: string
  @ApiModelProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number
}

export class CartDeleteCartItremDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  id: string
}

export class CartUpdateCartItemAmountDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  cartItemId: string
  @ApiModelProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number
}