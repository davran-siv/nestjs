import * as bcrypt from 'bcrypt-nodejs'

function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync('salt');
  return bcrypt.hashSync(password, salt)
}

function validatePassword(inputPassword: string, userPassword: string): boolean {
  return bcrypt.compareSync(inputPassword, userPassword)
}

export { hashPassword, validatePassword }
