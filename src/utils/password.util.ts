import * as bcrypt from 'bcrypt'

const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(2)
  return bcrypt.hashSync(password, salt)
}

const validatePassword = async (inputPassword: string, userPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, userPassword)
}

export { hashPassword, validatePassword }
