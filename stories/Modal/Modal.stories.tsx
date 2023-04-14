import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { PureModal } from '../../src/components/Modals/Modal'
import { Button, Modal, Textbox } from 'components'

export const textData = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam leo nunc, ultricies a
  lobortis non, volutpat vel libero. Aliquam erat volutpat. Pellentesque habitant morbi
  tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ultricies justo
  eget ligula aliquam rhoncus. Donec arcu ex, dictum quis sapien sed, pulvinar malesuada
  nibh. Pellentesque lacinia, nulla non tristique congue, tortor velit porttitor ipsum, et
  accumsan diam leo non neque. Integer consequat feugiat ante non posuere. Curabitur eu
  nunc mollis nisi pharetra venenatis. Cras odio ex, pellentesque nec ornare vitae, congue
  in turpis. Pellentesque ligula quam, convallis quis diam a, blandit suscipit nunc.
  Quisque sed enim lacinia turpis eleifend ultrices. Sed bibendum viverra ipsum, eget
  commodo mi mattis at. Fusce eget blandit lectus, tristique volutpat nibh. Aliquam rutrum
  feugiat ex et ullamcorper. Duis hendrerit, diam ut ultrices tempus, dui massa convallis
  odio, eget lobortis urna dolor in elit. Sed lacinia quam eros, non fermentum nibh
  pellentesque eu. Nulla placerat at dolor eget ullamcorper. Proin vitae augue lorem. In
  vehicula congue porttitor. Vestibulum at dictum nunc. Pellentesque a porttitor diam.
  Maecenas sit amet ligula et mi ornare ultricies non eget eros. Aenean lacus velit,
  accumsan ut feugiat et, venenatis in mauris. Ut felis ex, semper in tempor non, tempor
  ac ipsum. Donec ullamcorper ultricies nisl, ac accumsan dui lacinia et. Morbi imperdiet
  bibendum libero et placerat. Phasellus fermentum porttitor faucibus. Sed sed dapibus
  lectus. Proin in felis tincidunt justo interdum maximus. Sed eget congue purus, eu
  consequat risus. Mauris varius imperdiet augue nec accumsan. Vivamus gravida nulla
  nulla, ac finibus dolor porta sit amet. Donec quis metus eget libero tempus convallis.
  Nullam scelerisque mi in interdum mollis. Sed rutrum ex id odio consequat, a viverra
  ipsum pulvinar. Morbi at nisl in elit vehicula tempor. Vestibulum sit amet mollis diam.
  Ut posuere erat id neque pharetra sollicitudin. Vivamus mi nulla, placerat quis dui ac,
  placerat faucibus orci. Phasellus mattis cursus magna ac fermentum. Phasellus diam
  ipsum, accumsan et rutrum in, facilisis quis diam. Nulla sit amet semper erat, ut
  rhoncus lacus. Pellentesque fermentum ex vitae pretium cursus. Suspendisse iaculis est
  enim, ut lacinia mi auctor quis. Maecenas varius nisi nec purus euismod porttitor.
  Integer imperdiet rutrum odio. Vivamus nec ligula suscipit, vulputate erat vitae, semper
  sapien. Nam gravida eros non ullamcorper sagittis. Curabitur dapibus placerat augue eu
  dictum. Ut nec mauris arcu. Ut consequat ac elit vel auctor. Suspendisse sodales velit
  dui, a ullamcorper urna.`

const meta: Meta<typeof Modal> = {
  component: PureModal,
  excludeStories: ['textData'],
  render: (args) => {
    const [show, setShow] = useState(args.show)
    useEffect(() => {
      setShow(args.show)
    }, [args.show])

    return (
      <>
        <Modal {...args} show={show} onClose={() => setShow(false)} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}
        >
          <Button
            css={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)' }}
            onClick={() => setShow(true)}
            rounded
          >
            Open Modal
          </Button>
          <p style={{ width: '375px', padding: '0 16px', boxSizing: 'border-box' }}>{textData}</p>
        </div>
      </>
    )
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Normal: Story = {
  args: {
    width: 'calc(100% - 32px)',
    show: false,
    ariaLabelledBy: 'title',
    children: (
      <>
        <h1 id="title">TEST</h1>
        <Textbox label="TEST" />
        <br />
        <Button>TEST</Button>
      </>
    ),
  },
}

export const WithNoFocusableElement: Story = {
  args: {
    width: 'calc(100% - 32px)',
    show: false,
    ariaLabelledBy: 'title',
    children: (
      <>
        <h1 id="title">TEST</h1>
      </>
    ),
  },
}

export const WithScrollableContent: Story = {
  args: {
    ...Normal.args,
    ariaDescribedBy: 'description',
    children: (
      <>
        <h1 id="title">TEST</h1>
        <p tabIndex={0} id="description" style={{ width: '100%', overflowY: 'auto' }}>
          {textData}
        </p>
      </>
    ),
  },
}
