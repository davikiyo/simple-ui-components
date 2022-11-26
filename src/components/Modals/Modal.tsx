import { ReactNode } from 'react'

import { Card } from 'components'
import { CSS, fadeIn, slideBottomUp, styled } from 'styles'
import { withBackdrop, BackdropProps } from 'HOC/Backdrops'

const ModalCard = styled(Card, {
  display: 'inline-flex',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 999,
  backgroundColor: '#fff',
  animation: `${fadeIn} .2s, ${slideBottomUp} .5s linear`,
})

export interface ModalProps extends BackdropProps {
  /**
   * Overrides the modal style.
   */
  css?: CSS

  /**
   * Contents to be displayed in a modal.
   */
  children?: ReactNode

  /**
   * Specifies the modal height.
   */
  height?: string | number

  /**
   * Specifies the modal width.
   */
  width?: string | number

  /**
   * Specifies the modal max height.
   */
  maxHeight?: string | number

  /**
   * Specifies the modal max width.
   */
  maxWidth?: string | number

  /**
   * Specifies an ID that indicates the title.
   */
  ariaLabelledBy?: string

  /**
   * Specifies an ID that indicates the description.
   */
  ariaDescribedBy?: string
}

/**
 * displays a modal.
 */
export function PureModal({
  ariaLabelledBy,
  ariaDescribedBy,
  css,
  children,
  show = false,
  height = '100%',
  width = '100%',
  maxHeight = '70vh',
  maxWidth = '570px',
}: ModalProps) {
  return show ? (
    <ModalCard
      role="dialog"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      css={{
        '@bp3': {
          padding: '$4',
        },
        height,
        width,
        maxHeight,
        maxWidth,
        ...css,
      }}
      border={false}
      padding="md"
    >
      {children}
    </ModalCard>
  ) : null
}

export default withBackdrop(PureModal, { color: 'dark', fixContent: true })
