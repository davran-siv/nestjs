import * as bcrypt from 'bcrypt-nodejs'
import * as c from 'config'

function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(c.get('passwords.saltRounds'));
  return bcrypt.hashSync(password, salt)
}

function validatePassword(inputPassword: string, userPassword: string): boolean {
  return bcrypt.compareSync(inputPassword, userPassword)
}

export { hashPassword, validatePassword }
