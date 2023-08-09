import { useRouter } from 'next/router'
import React from 'react'

import { className } from '@/utils'

import Button from '@/components/UI/Button'

import defaultStyles from '@styles/styles.module.scss'
import styles from '@styles/pages/Home/CTA.module.scss'

const CTA = React.forwardRef(function CTA(_, ref: React.ForwardedRef<any>) {
	const router = useRouter()

	function onRegister() {
		router.push('/register')
	}
	function onLogin() {
		router.push('/login')
	}
	return (
		<section ref={ref} className={styles.section}>
			<header className={className(defaultStyles.header, defaultStyles.dark)}>
				<h2>Join now!</h2>
			</header>
			<p className={className(defaultStyles.text, defaultStyles.dark)}>
				Join Fuely today and take control of your fuel expenses! Start saving money and optimizing your journeys like never
				before.
			</p>
			<p className={className(defaultStyles.text, defaultStyles.dark)}>
				Sign up now for a free account and unlock the power of Fuely!
			</p>
			<div>
				<Button onClick={onRegister} variant="accent">
					<span>Register</span>
				</Button>
				<Button onClick={onLogin}>
					<span>Log in</span>
				</Button>
			</div>
		</section>
	)
})
export default CTA
