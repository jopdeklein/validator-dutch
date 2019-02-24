#### Description

Simple form-validation package for validating input strings, returning Dutch error messages.

The validate function returns an obj with error messages or null if no errors are found.

example:

```javascript
import { Test, validate } from "validator-dutch"

const tests = {
  one: Test().minLength(10),
  two: Test()
    .minLength(10)
    .optional(),
  three: Test().date()
}

const input = {
  one: "123", // => fails, length is 3
  two: "", // => passes, because is optional
  three: "1-12-2018" // => passes
}

validate(input, tests)
```

Test propertys:
(all functions are chainable)

```javascript
maxLength(maxLength)
minLength(minLength)
minAndMaxLength(minLength, maxLength)
required()
optional()
dateObject() // usualy used for date-pickers
email()
dutchPhone()
dutchMobile()
postalCode()
time()
date()
number()
fullName()
regex(regex, example) // example should be a string with an example of the expected input
```

Input is always required unless you use optional(). required() is only used when no further specification of the input is necessary.
