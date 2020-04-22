import React from 'react'
import { render } from '@testing-library/react'
import App from './index'

test('renders H1', () => {
  const { getAllByText } = render(<App />)
  const linkElement = getAllByText(/Denys/i)
  expect(linkElement).toHaveLength(2)
})
