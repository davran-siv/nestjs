import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class LoginByCredentialsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  emailOrUsername: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}
