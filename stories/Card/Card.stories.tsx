import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Card, CardProps } from 'components'

export default {
  component: Card,
  excludeStories: ['cardContent'],
} as ComponentMeta<typeof Card>

export const cardContent = (
  <>
    <div>
      <h2>Card Title</h2>
    </div>
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        <br />
        labore et dolore magna aliqua. Luctus venenatis lectus magna fringilla. Nisl nunc mi ipsum
        <br />
        faucibus. Dignissim enim sit amet venenatis urna cursus. Aliquet nec ullamcorper sit amet
        <br />
        risus nullam eget. Dui sapien eget mi proin sed libero enim sed. Posuere ac ut consequat
        <br />
        semper viverra nam libero justo laoreet. Lectus proin nibh nisl condimentum id venenatis a
        <br />
        condimentum. Scelerisque in dictum non consectetur a erat nam at lectus. Nec nam aliquam sem
      </p>
    </div>
    <div>
      <h2>Card Footer</h2>
    </div>
  </>
)

const Template: ComponentStory<typeof Card> = (args: CardProps) => <Card {...args} />
export const NoShadow = Template.bind({})
NoShadow.args = {
  children: cardContent,
  shadow: false,
}

export const WithShadow = Template.bind({})
WithShadow.args = {
  children: cardContent,
  shadow: true,
}

export const NoBorder = Template.bind({})
NoBorder.args = {
  children: cardContent,
  border: false,
  shadow: true,
}
