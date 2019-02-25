const { validate, Test } = require("../app")
const _errors = require("../errorMessages")

describe("validate", () => {
  it("should throw if input and test doesn't have matching keys", () => {
    const tests = {
      one: "1",
      three: "3"
    }
    const input = {
      one: "1",
      two: "1"
    }

    expect(() => {
      validate(input, tests)
    }).toThrowError(new Error(_errors.validate[1]))
  })
  it("should throw if input or tests is not an object", () => {
    expect(() => {
      validate("", "")
    }).toThrowError(new Error(_errors.validate[0]))
    expect(() => {
      validate({}, "")
    }).toThrowError(new Error(_errors.validate[0]))
    expect(() => {
      validate({}, [])
    }).toThrowError(new Error(_errors.validate[0]))
  })
  it("should throw if one or more property's tests on test aren't actual test instances", () => {
    expect(() => {
      validate({ one: "a" }, { one: "b" })
    }).toThrowError(new Error(_errors.validate[2]))
    expect(() => {
      validate({ one: "" }, { one: Test().optional() })
    }).not.toThrow()
  })
})
