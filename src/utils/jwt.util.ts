import * as jwt from 'jsonwebtoken'
import * as uuid from 'uuid'
import { UserResponseDTO } from '../modules/user/user.interface'

interface GenerateTokesPairDTO {
  user: UserResponseDTO
  accessExpiresIn: number
  refreshExpiresIn: number
}

interface SignOptions {
  expiresIn?: string | number,
  jwtid?: string
}

const getJwtAccessTokenPayload = (user: UserResponseDTO) => {
  return {
    id: user.id
  }
}

const generateJti = () => uuid.v4()

const getAccessToken = (user: UserResponseDTO, expiresIn: number) => {
  const tokenPayload = getJwtAccessTokenPayload(user)
  return signToken(tokenPayload, 'awd', { expiresIn })
}

const getRefreshToken = (userId: string, expiresIn: number) => {
  const jwtid = generateJti()
  const options: SignOptions = {
    expiresIn,
    jwtid
  }
  return signToken({ id: userId }, 'awd', options)
}

export const signToken = (payload: Object | string | Buffer, secret: jwt.Secret, options?: SignOptions) =>
  jwt.sign(payload, secret, options)

const generateTokesPair = (dto: GenerateTokesPairDTO) => {
  const accessToken = getAccessToken(dto.user, dto.accessExpiresIn)
  const refreshToken = getRefreshToken(dto.user.id, dto.refreshExpiresIn)
  return {
    accessToken,
    refreshToken
  }
}

export {
  generateTokesPair
}