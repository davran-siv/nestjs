import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class LoginByCredentialsDTO {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  emailOrUsername: string

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}