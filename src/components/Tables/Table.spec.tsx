import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TableField } from './models/table'
import Table from './Table'

type TestDataType = {
  id: number
  title: string
  author: string
  price: number
  publisher: string
}

describe('Table component', () => {
  const onSortHandlerMock = jest.fn()
  let data: TestDataType[]
  let fields: TableField<TestDataType>[]
  let vertical = false

  beforeEach(() => {
    data = [
      {
        id: 1,
        title: 'Title1',
        author: 'Author1',
        price: 10,
        publisher: 'Publisher1',
      },
      {
        id: 2,
        title: 'Title2',
        author: 'Author2',
        price: 9,
        publisher: 'Publisher2',
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
        key: 'publisher',
        title: 'Publisher',
      },
    ]
    vertical = false
    onSortHandlerMock.mockClear()
  })

  const initialize = () =>
    render(
      <Table
        data={data}
        fields={fields}
        onSortRequest={onSortHandlerMock}
        verticalHeader={vertical}
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
      expect(screen.getByText(item.publisher)).toBeInTheDocument()
    })
  })

  it('should render a sortable table head and trigger an event when clicked', async () => {
    fields[0].sortable = true
    initialize()

    await userEvent.click(screen.getByRole('button', { name: 'Title' }))
    expect(onSortHandlerMock).toHaveBeenCalled()
  })

  it('should sort the field when a handler is not provided', async () => {
    fields[0].sortable = true
    const { asFragment } = render(<Table data={data} fields={fields} />)

    await userEvent.click(screen.getByRole('button', { name: 'Title' }))
    await userEvent.click(screen.getByRole('button', { name: 'Title' }))
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

    await userEvent.click(screen.getByRole('button', { name: 'Title' }))
    expect(onSortHandlerMock).toHaveBeenCalled()
  })

  it('should render a custom cell in the table with vertical headers', async () => {
    fields[0].renderCell = () => 'TEST'
    vertical = true
    initialize()

    expect(screen.getAllByText('TEST')).toHaveLength(data.length)
  })
})
