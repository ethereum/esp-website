import { ValidateError } from "./validate-error"
// eslint-disable-next-line
const validEmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateEmail = value => {
  if (!value && value.trim() === "") {
    throw new ValidateError("Email is empty")
  }
  if (!validEmailReg.test(value)) {
    throw new ValidateError("Email is not valid, please try again")
  }
}
