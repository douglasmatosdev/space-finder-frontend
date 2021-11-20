import React from 'react'
import { render } from '@testing-library/react'
import { Home } from '../../src/components/Home'

describe('Home test suite', () => {
    test('Renders component correctly', () => {

        const { getByText } = render(<Home />)
        const helloText = getByText(/Welcome to the home page!/i)
        expect(helloText).toBeInTheDocument()
    })
})