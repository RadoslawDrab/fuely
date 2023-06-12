import React from 'react'
import { render } from '@testing-library/react'

import Error from '@/components/UI/Error'

describe('Error', () => {
	test('renders', () => {
		const component = render(<Error show text="Test" />)
		const span = component.getByRole('status')

		expect(span.childNodes.length).toBeGreaterThan(0)
		expect(span.firstChild?.nodeValue).toBe('Test')
	})
	test('renders class name', () => {
		const component = render(<Error show text="Test" />)
		const span = component.getByRole('status')

		expect(span.className).toContain('error')
	})
})
