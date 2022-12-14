import { ReactNode } from 'react'
import cx from 'classnames'

import { styled } from 'styles'
import { Card } from 'components'
import { withBackdrop, BackdropProps } from 'HOC/Backdrops'

const DrawerCard = styled(Card, {
  backgroundColor: '#fff',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  borderRadius: 0,
  zIndex: 10000,
  transitionProperty: 'left, visibility',
  transitionDuration: '.3s',
  transitionTimingFunction: 'linear',

  '&.hidden': {
    visibility: 'hidden',
    transitionTimingFunction: 'ease-out',
  },
  variants: {
    persist: {
      true: {
        zIndex: 999,
      },
    },
  },
})

export interface DrawerProps extends BackdropProps {
  /**
   * Persists the drawer when true.
   */
  persist?: boolean

  /**
   * The content to be displayed in a drawer.
   */
  children?: ReactNode

  /**
   * Specifies the width.
   */
  width?: number | string
}

/** displays a drawer component. */
export function PureDrawer({
  children,
  show = false,
  persist = false,
  width = '240px',
}: DrawerProps) {
  const drawerCardClasses = cx({
    hidden: !show,
  })

  return (
    <DrawerCard
      role="navigation"
      className={drawerCardClasses}
      css={{ width, '&.hidden': { left: typeof width === 'string' ? `-${width}` : -width } }}
      border={false}
      padding="none"
      {...(persist && { persist, shadow: true })}
    >
      {children}
    </DrawerCard>
  )
}

const WrappedDrawer = withBackdrop(PureDrawer, { fixContent: true })

/** handles drawer component types. */
export default function Drawer(props: DrawerProps) {
  if (props.persist) return <PureDrawer {...props} />

  return <WrappedDrawer {...props} />
}
