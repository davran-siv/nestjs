import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserLocationController } from './user-location.controller'
import { UserLocationEntity } from './user-location.entity'
import { UserLocationRepository } from './user-location.repository'
import { UserLocationService } from './user-location.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLocationEntity])
  ],
  controllers: [UserLocationController],
  providers: [UserLocationService, UserLocationRepository],
  exports: [UserLocationModule, UserLocationService]
})
export class UserLocationModule {
}
