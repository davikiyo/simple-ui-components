import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Pagination, PaginationProps } from 'components'

export default {
  title: 'Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = (args: PaginationProps) => (
  <Pagination {...args} />
)

export const FirstPage = Template.bind({})
FirstPage.args = {
  currentPage: 1,
  pages: 5,
}

export const MiddlePage = Template.bind({})
MiddlePage.args = {
  ...FirstPage.args,
  currentPage: 3,
}

export const LastPage = Template.bind({})
LastPage.args = {
  ...FirstPage.args,
  currentPage: 5,
}

export const FivePageNumbers = Template.bind({})
FivePageNumbers.args = {
  currentPage: 5,
  pages: 10,
  maxElements: 5,
}
