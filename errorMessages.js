module.exports = {
  maxLength: "maxLength must be defined and of type 'number'",
  minLength: "minLength must be defined and of type 'number'",
  minAndMaxLength: [
    "minLength can't be equal to, or bigger then maxLength",
    "minLength & maxLength must be defined and of type 'number'"
  ],
  required: "an input can't be required and optional at the same time",
  optional: "an input can't be optional and required at the same time",
  regex:
    "'regex' must be an instance of RegExp and example must be of type 'string'",
  validate: [
    "Input and tests must be defined and of type 'object'",
    "Input and tests must have matching propertys to work properly",
    "All the propperty's of the 'tests' argument of validate() must be an instance of the 'Test' class"
  ]
}
