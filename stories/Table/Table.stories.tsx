import { Meta, StoryObj } from '@storybook/react'

import { Table, TableProps, Card, Pagination, IconButton, SelectedRowKey } from 'components'
import { useState } from 'react'
import { Paginator } from 'components'

const meta: Meta<typeof Table> = {
  component: Table,
  args: {
    onSortRequest: undefined,
  },
}

export default meta

type TestDataType = {
  id: number
  title: string
  author: string
  price: number
  publisher: {
    name: string
    publisherId: string
  }
}

const sampleData: TestDataType[] = [
  {
    id: 1,
    title: 'Test 1',
    author: 'Author 1',
    price: 5.0,
    publisher: {
      name: 'Publisher 1',
      publisherId: 'p1',
    },
  },
  {
    id: 2,
    title: 'Test 2',
    author: 'Author 2',
    price: 7.99,
    publisher: {
      name: 'Publisher 1',
      publisherId: 'p1',
    },
  },
  {
    id: 3,
    title: 'Test 3',
    author: 'Author 1',
    price: 11.99,
    publisher: {
      name: 'Publisher 2',
      publisherId: 'p2',
    },
  },
  {
    id: 4,
    title: 'Test 4',
    author: 'Author 3',
    price: 9.99,
    publisher: {
      name: 'Publisher 2',
      publisherId: 'p2',
    },
  },
]

type Story = StoryObj<typeof Table<TestDataType>>

export const NonSortable: Story = {
  args: {
    data: sampleData,
    fields: [
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
    ],
  },
}

export const Sortable: Story = {
  args: {
    ...NonSortable.args,
    fields: [
      {
        key: 'title',
        title: 'Title',
        sortable: true,
      },
      {
        key: 'author',
        title: 'Author',
        sortable: true,
      },
      {
        key: 'price',
        title: 'Price',
        sortable: true,
      },
      {
        key: 'publisher.name',
        title: 'Publisher',
        sortable: true,
      },
    ],
  },
}

export const Large: Story = {
  args: {
    ...NonSortable.args,
    rowHeight: 70,
  },
}

export const Small: Story = {
  args: {
    ...NonSortable.args,
    rowHeight: 20,
    paddings: 8,
  },
}

export const FixedHeightAndWidth: Story = {
  args: {
    ...NonSortable.args,
    height: 200,
    width: 250,
  },
}

export const StickyHeader: Story = {
  args: {
    ...NonSortable.args,
    data: sampleData.concat([
      {
        id: 5,
        title: 'Test 5',
        author: 'Author 3',
        price: 10.99,
        publisher: {
          name: 'Publisher 3',
          publisherId: 'p3',
        },
      },
      {
        id: 6,
        title: 'Test 6',
        author: 'Author 3',
        price: 10.99,
        publisher: {
          name: 'Publisher 3',
          publisherId: 'p3',
        },
      },
      {
        id: 7,
        title: 'Test 7',
        author: 'Author 3',
        price: 10.99,
        publisher: {
          name: 'Publisher 3',
          publisherId: 'p3',
        },
      },
    ]),
    stickyHeader: true,
    height: 250,
  },
}

export const VerticalHeader: Story = {
  args: {
    ...Sortable.args,
    verticalHeader: true,
  },
}

export const StickyVerticalHeader: Story = {
  args: {
    ...VerticalHeader.args,
    width: 300,
    stickyHeader: true,
  },
}

export const CustomCells: Story = {
  args: {
    data: sampleData,
    fields: [
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
        key: 'id',
        title: 'Action',
        renderCell: (data) => {
          return <button>Action {data.title}</button>
        },
      },
      {
        key: 'id',
        title: 'Delete',
        renderCell: (data) => {
          return <button>Delete {data.title}</button>
        },
      },
    ],
  },
}

export const SortableWithHandler: Story = {
  args: {
    ...NonSortable.args,
    fields: [
      {
        key: 'title',
        title: 'Title',
        sortable: true,
      },
      {
        key: 'author',
        title: 'Author',
        sortable: true,
      },
      {
        key: 'price',
        title: 'Price',
        sortable: true,
      },
      {
        key: 'publisher.name',
        title: 'Publisher',
        sortable: true,
      },
    ],
    onSortRequest: (sortKey) => {
      console.log(sortKey)
    },
  },
}

type IntegratedDataType = {
  id: number
  name: string
  code: string
  price: string
  pe: number
  isFavorite: boolean
}

