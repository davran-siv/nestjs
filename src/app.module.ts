import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './persistence/auth/auth.module'
import { UserModule } from './persistence/user/user.module'

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot()]
})
export class ApplicationModule {
}
