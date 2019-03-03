import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthJwtTokesDTO } from './interfaces/jwt.interface'
import { LoginByCredentialsDTO } from './interfaces/login.interface'

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post()
  @ApiOperation({ title: 'Login by credentials' })
  @ApiResponse({ status: 200, description: 'Successfully authorized' })
  @ApiResponse({ status: 401, description: 'Credentials are wrong' })
  async loginByCredentials(@Body() dto: LoginByCredentialsDTO): Promise<AuthJwtTokesDTO> {
    return this.authService.loginByCredentials(dto)
  }
}
