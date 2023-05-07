export interface Navigation {
	toggleNavigation: () => void
	setNavigation: (state: boolean) => void
	navigationState: boolean
}
