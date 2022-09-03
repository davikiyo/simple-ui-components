const MAX_ELEMENTS = 3
/**
 * Paginator
 *
 * generates an array of numbers to use in the pagination.
 */
export default class Paginator {
  private currentPage: number
  private pages: number
  private midIndex: number
  private maxElements: number

  private constructor(currentPage: number, pages: number, maxElements: number) {
    this.currentPage = currentPage
    this.pages = pages
    this.midIndex = Math.floor(maxElements / 2)
    this.maxElements = maxElements
  }

  /**
   * Constructs and generate a slice of pages.
   *
   * @param currentPage - The current page number
   * @param pages - The total page number
   * @param maxElements - The total number of elements
   * @returns - A slice of number with the current page in the middle
   * @example
   * 1. generateSlice(1, 10) -> [1, 2, 3]
   * 2. generateSlice(3, 10) -> [2, 3, 4]
   * 3. generateSlice(10, 10) -> [8, 9, 10]
   *
   */
  public static generateSlice(
    currentPage: number,
    pages: number,
    maxElements: number = MAX_ELEMENTS
  ) {
    const paginate = new Paginator(currentPage, pages, maxElements)

    let startNumber = paginate.currentPage - paginate.midIndex

    if (startNumber < 1) {
      startNumber = 1
    } else if (startNumber + paginate.maxElements > paginate.pages) {
      startNumber = paginate.pages - paginate.maxElements + 1
    }

    return Array.from({ length: paginate.maxElements }, (_, i) => i + startNumber)
  }

  /**
   * Paginates the elements in a given array.
   *
   * @param array - The array to be paginated
   * @param pageSize - The total number of elements in per page
   * @param pageNumber - The current page number
   * @returns - A slice of elements in the given page number
   */
  public static paginate(array: any[], pageSize: number, pageNumber: number) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  }
}
