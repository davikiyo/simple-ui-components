import { render, screen } from '@testing-library/react'

import Grid from './Grid'

describe('Grid component', () => {
  it('should render child elements', () => {
    const texts = ['TEST1', 'TEST2']

    render(
      <Grid>
        {texts.map((value) => {
          return <p key={value}>{value}</p>
        })}
      </Grid>
    )

    expect(screen.getByText('TEST1')).toBeInTheDocument()
    expect(screen.getByText('TEST2')).toBeInTheDocument()
  })
})
