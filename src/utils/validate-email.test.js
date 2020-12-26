import { validateEmail } from "./validate-email"
import { ValidateError } from "./validate-error"

describe("utils/validate-email", () => {
  const errorTexts = {
    empty: "Email is empty",
    invalid: "Email is not valid, please try again",
  }
  it("Should throw error", () => {
    expect(() => validateEmail("")).toThrowError(ValidateError)
    expect(() => validateEmail("test")).toThrowError(ValidateError)
    expect(() => validateEmail("test@test")).toThrowError(ValidateError)
    expect(() => validateEmail("test.test.com")).toThrowError(ValidateError)
    expect(() => validateEmail(`test"test"test@test.test`)).toThrowError(
      ValidateError
    )
    expect(() => validateEmail("test@test@test@test.test")).toThrowError(
      ValidateError
    )
    expect(() =>
      validateEmail(`a\"b(c)d,e:f;g<h>i[j\\k]l@example.com`)
    ).toThrowError(ValidateError)
    expect(() =>
      validateEmail(`test\\ test\\"test\\\\test@test.test`)
    ).toThrowError(ValidateError)
    expect(() => validateEmail("test_test@test_test.test.com")).toThrowError(
      ValidateError
    )
  })
  it("Should throw error with correct error text", () => {
    expect(() => validateEmail("")).toThrowError(errorTexts.empty)
    expect(() => validateEmail("test@test")).toThrowError(errorTexts.invalid)
    expect(() => validateEmail("test_test@test_test.test.com")).toThrowError(
      errorTexts.invalid
    )
  })
  it("Should not throw error with correct email", () => {
    expect(() => validateEmail("sbrichards@gmail.com")).not.toThrowError()
    expect(() => validateEmail("ve.gr94@gmail.com")).not.toThrowError()
    expect(() => validateEmail("test_test@ya.ru")).not.toThrowError()
    expect(() => validateEmail("test+test@test.com")).not.toThrowError()
    expect(() => validateEmail("a@test.com")).not.toThrowError()
    expect(() => validateEmail("test-test@test-test.com")).not.toThrowError()
    expect(() => validateEmail("test!test@test.test")).not.toThrowError()
    expect(() => validateEmail("test%test.test@test.test")).not.toThrowError()
    expect(() =>
      validateEmail("test.test-test-test@test.test")
    ).not.toThrowError()
  })
})
