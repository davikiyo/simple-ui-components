import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Table, TableProps, TableField, TableData, Card, Pagination, IconButton } from 'components'
import { useState } from 'react'
import { Paginator } from 'components'

export default {
  component: Table,
  args: {
    onSortRequest: undefined,
  },
} as ComponentMeta<typeof Table>

type TestDataType = {
  id: number
  title: string
  author: string
  price: number
  publisher: string
}

const sampleData: TableData<TestDataType>[] = [
  {
    id: 1,
    title: 'Test 1',
    author: 'Author 1',
    price: 5.0,
    publisher: 'Publisher 1',
  },
  {
    id: 2,
    title: 'Test 2',
    author: 'Author 2',
    price: 7.99,
    publisher: 'Publisher 1',
  },
  {
    id: 3,
    title: 'Test 3',
    author: 'Author 1',
    price: 11.99,
    publisher: 'Publisher 2',
  },
  {
    id: 4,
    title: 'Test 4',
    author: 'Author 3',
    price: 9.99,
    publisher: 'Publisher 2',
  },
]

const tableFields: TableField<TestDataType>[] = [
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

const Template: ComponentStory<typeof Table> = (args: TableProps) => <Table {...args} />

export const NonSortable = Template.bind({})
NonSortable.args = {
  data: sampleData,
  fields: tableFields,
}

export const Sortable = Template.bind({})
Sortable.args = {
  ...NonSortable.args,
  fields: [
    {
      key: 'title',
      title: 'Title',
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
      key: 'publisher',
      title: 'Publisher',
      sortable: true,
    },
  ],
}

export const Large = Template.bind({})
Large.args = {
  ...NonSortable.args,
  rowHeight: 70,
}

export const Small = Template.bind({})
Small.args = {
  ...NonSortable.args,
  rowHeight: 20,
  paddings: 8,
}

export const FixedHeightAndWidth = Template.bind({})
FixedHeightAndWidth.args = {
  ...NonSortable.args,
  height: 200,
  width: 250,
}

export const StickyHeader = Template.bind({})
StickyHeader.args = {
  ...NonSortable.args,
  data: sampleData.concat([
    {
      id: 5,
      title: 'Test 5',
      author: 'Author 3',
      price: 10.99,
      publisher: 'Publisher 3',
    },
    {
      id: 6,
      title: 'Test 6',
      author: 'Author 3',
      price: 10.99,
      publisher: 'Publisher 3',
    },
    {
      id: 7,
      title: 'Test 7',
      author: 'Author 3',
      price: 10.99,
      publisher: 'Publisher 3',
    },
  ]),
  stickyHeader: true,
  height: 250,
}

export const VerticalHeader = Template.bind({})
VerticalHeader.args = {
  ...Sortable.args,
  verticalHeader: true,
}

export const StickyVerticalHeader = Template.bind({})
StickyVerticalHeader.args = {
  ...VerticalHeader.args,
  width: 300,
  stickyHeader: true,
}

export const CustomCells = Template.bind({})
CustomCells.args = {
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
      key: 'publisher',
      title: 'Publisher',
    },
    {
      key: 'action',
      title: 'Action',
      renderCell: (data: TableData<TestDataType>) => {
        return <button>Action {data.title}</button>
      },
    },
  ],
}

export const SortableWithHandler = Template.bind({})
SortableWithHandler.args = {
  ...NonSortable.args,
  fields: [
    {
      key: 'title',
      title: 'Title',
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
      key: 'publisher',
      title: 'Publisher',
      sortable: true,
    },
  ],
  onSortRequest: (sortKey) => {
    console.log(sortKey)
  },
}

const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Stock ${i + 1}`,
  code: `STOCK${i + 1}`,
  price: '999.99',
  pe: (i + 1) / 10,
  isFavorite: i === 0 ? true : false,
}))

const IntegratedTemplate: ComponentStory<typeof Table> = (args: TableProps) => {
  const MAX_PAGE_SIZE = 20
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
        <Table stickyHeader css={{ maxHeight: '387px' }} width="100%" {...args} data={tableData} />
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

export const Integrated = IntegratedTemplate.bind({})
Integrated.args = {
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
}
