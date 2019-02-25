# Validator Dutch

Simple form-validation package for validating input strings, returning Dutch error messages.

## Installation

```
npm install validator-dutch
```

## Example Usage:

The validate function returns an obj with error messages or null if no errors are found.

```javascript
import { Test, validate } from "validator-dutch"

const tests = {
  atLeastTenChars: Test().minLength(10),
  atLeastTenCharsOrEmpty: Test()
    .minLength(10)
    .optional(),
  date: Test().date()
}

const input = {
  atLeastTenChars: "123", // => fails, length is 3
  atLeastTenCharsOrEmpty: "", // => passes, because is optional
  date: "1-12-2018" // => passes
}

validate(input, tests)
```

Test properties:
(all functions are chainable)

```javascript
maxLength(maxLength)
minLength(minLength)
minAndMaxLength(minLength, maxLength)
required()
optional()
dateObject() // usually used for date-pickers
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

Input is always required unless you use `optional()`. `required()` is only used when no further specification of the input is necessary.
