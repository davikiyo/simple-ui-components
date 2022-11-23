import { ReactNode } from 'react'
import cx from 'classnames'

import { styled, fadeIn, slideLeftRight, slideRightLeft } from 'styles'
import { Card } from 'components'
import { withBackdrop, BackdropProps } from 'HOC/Backdrops'

const DrawerCard = styled(Card, {
  backgroundColor: '#fff',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  borderRadius: 0,
  zIndex: 999,
  animation: `${fadeIn} .3s, ${slideLeftRight} .3s linear`,

  '&.hidden': {
    transitionProperty: 'opacity visibility width',
    transitionDelay: '.3s',
    visibility: 'hidden',
    opacity: 0,
    width: '0 !important',
    animation: `${fadeIn} .3s, ${slideRightLeft} .3s linear`,
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
      css={{ width }}
      border={false}
      padding="none"
      {...(persist && { shadow: true })}
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
