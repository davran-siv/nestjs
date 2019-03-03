export interface JwtPayloadDTO {
  id: string
  email: string
  userName: string,
  firstName: string,
  lastName: string
  iat: number
  exp: number
}

export interface AuthJwtTokesDTO {
  accessToken: string
  refreshToken: string
}
