export interface OverviewProps {
	className?: string
}
export interface OverviewItem {
	label: string
	currentValue: number
	previousValue: number
	unit: string | JSX.Element
	digits?: number
}
