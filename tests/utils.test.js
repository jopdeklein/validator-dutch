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

describe('hasAllKeys', () => {
  test.each`
    a                           | b                           | expected
    ${{foo: 'bar', bar: 'baz'}} | ${{bar: 'baz', foo: 'bar'}} | ${true}
    ${{foo: 'bar'}}             | ${{bar: 'baz', foo: 'bar'}} | ${false}
    ${{foo: 'bar', bar: 'baz'}} | ${{foo: 'bar'}}             | ${false}
    ${{foo: 'bar', bar: 'baz'}} | ${{}}                       | ${false}
    ${{foo: 'bar', bar: 'baz'}} | ${'foo'}                    | ${false}
  `('returns $expected for $a and $b', ({a, b, expected}) => {
    expect(utils._hasAllKeys(a, b)).toEqual(expected)
  })
})
