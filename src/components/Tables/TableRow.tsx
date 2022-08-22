import { styled } from 'styles'

export interface TableRowProps {
  children: React.ReactNode[]
  height?: number
}

const Tr = styled('tr', {})

export default function TableRow({ children, height }: TableRowProps) {
  return (
    <Tr
      css={{
        height,
      }}
    >
      {children}
    </Tr>
  )
}
