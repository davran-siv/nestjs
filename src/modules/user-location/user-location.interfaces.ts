import { ApiModelProperty } from '@nestjs/swagger'
import { UserLocationEntity } from './user-location.entity'

export class UserLocationCreateDto {
  @ApiModelProperty()
  readonly country: string
  @ApiModelProperty()
  readonly city: string
  @ApiModelProperty()
  readonly state: string
  @ApiModelProperty()
  readonly zipCode: string
  @ApiModelProperty()
  readonly street: string
}

export class UserLocationResponseDto {
  @ApiModelProperty()
  readonly country: string
  @ApiModelProperty()
  readonly city: string
  @ApiModelProperty()
  readonly state: string
  @ApiModelProperty()
  readonly zipCode: string
  @ApiModelProperty()
  readonly street: string

  constructor(model: UserLocationEntity) {
    this.country = model.country
    this.city = model.city
    this.state = model.state
    this.zipCode = model.zipCode
    this.street = model.street
  }

  static of(model: UserLocationEntity): UserLocationResponseDto {
    return new UserLocationResponseDto(model)
  }
}