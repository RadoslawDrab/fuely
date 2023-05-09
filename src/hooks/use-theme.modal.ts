export interface Theme {
	toggleTheme: () => void
	setTheme: (darkTheme: boolean) => void
	isDarkTheme: boolean
}
