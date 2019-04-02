import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags
} from '@nestjs/swagger'
import { CurrentUser } from '../../common/currentUser.decorator'
import { JwtPayloadDto } from '../auth/interfaces/jwt.interface'
import { AddItemToCartDto, CartResponseDto, CartUpdateCartItemAmountDto } from './cart.interfaces'
import { CartService } from './cart.service'

@ApiUseTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(
    @Inject('cartService') private readonly service: CartService
  ) {
  }

  @Get()
  @ApiOperation({ title: 'Get current user\'s cart' })
  @ApiOkResponse({ description: 'Returns cart with items', type: CartResponseDto })
  @ApiNotFoundResponse({ description: 'No cart found' })
  @UseGuards(AuthGuard())
  findMyCart(@CurrentUser() user: JwtPayloadDto): Promise<CartResponseDto> {
    return this.service.findOneByUserId(user.id)
  }

  @Post()
  @ApiOperation({ title: 'Add an item to current user\'s cart' })
  @ApiCreatedResponse({ description: 'An item successfully added to cart', type: CartResponseDto })
  @UseGuards(AuthGuard())
  addItemToMyCart(@Body() dto: AddItemToCartDto, @CurrentUser() user: JwtPayloadDto): Promise<CartResponseDto> {
    return this.service.addToItemToCartByUserId(dto, user.id)
  }

  @Put()
  @ApiOperation({ title: 'Update an item in current user\'s cart' })
  @ApiOkResponse({ description: 'An item successfully updated', type: CartResponseDto })
  @UseGuards(AuthGuard())
  updateItemInMyCart(@Body() dto: CartUpdateCartItemAmountDto,
                     @CurrentUser() user: JwtPayloadDto): Promise<CartResponseDto> {
    return this.service.updateItemInCartByCartItemId(dto, user.id)
  }

  @Delete(':cartItemId')
  @ApiOperation({ title: 'delete an item from current user\'s cart' })
  @ApiOkResponse({ description: 'An item successfully removed', type: CartResponseDto })
  @UseGuards(AuthGuard())
  DeleteItemFromMyCart(@Param('cartItemId') cartItemId: string,
                       @CurrentUser() user: JwtPayloadDto): Promise<CartResponseDto> {
    return this.service.deleteOneByIdAndCartId(cartItemId, user.id)
  }

}