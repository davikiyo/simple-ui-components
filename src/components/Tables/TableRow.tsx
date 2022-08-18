import styled from 'styled-components'

export interface TableRowProps {
  children: React.ReactNode[]
  height?: number
}

const Tr = styled.tr<{ rowHeight?: number }>`
  ${(props) => props.rowHeight && { height: `${props.rowHeight}px` }};
`

export default function TableRow({ children, height }: TableRowProps) {
  return <Tr rowHeight={height}>{children}</Tr>
}
