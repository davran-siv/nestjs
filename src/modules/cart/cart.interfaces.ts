import { ApiModelProperty } from '@nestjs/swagger'
import { CartItemResponseDto } from '../cart-item/cart-item.interfaces'


export class CartResponseDto {
  @ApiModelProperty()
  id: string
  @ApiModelProperty({ type: CartItemResponseDto })
  items: CartItemResponseDto[]
}

export class AddItemToCartDto {
  @ApiModelProperty()
  productId: string
  @ApiModelProperty()
  amount: number
}

export class CartDeleteCartItremDto {
  @ApiModelProperty()
  id: string
}

export class CartUpdateCartItemAmountDto {
  @ApiModelProperty()
  cartItemId: string
  @ApiModelProperty()
  amount: number
}