const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Stock ${i + 1}`,
  code: `STOCK${i + 1}`,
  price: '999.99',
  pe: (i + 1) / 10,
  isFavorite: i === 0 ? true : false,
}))

const MAX_PAGE_SIZE = 20

const IntegratedComponent = (props: TableProps<IntegratedDataType>) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [tableData, setTableData] = useState(data.slice(0, MAX_PAGE_SIZE))

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Card
        css={{
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 0,
          paddingRight: 0,
          width: '100%',
          height: '100%',
          maxWidth: '768px',
        }}
        border={false}
        shadow
      >
        <Table stickyHeader css={{ maxHeight: '387px' }} width="100%" {...props} data={tableData} />
        <div
          style={{
            display: 'flex',
            marginTop: '16px',
            marginBottom: '16px',
            justifyContent: 'center',
          }}
        >
          <Pagination
            pages={Math.ceil(data.length / MAX_PAGE_SIZE)}
            currentPage={pageNumber}
            onNextClick={() => {
              const newPageNum = pageNumber + 1
              setTableData(Paginator.paginate(data, MAX_PAGE_SIZE, newPageNum))
              setPageNumber(newPageNum)
            }}
            onPrevClick={() => {
              const newPageNum = pageNumber - 1
              setTableData(Paginator.paginate(data, MAX_PAGE_SIZE, newPageNum))
              setPageNumber(newPageNum)
            }}
            onPageClick={(page) => {
              setTableData(Paginator.paginate(data, MAX_PAGE_SIZE, page))
              setPageNumber(page)
            }}
          />
        </div>
      </Card>
    </div>
  )
}
type IntegratedStory = StoryObj<typeof Table<IntegratedDataType>>
export const Integrated: IntegratedStory = {
  args: {
    fields: [
      {
        key: 'name',
        title: 'Name',
        sortable: true,
      },
      {
        key: 'code',
        title: 'Code',
        sortable: true,
      },
      {
        key: 'price',
        title: 'Price',
        sortable: true,
      },
      {
        key: 'pe',
        title: 'P/E',
        sortable: true,
      },
      {
        key: 'isFavorite',
        title: 'Favorite',
        sortable: true,
        renderCell: ({ isFavorite }) =>
          isFavorite ? (
            <IconButton icon="star-filled" color="#FFC107" height={24} width={24} />
          ) : (
            <IconButton icon="star-outlined" color="#FFC107" height={24} width={24} />
          ),
      },
    ],
  },
  render: (args) => <IntegratedComponent {...args} />,
}

export const SelectableRows: Story = {
  args: {
    ...NonSortable.args,
    fields: [
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
        key: 'publisher.publisherId',
        title: 'Publisher',
        renderCell: (item) => (
          <div style={{ textAlign: 'left' }}>
            <div>Publisher ID: {item.publisher.publisherId}</div>
            <div>Publisher Name: {item.publisher.name}</div>
          </div>
        ),
      },
      {
        key: 'id',
        title: 'Action',
        renderCell: (data) => {
          return (
            <button
              onClick={() => {
                console.log(data.title)
              }}
            >
              Action {data.title}
            </button>
          )
        },
      },
    ],
    hoverable: true,
  },
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<SelectedRowKey[]>([])
    const onRowClickHandler = (key: SelectedRowKey) => {
      if (selectedRows.some((k) => k === key)) {
        setSelectedRows(selectedRows.filter((k) => k !== key))
      } else {
        setSelectedRows([...selectedRows, key])
      }
    }

    return <Table {...args} selectedRows={selectedRows} onRowClick={onRowClickHandler} />
  },
}

export const CollapsibleTable: Story = {
  args: {
    ...NonSortable.args,
    fields: [
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
    ],
    hoverable: true,
    selectedRows: [1],
    renderRowDetail: (item) => (
      <>
        <div>
          <span>Publisher&apos;s ID: </span>
          <span>{item.publisher.publisherId}</span>
        </div>
        <div>
          <span>Publisher&apos;s Name: </span>
          <span>{item.publisher.name}</span>
        </div>
      </>
    ),
  },
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<SelectedRowKey[]>([])
    const onRowClickHandler = (key: SelectedRowKey) => {
      if (selectedRows.some((k) => k === key)) {
        setSelectedRows(selectedRows.filter((k) => k !== key))
      } else {
        setSelectedRows([key])
      }
    }

    return <Table {...args} selectedRows={selectedRows} onRowClick={onRowClickHandler} />
  },
}
