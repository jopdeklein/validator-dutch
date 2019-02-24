const { _setMessage } = require("./utils")
const _messages = require("./messages")
const _errors = require("./errorMessages")
const _regex = require("./regex")

module.exports = class Validators {
  constructor() {
    this.tests = []
    this.isOptional = false
    this.isRequired = false
    this.isTest = true
  }

  // normal methods

  maxLength(maxLength) {
    if (typeof maxLength !== "number") {
      throw new Error(_errors.maxLength)
    }
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      const replacers = {
        maxLength
      }
      return input.length > maxLength
        ? _setMessage(_messages.maxLength, replacers)
        : null
    })
    return this
  }

  minLength(minLength) {
    if (typeof minLength !== "number") {
      throw new Error(_errors.minLength)
    }
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      const replacers = {
        minLength
      }
      return input.length < minLength
        ? _setMessage(_messages.minLength, replacers)
        : null
    })
    return this
  }

  minAndMaxLength(minLength, maxLength) {
    if (minLength >= maxLength) throw new Error(_errors.minAndMaxLength[0])
    if (typeof minLength !== "number" || typeof maxLength !== "number")
      throw new Error(_errors.minAndMaxLength[1])

    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      const replacers = {
        minLength,
        maxLength
      }
      return input.length < minLength || input.length > maxLength
        ? _setMessage(_messages.minAndMaxLength, replacers)
        : null
    })
    return this
  }

  required() {
    if (this.isOptional) throw new Error(_errors.required)
    this.isRequired = true

    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !input.length ? _messages.required : null
    })
    return this
  }

  dateObject() {
    this.tests.push(input => {
      return !(input instanceof Date) ? _messages.dateObject : null
    })
    return this
  }

  optional() {
    if (this.isRequired) throw new Error(_errors.optional)

    this.isOptional = true
    return this
  }

  // regex methods

  email() {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.email.test(input) ? _messages.email : null
    })
    return this
  }

  dutchPhone() {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.dutchPhone.test(input) ? _messages.dutchPhone : null
    })
    return this
  }

  dutchMobile() {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.dutchMobile.test(input) ? _messages.dutchMobile : null
    })
    return this
  }

  postalCode() {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.postalCode.test(input) ? _messages.postalCode : null
    })
    return this
  }

  time() {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.time.test(input) ? _messages.time : null
    })
    return this
  }

  date() {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.date.test(input) ? _messages.date : null
    })
    return this
  }

  number() {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.number.test(input) ? _messages.number : null
    })
    return this
  }

  fullName() {
    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      return !_regex.fullName.test(input) ? _messages.fullName : null
    })
    return this
  }

  regex(regex, example) {
    if (!(regex instanceof RegExp) || typeof example !== "string")
      throw new Error(_errors.regex)

    this.tests.push(input => {
      if (typeof input !== "string") return _messages.notAString

      const replacers = {
        example
      }
      return !regex.test(input) ? _setMessage(_messages.regex, replacers) : null
    })
    return this
  }
}
