import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Button from '../../../src/components/UI/Button'

describe('Button', () => {
	test('renders', () => {
		const component = render(<Button onClick={() => {}} />)
		const button = component.getByRole('button')

		expect(button).toBeTruthy()
	})
	test('responds after click', () => {
		const onClickMock = jest.fn()

		const component = render(<Button onClick={onClickMock} />)

		const button = component.getByRole('button')

		fireEvent.click(button)

		expect(onClickMock.mock.lastCall).not.toBeNull()
	})
	test('renders attribute correctly', () => {
		const component = render(<Button onClick={() => {}} disabled={true} selected />)
		const button = component.getByRole('button')

		expect(button.hasAttribute('disabled')).toBeTruthy()
		expect(button.className).toContain('selected')
	})
	test('renders proper dataset data', () => {
		const component = render(<Button onClick={() => {}} data={{ test: 'value' }} />)
		const button = component.getByRole('button')

		expect(button.dataset).not.toBeNull()
		expect(button.dataset['test']).not.toBeNull()
		expect(button.dataset['test']).toBe('value')
	})
	test('renders children', () => {
		const component = render(
			<Button onClick={() => {}}>
				<span>Testing</span>
			</Button>
		)
		const button = component.getByRole('button')

		expect(button.children).not.toBeNull()
		expect(button.firstChild).not.toBeNull()
		expect(button.innerHTML.match(/span/i)).toBeTruthy()
		expect(button.textContent).toBe('Testing')
	})
	test('reacts to focus and blur events', () => {
		const onFocusMock = jest.fn((event: React.FocusEvent<HTMLButtonElement>) => event)
		const onBlurMock = jest.fn((event: React.FocusEvent<HTMLButtonElement>) => event)

		const component = render(<Button onClick={() => {}} onFocus={onFocusMock} onBlur={onBlurMock} />)
		const button = component.getByRole('button')

		expect(onFocusMock).not.toHaveReturned()
		expect(onBlurMock).not.toHaveReturned()

		fireEvent.focusIn(button)

		expect(onFocusMock).toHaveReturned()
		expect(onFocusMock.mock.lastCall?.at(0)?.type).toBe('focus')
		expect(onBlurMock).not.toHaveReturned()

		fireEvent.focusOut(button)

		expect(onFocusMock.mock.calls.length).toBeLessThanOrEqual(1)
		expect(onBlurMock).toHaveReturned()
		expect(onBlurMock.mock.lastCall?.at(0)?.type).toBe('blur')
	})
})
