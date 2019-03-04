import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class LoginByCredentialsDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  emailOrUsername: string

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}

export class RefreshTokenDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}