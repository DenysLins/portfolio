import React from 'react'
import { render } from '@testing-library/react'
import FireList from './index'

test('renders Fire', () => {
  const { getByText } = render(<FireList />)
  const linkElement = getByText(/Denys/i)
  expect(linkElement).toBeInTheDocument()
})
