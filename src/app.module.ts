import { Module } from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import typeormConfigAsync from '../ormconfig-async'
import { AuthModule } from './persistence/auth/auth.module'
import { UserModule } from './persistence/user/user.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfigAsync,
    }),
    ConfigModule.forRoot(),
  ]
})
export class ApplicationModule {
}
