import React from 'react'
import { render } from '@testing-library/react'

import LoadingIcon from '@/components/UI/LoadingIcon'

describe('LoadingIcon', () => {
	test('renders', () => {
		const component = render(<LoadingIcon />)

		const icon = component.queryByRole('status')

		expect(icon).not.toBeNull()
		expect(icon?.className).toContain('loading')
		expect(icon?.firstElementChild?.className).toContain('car')
	})
})
