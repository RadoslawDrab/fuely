import { useState } from 'react'

import { ReturnObject } from './types/Toggle.modal'

const useToggle = (defaultState: boolean = false): ReturnObject => {
	const [state, setState] = useState<boolean>(defaultState)

	function toggle() {
		setState((t) => !t)
	}
	function set(value: boolean) {
		setState(value)
	}
	return [state, set, toggle]
}

export default useToggle
