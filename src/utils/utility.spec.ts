import { SORT_ORDER } from 'components'
import { sortObjects } from './utility'

type TestData = {
  id: number
  price: number
  title: string
}

describe('sortObjects', () => {
  let testData: TestData[]

  beforeEach(() => {
    testData = [
      {
        id: 1,
        price: 10,
        title: 'Test1',
      },
      {
        id: 2,
        price: 20,
        title: 'Test2',
      },
      {
        id: 3,
        price: 5,
        title: 'Test3',
      },
      {
        id: 4,
        price: 10,
        title: 'Test4',
      },
    ]
  })

  it('should sort objects in descending order', () => {
    sortObjects(testData, 'price', SORT_ORDER.DESC)
    expect(testData[0].price).toBe(20)
  })

  it('should sort objects in ascending order', () => {
    sortObjects(testData, 'price', SORT_ORDER.ASC)
    expect(testData[0].price).toBe(5)
  })

  it('should sort objects by string in descending order', () => {
    sortObjects(testData, 'title', SORT_ORDER.DESC)
    expect(testData[0].title).toBe('Test4')
  })

  it('should sort objects by string in ascending order', () => {
    sortObjects(testData, 'title', SORT_ORDER.ASC)
    expect(testData[0].title).toBe('Test1')
  })
})
