import Paginator from './Paginator'

type inputType = {
  current: number
  pages: number
  maxElements: number
  result: number[]
}

describe('Paginator class', () => {
  it.each`
    current | pages | result
    ${1}    | ${3}  | ${[1, 2, 3]}
    ${2}    | ${3}  | ${[1, 2, 3]}
    ${5}    | ${5}  | ${[3, 4, 5]}
    ${3}    | ${5}  | ${[2, 3, 4]}
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
