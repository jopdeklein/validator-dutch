module.exports = {
  _isValidObject(...objects) {
    let isObject = true
    objects.forEach(obj => {
      if (obj.constructor !== Object) isObject = false
      if (Object.keys(obj).length === 0) isObject = false
    })
    return isObject
  },
  _isTest(tests) {
    let isTest = true
    for (key in tests) {
      if (!tests[key].isTest) isTest = false
    }
    return isTest
  },
  _setMessage(message, replacers) {
    return message.replace(/{{(\w+)}}/g, (m, p1) => {
      return replacers[p1]
    })
  },
  _hasAllKeys(input, tests) {
    let hasAllKeys = true
    for (key in tests) {
      if (!input.hasOwnProperty(key)) hasAllKeys = false
    }
    for (key in input) {
      if (!tests.hasOwnProperty(key)) hasAllKeys = false
    }
    return hasAllKeys
  }
}
