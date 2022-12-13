import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'

import { Drawer, PureDrawer, Button, AppBar, IconButton } from 'components'
import { textData } from '../Modal/Modal.stories'

const drawerWidth = 240

export default {
  component: PureDrawer,
  parameters: {
    layout: 'fullscreen',
  },
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
          style={{
            ...style,
            padding: '16px',
          }}
          {...(show && args.persist && { style: { ...style, marginLeft: drawerWidth } })}
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
  render: (args) => {
    const [show, setShow] = useState(args.show)
    useEffect(() => {
      setShow(args.show)
    }, [args.show])

    const style = { transition: 'margin .3s ease-in-out', padding: '16px' }

    return (
      <>
        <Drawer {...args} show={show} onClose={() => setShow(false)}>
          <div style={{ margin: 16, textAlign: 'center' }}>
            <Button onClick={() => setShow(false)} rounded outlined>
              Close Drawer
            </Button>
          </div>
        </Drawer>
        <AppBar
          css={{
            transition: style.transition,
            ...(show && args.persist && { marginLeft: drawerWidth }),
          }}
          sticky
        >
          {!show && <IconButton icon="menu" onClick={() => setShow(true)} />}
          <div style={{ fontSize: '26px', marginLeft: '16px' }}>TEST</div>
        </AppBar>
        <div
          style={style}
          {...(show && args.persist && { style: { ...style, marginLeft: drawerWidth } })}
        >
          <p>{textData}</p>
        </div>
      </>
    )
  },
}
