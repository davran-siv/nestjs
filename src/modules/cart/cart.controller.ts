import { Body, Controller, Delete, Get, HttpCode, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '../../common/CurrentUser.decorator'
import { JwtPayloadDto } from '../auth/interfaces/jwt.interface'
import { AddItemToCartDto, CartResponseDto } from './cart.interfaces'
import { CartService } from './cart.service'

@Controller('cart')
export class CartController {
  constructor(
    private readonly service: CartService
  ) {
  }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard())
  findMyCart(@CurrentUser() user: JwtPayloadDto): Promise<CartResponseDto> {
    return this.service.findOneByUserId(user.id)
  }

  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard())
  addItemToMyCart(@Body() dto: AddItemToCartDto, @CurrentUser() user: JwtPayloadDto): Promise<CartResponseDto> {
    return 'mocked endpoint' as any
  }

  @Delete()
  @HttpCode(200)
  @UseGuards(AuthGuard())
  updateItemInMyCart(@CurrentUser() user: JwtPayloadDto): Promise<CartResponseDto> {
    return 'mocked endpoint' as any
  }

  @Delete()
  @HttpCode(200)
  @UseGuards(AuthGuard())
  removeItemFromMyCart(@CurrentUser() user: JwtPayloadDto): Promise<void> {
    return 'mocked endpoint' as any
  }

}