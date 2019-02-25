const isValidObject = (obj) =>
  obj.constructor === Object && Object.keys(obj).length > 0

// TODO: Export invidiual utils
module.exports = {
  _isValidObject(...objects) {
    return objects.every(isValidObject)
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
    const inputKeys = Object.keys(input)
    const testsKeys = Object.keys(tests)
    if(
      !isValidObject(input) || !isValidObject(tests) ||
      inputKeys.length !== testsKeys.length
    ) return false

    return inputKeys.every((k) => testsKeys.includes(k))
  }
}
