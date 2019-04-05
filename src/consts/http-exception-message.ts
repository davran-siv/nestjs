export class HttpExceptionMessage {
  static user = class {
    static passwordsDoNotMatch = 'The password do not match the conformation password'
    static emailAlreadyInUse = 'An email is already in use'
    static usernameAlreadyInUse = 'A username is already in use'
  }

  static auth = class {
    static credentialsAreWrong = 'Credentials are wrong'
  }

  static cart = class {
    static notFound = 'Cart not found'
    static cartItemNotFound = 'Cart item not found'
  }

  static product = class {
    static notFound = 'Product not found'
  }

  static comment = class {
    static notFound = 'Comment not found'
  }
}