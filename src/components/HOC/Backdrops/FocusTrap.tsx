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
      let eventListener: {
        (event: KeyboardEvent): void
      }
      ref.current.focus()

      const elements = ref.current.querySelectorAll(
        FOCUSABLE_ELEMENTS.join(',')
      ) as NodeListOf<HTMLElement>

      if (elements.length > 0) {
        const first = elements[0]
        const last = elements[elements.length - 1]
        eventListener = (event: KeyboardEvent) => {
          if (event.key != TAB_KEY) return

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
          if (event.key != TAB_KEY) return

          if (document.activeElement !== ref.current) {
            ref?.current?.focus()
          }
          event.preventDefault()
        }
        ref.current.addEventListener('keydown', eventListener)
      }

      return () => {
        ref?.current && ref.current.removeEventListener('keydown', eventListener)
      }
    }
  }, [children, active])

  return (
    <div ref={ref} tabIndex={0}>
      {children}
    </div>
  )
}
