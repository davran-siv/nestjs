import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { CartResponseDto } from './cart.interfaces'
import { CartRepository } from './cart.repository'

@Injectable()
export class CartService {
  constructor(
    private readonly repository: CartRepository
  ) {
  }

  createOne(userId: string, entityManager?: EntityManager): Promise<CartResponseDto> {
    return this.repository.createOne(userId, entityManager)
  }

  findOneByUserId(userId: string): Promise<CartResponseDto> {
    return this.repository.findOneByUserId(userId)
  }
}
