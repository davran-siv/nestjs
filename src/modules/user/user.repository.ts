import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>
  ) {

  }

  async createOne(): Promise<any> {
    const entity = this.userEntity.create({
      firstName: 'wd'

    })
    return this.userEntity.save(entity)
  }
}
