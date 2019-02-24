const Validators = require("./Validators")
const _errors = require("./errorMessages")
const { _hasAllKeys, _isValidObject, _isTest } = require("./utils")

const Test = () => {
  return new Validators()
}

const validate = (input, tests) => {
  if (!_isValidObject(input, tests)) throw new Error(_errors.validate[0])
  if (!_hasAllKeys(input, tests)) throw new Error(_errors.validate[1])
  if (!_isTest(tests)) throw new Error(_errors.validate[2])

  const errors = {}
  for (key in tests) {
    tests[key].tests.forEach(func => {
      const result = func(input[key])
      if (result) errors[key] = result
      if (tests[key].isOptional && input[key].length === 0) delete errors[key]
    })
  }
  return Object.keys(errors).length ? errors : null
}

module.exports = { validate, Test }
