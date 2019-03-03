import * as bcrypt from 'bcrypt'
import * as c from 'config'

function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, c.get('passwords.saltRounds'))
}

function validatePassword(inputPassword: string, userPassword: string): Promise<boolean> {
  return bcrypt.compare(inputPassword, userPassword)
}

export { hashPassword, validatePassword }
