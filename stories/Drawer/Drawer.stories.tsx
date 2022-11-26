import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'

import { Drawer, PureDrawer, Button } from 'components'
import { textData } from '../Modal/Modal.stories'

export default {
  component: PureDrawer,
  render: (args) => {
    const [show, setShow] = useState(args.show)
    useEffect(() => {
      setShow(args.show)
    }, [args.show])

    const style = { transition: 'margin .3s ease-in-out' }

    return (
      <>
        <Drawer {...args} show={show} onClose={() => setShow(false)}>
          <div style={{ margin: 16, textAlign: 'center' }}>
            <Button onClick={() => setShow(false)} rounded outlined>
              Close Drawer
            </Button>
          </div>
        </Drawer>
        <div
          style={style}
          {...(show && args.persist && { style: { ...style, marginLeft: '240px' } })}
        >
          <Button onClick={() => setShow(true)} rounded>
            Open Drawer
          </Button>
          <p>{textData}</p>
        </div>
      </>
    )
  },
} as ComponentMeta<typeof PureDrawer>

export const Normal: ComponentStoryObj<typeof PureDrawer> = {
  args: {
    show: false,
  },
}

export const Persistent: ComponentStoryObj<typeof PureDrawer> = {
  args: {
    ...Normal.args,
    persist: true,
  },
}
