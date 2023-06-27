import icons from '@/data/icons'

export type Icons = (typeof icons)[number]

export interface IconProps {
	alt: string
	type: Icons
	className?: string
}
