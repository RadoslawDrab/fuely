import { useEffect, useState } from 'react'

import { getLocalStorage, setLocalStorage, isClient } from '../../utils'

import { Theme } from './types/Theme.modal'

function useTheme(): Theme {
	const [isDarkTheme, setIsDarkTheme] = useState(false)

	useEffect(() => {
		if (isClient()) {
			// Checks if theme is saved to localStorage and sets app theme based on that. If not checks whether user prefers dark theme
			const isDark = getLocalStorage()?.theme === 'dark' ?? window.matchMedia('(prefers-color-scheme: dark)').matches
			setIsDarkTheme(() => isDark)
		}
	}, [])

	useEffect(() => {
		// Gets html element
		const htmlElement = document.querySelector('html')
		if (htmlElement) {
			// Checks whether current theme is dark and changes html classes based on it
			if (isDarkTheme) {
				htmlElement.classList.add('dark-theme')
				htmlElement.classList.remove('light-theme')
			} else {
				htmlElement.classList.add('light-theme')
				htmlElement.classList.remove('dark-theme')
			}
		}
	}, [isDarkTheme])

	function setTheme(darkTheme: boolean) {
		setLocalStorage({ theme: darkTheme ? 'dark' : 'light' })
		setIsDarkTheme(() => darkTheme)
	}
	function toggleTheme() {
		setLocalStorage({ theme: !isDarkTheme ? 'dark' : 'light' })
		setIsDarkTheme((theme) => !theme)
	}
	return { isDarkTheme, setTheme, toggleTheme }
}

export default useTheme

export const exampleThemeObject: Theme = {
	isDarkTheme: true,
	setTheme: () => {},
	toggleTheme: () => {}
}
