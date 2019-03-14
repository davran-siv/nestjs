import * as bcrypt from 'bcrypt-nodejs'
import * as c from 'config'

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, c.get('passwords.saltRounds'))
}

function validatePassword(inputPassword: string, userPassword: string): boolean {
  return bcrypt.compareSync(inputPassword, userPassword)
}

export { hashPassword, validatePassword }
