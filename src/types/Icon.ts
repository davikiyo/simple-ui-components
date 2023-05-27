export const ICON_NAMES = [
  'arrow-left',
  'checkbox-checked',
  'checkbox-unchecked',
  'chevron-circle-left',
  'chevron-circle-right',
  'close',
  'error',
  'info',
  'logout',
  'menu',
  'pencil',
  'plus-circle',
  'sorting-arrow-up',
  'star-filled',
  'star-outlined',
  'success',
  'trash-can',
  'warning',
] as const

export type IconName = typeof ICON_NAMES[number]
