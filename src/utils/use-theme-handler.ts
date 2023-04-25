import { useEffect, useState } from 'react'
import { isClient } from '.'

function useThemeHandler() {
	const [isDarkTheme, setIsDarkTheme] = useState(false)

	useEffect(() => {
		// Checks if user prefers dark theme
		const isDark = isClient() && window.matchMedia('(prefers-color-scheme: dark)').matches
		setIsDarkTheme(() => isDark)
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
		setIsDarkTheme(() => darkTheme)
	}
	function toggleTheme() {
		setIsDarkTheme((theme) => !theme)
	}
	return { isDarkTheme, setTheme, toggleTheme }
}

export default useThemeHandler
