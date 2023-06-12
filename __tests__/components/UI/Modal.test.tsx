import React from 'react'
import { render } from '@testing-library/react'

import Modal from '@/components/UI/Modal'

describe('Modal', () => {
	test('renders', () => {
		const component = render(<Modal show title="Test" />)

		const modal = component.queryByRole('dialog')
		const modalBar = modal?.querySelector('.modal-bar')
		const modalContent = modal?.querySelector('.modal-content')

		expect(modal).not.toBeNull()
		expect(modal?.className).toContain('modal')

		expect(modalBar?.className).toContain('modal-bar')

		const spanTitle = modalBar?.firstElementChild
		expect(spanTitle?.nodeName).toBe('SPAN')
		expect(spanTitle?.textContent).toBe('Test')

		expect(modalContent?.className).toContain('modal-content')
		expect(modalContent?.children.length).toBe(0)
	})
	test('renders children', () => {
		const component = render(
			<Modal show title="Test">
				<span>TestSpan</span>
			</Modal>
		)

		const modal = component.queryByRole('dialog')
		const modalContent = modal?.querySelector('.modal-content')

		expect(modalContent?.children.length).toBe(1)
		expect(modalContent?.children.item(0)?.nodeName).toBe('SPAN')
		expect(modalContent?.children.item(0)?.textContent).toBe('TestSpan')
	})
	test("doesn't show when `show` prop is false", () => {
		const component = render(<Modal show={false} title="Test" />)

		const modal = component.queryByRole('dialog')

		expect(modal?.getAttribute('open')).toBeFalsy()
	})
	test('has functional props', () => {
		const component = render(<Modal show title="Test" allowClosing type="center" />)

		const modal = component.queryByRole('dialog')
		const modalBar = modal?.querySelector('.modal-bar')

		expect(modal?.className).toContain('center')
		expect(modalBar?.children.length).toBe(2)
		expect(modalBar?.querySelector('.close-button')).not.toBeNull()
	})
})
