import { NestedKeys } from './models/table'
import { extractNestedObject } from './utils'

describe('utils', () => {
  describe('extractNestedObject', () => {
    const testData = {
      a: {
        b: {
          c: {
            d: {
              e: 'f',
            },
          },
        },
      },
      array: ['TEST1', 'TEST2'],
      number: 1234,
      boolean: true,
    }
    type TestType = {
      key: NestedKeys<typeof testData, 5>
      expected: any
    }

    it.each<TestType>([
      {
        key: 'a',
        expected: JSON.stringify(testData.a),
      },
      {
        key: 'a.b',
        expected: JSON.stringify(testData.a.b),
      },
      {
        key: 'a.b.c.d.e',
        expected: testData.a.b.c.d.e,
      },
      {
        key: 'array',
        expected: JSON.stringify(testData.array),
      },
      {
        key: 'number',
        expected: testData.number,
      },
      {
        key: 'boolean',
        expected: testData.boolean,
      },
    ])('should extract $key from the object', ({ key, expected }) => {
      const result = extractNestedObject(testData, key)
      expect(result).toEqual(expected)
    })
  })
})
