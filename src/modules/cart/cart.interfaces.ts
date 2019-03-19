import { ProductResponseDto } from '../product/product.interfaces'

export interface CartResponseDto {
  items: CartItemResponseDto[]
}

export class CartItemResponseDto {
  id: string
  amount: number
  product: ProductResponseDto
  createdAt: Date
  updatedAt: Date | null
}

export class AddItemToCartDto {
  prodcuctId: string
  amount: number
}

export class RemoveItemFromCartDto {
  id: string
}

export class UpdateAmountDto {
  id: string
  amount: number
}