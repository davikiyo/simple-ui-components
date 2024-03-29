import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Table, { TableFieldType } from './Table'

interface TestDataType {
  id: number
  title: string
  author: string
  price: number
  publisher: {
    name: string
    id: string
  }
  coAuthors?: string[]
}

describe('Table component', () => {
  const onSortHandlerMock = jest.fn()
  let data: TestDataType[]
  let fields: TableFieldType<TestDataType>[]
  let vertical = false
  let hoverable = false
  let renderRowDetail: ((item: TestDataType) => JSX.Element) | undefined
  let selectedRows: number[]
  const onRowClickHandler = jest.fn()

  beforeEach(() => {
    data = [
      {
        id: 1,
        title: 'Title1',
        author: 'Author1',
        price: 10,
        publisher: {
          id: 'p1',
          name: 'Publisher1',
        },
      },
      {
        id: 2,
        title: 'Title2',
        author: 'Author2',
        price: 9,
        publisher: {
          id: 'p2',
          name: 'Publisher2',
        },
        coAuthors: ['Author3', 'Author4'],
      },
    ]
    fields = [
      {
        key: 'title',
        title: 'Title',
      },
      {
        key: 'author',
        title: 'Author',
      },
      {
        key: 'price',
        title: 'Price',
      },
      {
        key: 'publisher.name',
        title: 'Publisher',
      },
      {
        key: 'coAuthors',
        title: 'Co-Authors',
      },
    ]
    vertical = false
    hoverable = false
    selectedRows = []
    renderRowDetail
    renderRowDetail = undefined
    onRowClickHandler.mockClear()
    onSortHandlerMock.mockClear()
  })

  const initialize = () =>
    render(
      <Table
        data={data}
        fields={fields}
        onSortRequest={onSortHandlerMock}
        verticalHeader={vertical}
        onRowClick={onRowClickHandler}
        hoverable={hoverable}
        selectedRows={selectedRows}
        renderRowDetail={renderRowDetail}
      />
    )

  it('should render a table', () => {
    initialize()

    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('should render a table with correct header', () => {
    initialize()

    fields.forEach((field) => {
      const title = field.title ? field.title : field.key
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  it('should render a table with correct data', () => {
    initialize()

    data.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.author)).toBeInTheDocument()
      expect(screen.getByText(item.price)).toBeInTheDocument()
      expect(screen.getByText(item.publisher.name)).toBeInTheDocument()
    })
  })

  it('should render a sortable table head and trigger an event when clicked', async () => {
    fields[0].sortable = true
    initialize()

    await userEvent.click(screen.getByRole('button', { name: /Title/ }))
    expect(onSortHandlerMock).toHaveBeenCalled()
  })

  it('should sort the field when a handler is not provided', async () => {
    fields[0].sortable = true
    const { asFragment } = render(<Table data={data} fields={fields} />)

    await userEvent.click(screen.getByRole('button', { name: /Title/ }))
    await userEvent.click(screen.getByRole('button', { name: /Title/ }))
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render a custom cell', async () => {
    fields[0].renderCell = () => 'TEST'
    initialize()

    expect(screen.getAllByText('TEST')).toHaveLength(data.length)
  })

  it('should render a table with vertical headers', () => {
    vertical = true
    const { asFragment } = initialize()

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render a sortable field in the table with vertical headers', async () => {
    vertical = true
    fields[0].sortable = true
    initialize()

    await userEvent.click(screen.getByRole('button', { name: /Title/ }))
    expect(onSortHandlerMock).toHaveBeenCalled()
  })

  it('should render a custom cell in the table with vertical headers', async () => {
    fields[0].renderCell = (item) => <button>{item.title}</button>
    vertical = true
    initialize()

    expect(screen.getByRole('button', { name: data[0].title })).toBeInTheDocument()
  })

  it('should render the key as a column header when there is no title', () => {
    fields[0].title = undefined
    vertical = true
    initialize()
    expect(screen.getByRole('columnheader', { name: fields[0].key })).toBeInTheDocument()
  })

  it('should render a table with hoverable rows', () => {
    hoverable = true
    initialize()
    const tableRowGroups = screen.getAllByRole('rowgroup')
    expect(within(tableRowGroups[1]).getAllByRole('button')).toHaveLength(data.length)
  })

  it('should render a table with hoverable rows', () => {
    hoverable = true
    initialize()
    const tableRowGroups = screen.getAllByRole('rowgroup')
    expect(within(tableRowGroups[1]).getAllByRole('button')).toHaveLength(data.length)
  })

  it('should trigger the onClick event when clicked on the selectable rows', async () => {
    hoverable = true
    initialize()
    const tableRowGroups = screen.getAllByRole('rowgroup')
    const tableRows = within(tableRowGroups[1]).getAllByRole('button')
    await userEvent.click(tableRows[0])
    expect(onRowClickHandler).toBeCalledWith(data[0].id, 0)
  })

  it(`should display the selected row's details`, () => {
    selectedRows = [1]
    // eslint-disable-next-line react/display-name
    renderRowDetail = (item) => (
      <>
        <div data-testid={`publisher-id-${item.id}`}>
          <span>Publisher&apos;s ID:</span>
          <span>{item.publisher.id}</span>
        </div>
        <div data-testid={`publisher-name-${item.id}`}>
          <span>Publisher&apos;s Name:</span>
          <span>{item.publisher.name}</span>
        </div>
      </>
    )
    initialize()
    expect(screen.getByTestId('publisher-id-1')).toBeInTheDocument()
    expect(screen.getByTestId('publisher-name-1')).toBeInTheDocument()
  })
})
