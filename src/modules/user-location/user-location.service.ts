import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { UserLocationCreateDto, UserLocationResponseDto } from './user-location.interfaces'
import { UserLocationRepository } from './user-location.repository'

@Injectable()
export class UserLocationService {
  constructor(
    private readonly repository: UserLocationRepository
  ) {
  }

  async createOne(dto: UserLocationCreateDto, userId: string, entityManager?: EntityManager): Promise<UserLocationResponseDto> {
    const createdUserLocation = await this.repository.createOrUpdateOne(dto, userId, entityManager)
    return UserLocationResponseDto.of(createdUserLocation)
  }
}
