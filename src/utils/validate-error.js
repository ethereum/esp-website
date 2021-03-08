export class ValidateError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    Object.setPrototypeOf(this, ValidateError.prototype)
  }
}
