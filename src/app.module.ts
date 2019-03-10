import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { UserLocationModule } from './modules/user-location/user-location.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot(), UserLocationModule]
})
export class ApplicationModule {
}
