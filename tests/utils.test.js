const utils = require("../utils")

describe("isValidObject", () => {
  it("should return true if all given objects are actual objects and have at least one property and else return false", () => {
    expect(utils._isValidObject({}, {})).toBe(false)
    expect(utils._isValidObject({ one: "" })).toBe(true)
    expect(utils._isValidObject(["one"], ["two"])).toBe(false)
    expect(utils._isValidObject({ one: "" }, {})).toBe(false)
    expect(
      utils._isValidObject(
        { one: "" },
        { two: undefined },
        { three: null },
        { four: [] },
        { five: false }
      )
    ).toBe(true)
  })
})
