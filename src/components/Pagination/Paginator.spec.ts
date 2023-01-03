import Paginator from './Paginator'

describe('Paginator class', () => {
  describe('generateSlice', () => {
    type inputType = {
      current: number
      pages: number
      maxElements: number
      result: number[]
    }
    it.each`
      current | pages | result
      ${1}    | ${3}  | ${[1, 2, 3]}
      ${2}    | ${3}  | ${[1, 2, 3]}
      ${5}    | ${5}  | ${[3, 4, 5]}
      ${3}    | ${5}  | ${[2, 3, 4]}
      ${1}    | ${1}  | ${[1]}
      ${1}    | ${2}  | ${[1, 2]}
    `(
      'should return $result for the given inputs => current: $current, pages: $pages',
      ({ current, pages, result }: inputType) => {
        const output = Paginator.generateSlice(current, pages)
        expect(output).toEqual(result)
      }
    )

    it.each`
      current | pages | maxElements | result
      ${1}    | ${10} | ${5}        | ${[1, 2, 3, 4, 5]}
      ${3}    | ${10} | ${5}        | ${[1, 2, 3, 4, 5]}
      ${4}    | ${10} | ${5}        | ${[2, 3, 4, 5, 6]}
      ${5}    | ${10} | ${5}        | ${[3, 4, 5, 6, 7]}
      ${7}    | ${10} | ${5}        | ${[5, 6, 7, 8, 9]}
      ${8}    | ${10} | ${5}        | ${[6, 7, 8, 9, 10]}
      ${10}   | ${10} | ${5}        | ${[6, 7, 8, 9, 10]}
      ${5}    | ${10} | ${10}       | ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    `(
      'should return $result for the given inputs => current: $current, pages: $pages, maxElements: $maxElements',
      ({ current, pages, result, maxElements }: inputType) => {
        const output = Paginator.generateSlice(current, pages, maxElements)
        expect(output).toEqual(result)
      }
    )
  })

  describe('paginate', () => {
    type inputType = { array: number[]; pageSize: number; pageNumber: number; expected: number[] }
    it.each`
      array                    | pageSize | pageNumber | expected
      ${[1, 2, 3, 4, 5, 6]}    | ${2}     | ${1}       | ${[1, 2]}
      ${[1, 2, 3, 4, 5, 6]}    | ${2}     | ${2}       | ${[3, 4]}
      ${[1, 2, 3, 4, 5, 6]}    | ${2}     | ${3}       | ${[5, 6]}
      ${[1, 2, 3, 4, 5, 6, 7]} | ${5}     | ${1}       | ${[1, 2, 3, 4, 5]}
      ${[1, 2, 3, 4, 5, 6, 7]} | ${5}     | ${2}       | ${[6, 7]}
    `(
      'should return $expected for given inputs: => array: $array, pageSize: $pageSize, pageNumber: $pageNumber',
      ({ array, pageSize, pageNumber, expected }: inputType) => {
        const output = Paginator.paginate(array, pageSize, pageNumber)
        expect(output).toEqual(expected)
      }
    )
  })
})
