import { useRef } from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import Head from '@/components/Head'
import Hero from '@/components/pages/Home/Hero'
import About from '@/components/pages/Home/About'
import Features from '@/components/pages/Home/Features'
import HowItWorks from '@/components/pages/Home/HowItWorks'
import CTA from '@/components/pages/Home/CTA'
import Privacy from '@/components/pages/Home/Privacy'

export default function Home() {
	const { getText } = useAppContext().Language

	const ctaRef = useRef<HTMLElement>(null)

	function scrollTo(element: HTMLElement | null) {
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center'
			})
		}
	}
	return (
		<>
			<Head title={`Fuely | ${getText('Homepage')}`} description="Fuely home page" />
			<Hero scrollToCTA={() => scrollTo(ctaRef.current)} />
			<About />
			<Features />
			<HowItWorks />
			<CTA ref={ctaRef} />
			<Privacy />
		</>
	)
}
