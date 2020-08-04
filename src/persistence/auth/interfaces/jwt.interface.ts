export interface JwtPayloadDto {
  id: string
  email: string
  username: string
  iat: number
  exp: number
}

export interface JwtRefreshTokenPayloadDto {
  id: string
  iat: number
  exp: number
  jti: string
}

export interface AuthJwtTokesDto {
  accessToken: string
  refreshToken: string
}
