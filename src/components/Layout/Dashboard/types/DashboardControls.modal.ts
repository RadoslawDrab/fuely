export interface DashboardControlsProps {
	changeCurrentPage: (event: React.MouseEvent<HTMLButtonElement>) => void
	maxSkip: number
	pagesCount: number
	currentPage: number
}
