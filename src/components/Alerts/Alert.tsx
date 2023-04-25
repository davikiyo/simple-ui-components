import { ReactNode } from 'react'
import { styled } from 'styles'
import { Icon } from '../Icons'

export type ALERT_VARIANTS = 'error' | 'info' | 'success' | 'warning'

export interface AlertProps {
  /**
   * Defines the alert type.
   */
  variant: ALERT_VARIANTS

  /**
   * Contents to be displayed in the alert component.
   */
  children: ReactNode

  /**
   * Changes the default icon to be displayed.
   */
  icon?: ReactNode

  /**
   * Displays the action button.
   */
  action?: ReactNode

  /**
   * Sets the offset on top.
   */
  top?: string | number
}

const AlertContainer = styled('div', {
  position: 'sticky',
  display: 'flex',
  border: 'solid 1px',
  padding: 16,
  margin: 0,
  left: 0,
  backgroundColor: '#fff',

  variants: {
    variant: {
      error: {
        borderColor: '$error',
        color: '$error',
      },
      info: {
        borderColor: '$info',
        color: '$info',
      },
      success: {
        borderColor: '$success',
        color: '$success',
      },
      warning: {
        borderColor: '$warning',
        color: '$warning',
      },
    },
  },
})

const Background = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  variants: {
    variant: {
      error: {
        backgroundColor: '$error',
        opacity: 0.1,
      },
      info: {
        backgroundColor: '$info',
        opacity: 0.1,
      },
      success: {
        backgroundColor: '$success',
        opacity: 0.1,
      },
      warning: {
        backgroundColor: '$warning',
        opacity: 0.1,
      },
    },
  },
})

const Content = styled('div', {
  width: '100%',
  maxWidth: '1366px',
  mx: 'auto',
  display: 'flex',
  alignItems: 'center',
})

const IconContainer = styled('span', {
  marginRight: '$2',
  height: '100%',
  display: 'flex',
  alignItems: 'start',
})

const ActionContainer = styled('span', {
  marginLeft: 'auto',
  height: '100%',
  display: 'flex',
  alignItems: 'start',
})

const ChildContainer = styled('span', {
  marginRight: '$2',
})

/**
 * displays an alert component.
 */
export default function Alert({
  variant,
  children,
  icon = <Icon name={variant} />,
  action,
  top = 0,
}: AlertProps) {
  return (
    <AlertContainer role="alert" variant={variant} css={{ top }}>
      <Background variant={variant} />
      <Content>
        {icon && <IconContainer>{icon}</IconContainer>}
        <ChildContainer>{children}</ChildContainer>
        {action && <ActionContainer>{action}</ActionContainer>}
      </Content>
    </AlertContainer>
  )
}
