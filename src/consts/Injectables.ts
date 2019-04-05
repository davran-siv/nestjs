export default class Injectables {
  static services = class {
    static cart = 'CartService'
    static comment = 'CommentService'
  }

  static repositories = class {
    static comment = 'CommentRepository'
    static cart = 'CartRepository'
  }
}