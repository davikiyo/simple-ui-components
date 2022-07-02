import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Card, Grid, GridProps } from 'components'
import * as CardStories from '../Cards/Card.stories'

export default {
  title: 'Grid',
  component: Grid,
} as ComponentMeta<typeof Grid>

const cards = [
  <Card key={1}>{CardStories.cardContent}</Card>,
  <Card key={2}>{CardStories.cardContent}</Card>,
  <Card key={3}>{CardStories.cardContent}</Card>,
  <Card key={4}>{CardStories.cardContent}</Card>,
  <Card key={5}>{CardStories.cardContent}</Card>,
  <Card key={6}>{CardStories.cardContent}</Card>,
  <Card key={7}>{CardStories.cardContent}</Card>,
  <Card key={8}>{CardStories.cardContent}</Card>,
]

const Template: ComponentStory<typeof Grid> = (args: GridProps) => <Grid {...args} />
export const Default = Template.bind({})
Default.args = {
  children: cards,
}

export const TwoColumns = Template.bind({})
TwoColumns.args = {
  children: cards,
  maxColumn: 2,
  minWidth: 300,
  gap: 20,
}
