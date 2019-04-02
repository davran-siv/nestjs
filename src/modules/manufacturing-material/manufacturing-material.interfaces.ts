import { ApiModelProperty } from '@nestjs/swagger'

export class ManufacturingMaterialCreateDto {
  @ApiModelProperty()
  material: string
}

export class ManufacturingMaterialResponseDto {
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  material: string
}

export class ManufacturingMaterialUpdateDto {
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  material: string
}

export class ManufacturingMaterialDeleteDto {
  @ApiModelProperty()
  id: string
}