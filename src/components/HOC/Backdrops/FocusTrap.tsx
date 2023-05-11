import { useEffect, useRef } from 'react'

interface FocusTrapProps {
  children: JSX.Element
  active: boolean
}

const FOCUSABLE_ELEMENTS = [
  "a[href]:not([tabindex='-1'])",
  "area[href]:not([tabindex='-1'])",
  "input:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "iframe:not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
  "[contentEditable=true]:not([tabindex='-1'])",
]

const TAB_KEY = 'Tab'

export default function FocusTrap({ active, children }: FocusTrapProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref?.current && active) {
      ref.current.focus()

      const elements = ref.current.querySelectorAll(
        FOCUSABLE_ELEMENTS.join(',')
      ) as NodeListOf<HTMLElement>

      let eventListener: (event: KeyboardEvent) => void
      const isNotTabKey = (event: KeyboardEvent) => event.key !== TAB_KEY

      if (elements.length > 0) {
        const first = elements[0]
        const last = elements[elements.length - 1]
        eventListener = (event: KeyboardEvent) => {
          if (isNotTabKey(event)) return

          if (event.shiftKey) {
            if (document.activeElement === first) {
              last.focus()
              event.preventDefault()
            }
          } else {
            if (document.activeElement === last) {
              first.focus()
              event.preventDefault()
            }
          }
        }
        ref.current.addEventListener('keydown', eventListener)
      } else {
        eventListener = (event) => {
          if (isNotTabKey(event)) return

          ref?.current?.focus()
          event.preventDefault()
        }
        ref.current.addEventListener('keydown', eventListener)
      }

      return () => {
        ref?.current && ref.current.removeEventListener('keydown', eventListener)
      }
    }
  }, [active])

  return (
    <div ref={ref} tabIndex={0} style={{ outline: 'none' }} data-testid="focus-trap">
      {children}
    </div>
  )
}
