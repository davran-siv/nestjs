import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository) {
  }

  async createOne(): Promise<any> {
    return this.repository.createOne()
  }
}