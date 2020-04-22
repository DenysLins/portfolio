import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders H1', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Denys/i)
  expect(linkElement).toBeInTheDocument()
})
