import React, { useState } from 'react'

const useToggle = (defaultState: boolean = false) => {
	const [toggle, setToggle] = useState<boolean>(defaultState)

	function toggleState() {
		setToggle((t) => !t)
	}
	function setState(value: boolean) {
		setToggle(value)
	}
	return { toggle, toggleState, setState }
}

export default useToggle
