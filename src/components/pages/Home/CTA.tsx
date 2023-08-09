import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import usePages from '@/hooks/Pages/use-pages'
import { className } from '@/utils'

import Button from '@/components/UI/Button'

import styles from '@styles/pages/Home/CTA.module.scss'
import defaultStyles from '@styles/styles.module.scss'

const CTA = React.forwardRef(function CTA(_, ref: React.ForwardedRef<any>) {
	const { redirect } = usePages()
	const { getText } = useAppContext().Language

	function onRegister() {
		redirect('/register')
	}
	function onLogin() {
		redirect('/login')
	}
	return (
		<section ref={ref} className={styles.section}>
			<header className={className(defaultStyles.header, defaultStyles.dark)}>
				<h2>{getText('Join now!')}</h2>
			</header>
			<p className={className(defaultStyles.text, defaultStyles.dark)}>
				{getText(
					'Join Fuely today and take control of your fuel expenses! Start saving money and optimizing your journeys like never before.'
				)}
			</p>
			<p className={className(defaultStyles.text, defaultStyles.dark)}>
				{getText('Sign up now for a free account and unlock the power of Fuely!')}
			</p>
			<div>
				<Button onClick={onRegister} variant="accent">
					<span>{getText('Register')}</span>
				</Button>
				<Button onClick={onLogin}>
					<span>{getText('Log in')}</span>
				</Button>
			</div>
		</section>
	)
})
export default CTA
