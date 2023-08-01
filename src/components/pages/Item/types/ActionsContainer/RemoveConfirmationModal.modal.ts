export interface RemoveConfirmationModalProps {
	onConfirm: () => void
	removalDate: string
	isShown: boolean
	setIsShown: (state: boolean) => void
}
