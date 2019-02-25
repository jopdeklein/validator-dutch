const { validate, Test } = require("../app")
const _messages = require("../messages")
const _utils = require("../utils")
const _errors = require("../errorMessages")

//normal methods

describe("maxLength", () => {
  it("Should return null if input is 2 characters or shorter", () => {
    const tests = {
      one: Test().maxLength(2)
    }
    const input = {
      one: "12"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })
  it("Should return an errorobject if input is longer then 2 characters", () => {
    const tests = {
      one: Test().maxLength(2)
    }
    const input = {
      one: "123"
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty(
      "one",
      _utils._setMessage(_messages.maxLength, { maxLength: 2 })
    )
  })
  it("Should throw if maxLength is not defined or not of type number", () => {
    expect(() => {
      Test().maxLength()
    }).toThrowError(new Error(_errors.maxLength))
    expect(() => {
      Test().maxLength([])
    }).toThrowError(new Error(_errors.maxLength))
    expect(() => {
      Test().maxLength("a")
    }).toThrowError(new Error(_errors.maxLength))
    expect(() => {
      Test().maxLength(2)
    }).not.toThrow()
  })
  it("Should return the string error if input is not a string", () => {
    const tests = {
      one: Test().maxLength(4)
    }
    const input = {
      one: 21
    }

    const result = validate(input, tests)
    expect(result).toHaveProperty("one", _messages.notAString)
  })
})

describe("minLength", () => {
  it("Should return null if input is 2 characters or longer", () => {
    const tests = {
      one: Test().minLength(2)
    }
    const input = {
      one: "12"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })
  it("Should return an errorobject if input is shorther then 2 characters", () => {
    const tests = {
      one: Test().minLength(2)
    }
    const input = {
      one: "1"
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty(
      "one",
      _utils._setMessage(_messages.minLength, { minLength: 2 })
    )
  })
  it("Should return the string error if input is not a string", () => {
    const tests = {
      one: Test().minLength(4)
    }
    const input = {
      one: 21
    }

    const result = validate(input, tests)
    expect(result).toHaveProperty("one", _messages.notAString)
  })
  it("Should throw if minLength is not defined or not of type number", () => {
    expect(() => {
      Test().minLength()
    }).toThrowError(new Error(_errors.minLength))
    expect(() => {
      Test().minLength([])
    }).toThrowError(new Error(_errors.minLength))
    expect(() => {
      Test().minLength("a")
    }).toThrowError(new Error(_errors.minLength))
    expect(() => {
      Test().minLength(2)
    }).not.toThrow()
  })
})

describe("minAndMaxLength", () => {
  it("Should return null if input us between min and max length", () => {
    const tests = {
      one: Test().minAndMaxLength(1, 2),
      two: Test().minAndMaxLength(3, 4)
    }
    const input = {
      one: "12",
      two: "1234"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })

  it("Should return an error object if input is short then min or larger then max", () => {
    const tests = {
      one: Test().minAndMaxLength(2, 3),
      two: Test().minAndMaxLength(3, 4)
    }
    const input = {
      one: "1",
      two: "12345"
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty(
      "one",
      _utils._setMessage(_messages.minAndMaxLength, {
        minLength: 2,
        maxLength: 3
      })
    )
    expect(result).toHaveProperty(
      "two",
      _utils._setMessage(_messages.minAndMaxLength, {
        minLength: 3,
        maxLength: 4
      })
    )
  })

  it("Should return the string error if input is not a string", () => {
    const tests = {
      one: Test().minAndMaxLength(4, 5)
    }
    const input = {
      one: 21
    }

    const result = validate(input, tests)
    expect(result).toHaveProperty("one", _messages.notAString)
  })

  it("Should throw if minLength or maxLength is not defined or not of type number", () => {
    expect(() => {
      Test().minAndMaxLength("a", "b")
    }).toThrowError(new Error(_errors.minAndMaxLength[1]))
    expect(() => {
      Test().minAndMaxLength([])
    }).toThrowError(new Error(_errors.minAndMaxLength[1]))
    expect(() => {
      Test().minAndMaxLength(1)
    }).toThrowError(new Error(_errors.minAndMaxLength[1]))
    expect(() => {
      Test().minAndMaxLength("a")
    }).toThrowError(new Error(_errors.minAndMaxLength[1]))
    expect(() => {
      Test().minAndMaxLength(2, 3)
    }).not.toThrow()
  })

  it("Should throw if minLength is bigger then or equal to maxLengt", () => {
    expect(() => {
      Test().minAndMaxLength(2, 1)
    }).toThrowError(new Error(_errors.minAndMaxLength[0]))
    expect(() => {
      Test().minAndMaxLength(1, 1)
    }).toThrowError(new Error(_errors.minAndMaxLength[0]))

    expect(() => {
      Test().minAndMaxLength(2, 3)
    }).not.toThrow()
  })
})

describe("required", () => {
  it("Should return null if an input is given", () => {
    const tests = {
      string: Test().required()
    }
    const input = {
      string: "a"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })
  it("Should return an errorobject if no input input is given", () => {
    const tests = {
      one: Test().required()
    }
    const input = {
      one: ""
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty("one", _messages.required)
  })
  it("Should return the string error if input is not a string", () => {
    const tests = {
      one: Test().required()
    }
    const input = {
      one: 21
    }

    const result = validate(input, tests)
    expect(result).toHaveProperty("one", _messages.notAString)
  })
  it("Should throw if input is optional as well", () => {
    expect(() => {
      Test()
        .optional()
        .required()
    }).toThrowError(new Error(_errors.required))
  })
})

describe("dateObject", () => {
  it("should return null if a date object is passed as a value", () => {
    const tests = {
      one: Test().dateObject()
    }

    const input = {
      one: new Date()
    }

    const result = validate(input, tests)
    expect(result).toBeNull()
  })
  it("should return an error if the type is not a date object", () => {
    const tests = {
      one: Test().dateObject()
    }

    const input = {
      one: "12-12-2012"
    }

    const result = validate(input, tests)
    expect(result).toHaveProperty("one", _messages.dateObject)
  })
})

describe("optional", () => {
  it("should throw if input is required at the same time", () => {
    expect(() => {
      Test()
        .required()
        .optional()
    }).toThrowError(new Error(_errors.optional))
  })

  it("should delete the error if one was made when input is optional and empty", () => {
    const tests = {
      one: Test()
        .minLength(10)
        .optional(),
      two: Test().optional()
    }
    const input = {
      one: "",
      two: ""
    }
    const result = validate(input, tests)
    expect(result).toBeNull()
  })

  it("Should return an error if item is optional and defined, but doesn't match the other test", () => {
    const tests = {
      one: Test()
        .minLength(10)
        .optional(),
      two: Test()
        .optional()
        .postalCode()
    }
    const input = {
      one: "123456789",
      two: "Not A PostalCode"
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty(
      "one",
      _utils._setMessage(_messages.minLength, { minLength: 10 })
    )
    expect(result).toHaveProperty("two", _messages.postalCode)
  })
})

// regex methods

describe("email", () => {
  it("Should return null if input is a valid e-mailadress", () => {
    const tests = {
      one: Test().email(),
      three: Test().email(),
      four: Test().email(),
      five: Test().email(),
      six: Test().email(),
      seven: Test().email()
    }
    const input = {
      one: "test@test.nl",
      three: "test_test@test-test.nl",
      four: "test.test1@test.nl",
      five: "test134@test.nl",
      six: "test.test@test.test.nl",
      seven: "test-test1@test-test.test.nl"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })
  it("Should return the email error if input an invalid e-mailadres is given", () => {
    const tests = {
      email: Test().email()
    }
    const input = {
      email: "false email"
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty("email", _messages.email)
  })
  it("Should return the string error if input is not a string", () => {
    const tests = {
      one: Test().email()
    }
    const input = {
      one: 21
    }

    const result = validate(input, tests)
    expect(result).toHaveProperty("one", _messages.notAString)
  })
})

describe("dutchPhone", () => {
  it("Should return null if input is a valid dutch phone number", () => {
    const tests = {
      one: Test().dutchPhone(),
      two: Test().dutchPhone(),
      three: Test().dutchPhone(),
      four: Test().dutchPhone(),
      five: Test().dutchPhone(),
      six: Test().dutchPhone(),
      seven: Test().dutchPhone(),
      eight: Test().dutchPhone(),
      nine: Test().dutchPhone(),
      ten: Test().dutchPhone(),
      eleven: Test().dutchPhone(),
      twelve: Test().dutchPhone(),
      thirteen: Test().dutchPhone(),
      fourteen: Test().dutchPhone(),
      fifteen: Test().dutchPhone(),
      sixteen: Test().dutchPhone(),
      seventeen: Test().dutchPhone(),
      eighteen: Test().dutchPhone(),
      nineteen: Test().dutchPhone(),
      twenty: Test().dutchPhone(),
      twentyone: Test().dutchPhone()
    }
    const input = {
      one: "06-12345678",
      two: "06 12345678",
      three: "0612345678",
      four: "0031612345678",
      five: "06 12 34 56 78",
      six: "0031 6 12345678",
      seven: "0031 (0) 6 12345678",
      eight: "0031-6-12345678",
      nine: "+31(0)612345678",
      ten: "+31 (0) 612345678",
      eleven: "+31 (0) 6 12345678",
      eleven: "+31 6 12345678",
      twelve: "+31612345678",
      thirteen: "+31-6-12345678",
      fourteen: "030-1234567",
      fifteen: "030 1234567",
      sixteen: "0301234567",
      seventeen: "+31 (0) 30 123 45 67",
      eighteen: "+31 30 1234567",
      nineteen: "+31-30-1234567",
      twenty: "+31301234567",
      twentyone: "+31(0)301234567"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })
  it("Should return an errorobject if input is not a valid dutch phone number", () => {
    const tests = {
      one: Test().dutchPhone(),
      two: Test().dutchPhone(),
      three: Test().dutchPhone(),
      four: Test().dutchPhone(),
      five: Test().dutchPhone(),
      six: Test().dutchPhone()
    }
    const input = {
      one: "06-1234567",
      two: "06 123456789",
      three: "03012345678",
      four: "030123456",
      five: "06 12 3456 78",
      six: "0031 6 1234567"
    }
    const result = validate(input, tests)

    const obj = {
      one: _messages.dutchPhone,
      two: _messages.dutchPhone,
      three: _messages.dutchPhone,
      four: _messages.dutchPhone,
      five: _messages.dutchPhone,
      six: _messages.dutchPhone
    }

    expect(result).toMatchObject(obj)
  })
  it("Should return the string error if input is not a string", () => {
    const tests = {
      one: Test().dutchPhone()
    }
    const input = {
      one: []
    }

    const result = validate(input, tests)
    expect(result).toHaveProperty("one", _messages.notAString)
  })
})

describe("dutchMobile", () => {
  it("Should return null if input is a valid dutch phone number", () => {
    const tests = {
      one: Test().dutchMobile(),
      two: Test().dutchMobile(),
      three: Test().dutchMobile(),
      four: Test().dutchMobile(),
      five: Test().dutchMobile(),
      six: Test().dutchMobile(),
      seven: Test().dutchMobile(),
      eight: Test().dutchMobile(),
      nine: Test().dutchMobile(),
      ten: Test().dutchMobile(),
      eleven: Test().dutchMobile(),
      twelve: Test().dutchMobile(),
      thirteen: Test().dutchMobile()
    }

    const input = {
      one: "06-12345678",
      two: "06 12345678",
      three: "0612345678",
      four: "0031612345678",
      five: "06 12 34 56 78",
      six: "0031 6 12345678",
      seven: "0031 (0) 6 12345678",
      eight: "0031-6-12345678",
      nine: "+31(0)612345678",
      ten: "+31 (0) 612345678",
      eleven: "+31 (0) 6 12345678",
      eleven: "+31 6 12345678",
      twelve: "+31612345678",
      thirteen: "+31-6-12345678"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })
  it("Should return an errorobject if input is not a valid dutch phone number", () => {
    const tests = {
      one: Test().dutchMobile(),
      two: Test().dutchMobile(),
      three: Test().dutchMobile(),
      four: Test().dutchMobile(),
      five: Test().dutchMobile(),
      six: Test().dutchMobile()
    }
    const input = {
      one: "06-1234567",
      two: "06 123456789",
      three: "03012345678",
      four: "030123456",
      five: "06 12 3456 78",
      six: "0031 6 1234567"
    }
    const result = validate(input, tests)

    const obj = {
      one: _messages.dutchMobile,
      two: _messages.dutchMobile,
      three: _messages.dutchMobile,
      four: _messages.dutchMobile,
      five: _messages.dutchMobile,
      six: _messages.dutchMobile
    }

    expect(result).toMatchObject(obj)
  })
  it("Should return the string error if input is not a string", () => {
    const tests = {
      one: Test().dutchMobile()
    }
    const input = {
      one: []
    }

    const result = validate(input, tests)
    expect(result).toHaveProperty("one", _messages.notAString)
  })
})

describe("postalCode", () => {
  it("Should return null if a valid postalcode is given", () => {
    const tests = {
      one: Test().postalCode(),
      two: Test().postalCode()
    }
    const input = {
      one: "1234 AB",
      two: "1234AB"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })

  it("Should return an errorobject if invalid postalcode is given", () => {
    const tests = {
      one: Test().postalCode(),
      two: Test().postalCode()
    }
    const input = {
      one: "1234 ABc",
      two: "1234-AB"
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty("one", _messages.postalCode)
    expect(result).toHaveProperty("two", _messages.postalCode)
  })
  const tests = {
    one: Test().postalCode()
  }
  const input = {
    one: {}
  }

  const result = validate(input, tests)
  expect(result).toHaveProperty("one", _messages.notAString)
})

describe("time", () => {
  it("Should return null if a valid time is given", () => {
    const tests = {
      one: Test().time(),
      two: Test().time()
    }
    const input = {
      one: "13:00",
      two: "0:00"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })

  it("Should return an errorobject if invalid time is given", () => {
    const tests = {
      one: Test().time(),
      two: Test().time()
    }
    const input = {
      one: "25:00",
      two: "1200"
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty("one", _messages.time)
    expect(result).toHaveProperty("two", _messages.time)
  })
  const tests = {
    one: Test().time()
  }
  const input = {
    one: () => {
      return "Fuck my life!"
    }
  }

  const result = validate(input, tests)
  expect(result).toHaveProperty("one", _messages.notAString)
})

describe("date", () => {
  it("Should return null if a valid date is given", () => {
    const tests = {
      one: Test().date(),
      two: Test().date(),
      three: Test().date()
    }
    const input = {
      one: "15/12/3014",
      two: "24-12-2018",
      three: "25.3.2017"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })

  it("Should return an errorobject if invalid date is given", () => {
    const tests = {
      one: Test().date(),
      two: Test().date()
    }
    const input = {
      one: "15/13/2019",
      two: "31/2/2019"
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty("one", _messages.date)
    expect(result).toHaveProperty("two", _messages.date)
  })

  const tests = {
    one: Test().date()
  }
  const input = {
    one: 21.12
  }

  const result = validate(input, tests)
  expect(result).toHaveProperty("one", _messages.notAString)
})

describe("number", () => {
  it("Should return null if a valid number is given", () => {
    const tests = {
      one: Test().number(),
      two: Test().number()
    }
    const input = {
      one: "1",
      two: "1,22"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })

  it("Should return an errorobject if invalid number is given", () => {
    const tests = {
      one: Test().number(),
      two: Test().number()
    }
    const input = {
      one: "1,2,3",
      two: "a"
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty("one", _messages.number)
    expect(result).toHaveProperty("two", _messages.number)
  })
  const tests = {
    one: Test().number()
  }
  const input = {
    one: 21
  }

  const result = validate(input, tests)
  expect(result).toHaveProperty("one", _messages.notAString)
})

describe("fullName", () => {
  it("Should return null if a valid fullName is given", () => {
    const tests = {
      one: Test().fullName(),
      two: Test().fullName()
    }
    const input = {
      one: "L.J. Verstijnen",
      two: "Maarten v/d Weide"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })

  it("Should return an errorobject if invalid fullName is given", () => {
    const tests = {
      one: Test().fullName(),
      two: Test().fullName()
    }
    const input = {
      one: "Jan",
      two: "Pieter Klaas Jan Marco Nico Bert Hans"
    }
    const result = validate(input, tests)

    expect(result).toHaveProperty("one", _messages.fullName)
    expect(result).toHaveProperty("two", _messages.fullName)
  })
  it("Should return the string error if input is not a string", () => {
    const tests = {
      one: Test().fullName()
    }
    const input = {
      one: null
    }

    const result = validate(input, tests)
    expect(result).toHaveProperty("one", _messages.notAString)
  })
})

describe("regex", () => {
  it("Should return null if input is matching regex", () => {
    const tests = {
      one: Test().regex(/a/, "a")
    }
    const input = {
      one: "a"
    }
    const result = validate(input, tests)

    expect(result).toBeNull()
  })
  it("Should return an errorobject if input is not matching regex", () => {
    const tests = {
      one: Test().regex(/a/, "a")
    }
    const input = {
      one: "b"
    }
    const result = validate(input, tests)
    expect(result).toHaveProperty(
      "one",
      _utils._setMessage(_messages.regex, { example: "a" })
    )
  })
  it("Should throw if regex or example is not defined", () => {
    expect(() => {
      Test().regex(null, "a")
    }).toThrowError(_errors.regex)
    expect(() => {
      Test().regex(/a/, null)
    }).toThrowError(_errors.regex)
    expect(() => {
      Test().regex(/a/, {})
    }).toThrowError(_errors.regex)
    expect(() => {
      Test().regex("a", "b")
    }).toThrowError(_errors.regex)
  })
  const tests = {
    one: Test().regex(/a/, "a")
  }
  const input = {
    one: /a/
  }

  const result = validate(input, tests)
  expect(result).toHaveProperty("one", _messages.notAString)
})
