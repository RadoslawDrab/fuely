import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import Input from '@/components/UI/Input'

describe('Input', () => {
	test('renders', () => {
		const component = render(<Input type="text" onChange={() => {}} placeholder="input" />)

		const input = component.getByPlaceholderText('input')

		expect(input).not.toBeNull()
		expect(input.getAttribute('type')).not.toBeNull()
		expect(input.getAttribute('type')).toBe('text')
	})
	test('reacts to change', () => {
		const onChangeMock = jest.fn()

		const component = render(<Input type="text" onChange={onChangeMock} placeholder="input" />)

		const input = component.getByPlaceholderText('input')

		expect(onChangeMock.mock.calls.length).toBeLessThanOrEqual(0)

		fireEvent.change(input, { target: { value: 'a' } })

		expect(onChangeMock.mock.calls.length).toBeGreaterThan(0)
		expect(onChangeMock.mock.lastCall[0].target.value).toBe('a')
	})
	test('renders class name', () => {
		const component = render(<Input type="text" onChange={() => {}} className="test-class" placeholder="input" />)

		const input = component.getByPlaceholderText('input')

		expect(input.classList).toContain('test-class')
	})
	test('renders proper dataset data', () => {
		const component = render(<Input type="text" onChange={() => {}} data={{ test: 'value' }} placeholder="input" />)
		const element = component.getByPlaceholderText('input')

		expect(element.dataset).not.toBeNull()
		expect(element.dataset['test']).not.toBeNull()
		expect(element.dataset['test']).toBe('value')
	})
})
