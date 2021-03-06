import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from '../../persistence/auth/auth.service'
import { AuthJwtTokesDto } from '../../persistence/auth/interfaces/jwt.interface'
import { LoginByCredentialsDto, RefreshTokenDto } from '../../persistence/auth/interfaces/login.interface'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post()
  @ApiOperation({ description: 'Login by credentials' })
  @ApiResponse({ status: 200, description: 'Successfully authorized' })
  @ApiResponse({ status: 401, description: 'Credentials are wrong' })
  async loginByCredentials(@Body() dto: LoginByCredentialsDto): Promise<AuthJwtTokesDto> {
    return this.authService.loginByCredentials(dto)
  }

  @Post('/refreshToken')
  @ApiOperation({ description: 'Refresh token' })
  @ApiResponse({ status: 200, description: 'Returns access and refresh tokens' })
  @ApiResponse({ status: 401, description: 'Refresh token is not valid' })
  async refreshToken(@Body() dto: RefreshTokenDto): Promise<AuthJwtTokesDto> {
    return this.authService.refreshToken(dto)
  }
}
