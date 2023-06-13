import React from 'react'
import { render } from '@testing-library/react'

import Graph from '@/components/UI/Graph'

describe('Graph', () => {
	test('renders', () => {
		const itemsArr = [
			{ name: 'Test 1', value: 75 },
			{ name: 'Test 2', value: 100 },
			{ name: 'Test 3', value: 50 }
		]
		const component = render(<Graph items={itemsArr} max={100} />)

		const graph = component.queryByRole('list')
		const items = graph?.querySelectorAll('li.bar') || []

		expect(graph).not.toBeNull()
		expect(items.length).toBe(3)

		items.forEach((item, index) => {
			const progress = item.querySelector('progress')
			const label = item.querySelector('label')

			expect(progress).not.toBeNull()
			expect(progress?.getAttribute('max')).toBe('100')
			expect(progress?.getAttribute('value')).toBe(itemsArr[index].value.toString())

			if (itemsArr[index].name) {
				expect(label).not.toBeNull()
				expect(label?.getAttribute('for')).not.toBeNull()
				expect(label?.getAttribute('for')).toBe(progress?.getAttribute('id'))
				expect(label?.textContent).toBe(itemsArr[index].name)
			}
		})
	})
})
