import { useState } from 'react'

import { Navigation } from '@/types/hooks/use-navigation.modal'

export default function useNavigation(): Navigation {
	const [navigationState, setNavigationState] = useState(false)

	function toggleNavigation() {
		setNavigationState((value) => !value)
	}
	function setNavigation(state: boolean) {
		setNavigationState(() => state)
	}

	return { toggleNavigation, setNavigation, navigationState }
}

export const exampleNavigationObject: Navigation = {
	toggleNavigation: () => {},
	setNavigation: () => {},
	navigationState: false
}
