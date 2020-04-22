import React from 'react'
import { render } from '@testing-library/react'
import Fire from './index'

test('renders Fire', () => {
  const { getByText } = render(<Fire />)
  const linkElement = getByText(/Denys/i)
  expect(linkElement).toBeInTheDocument()
})
