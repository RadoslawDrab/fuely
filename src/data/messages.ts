import { Messages } from '@/utils/messages'
import { getText } from '@/hooks/Language/use-language'

const messages: Messages = {
	'not-enough-data': {
		type: 'error',
		text: getText('Not enough data provided')
	},
	'not-logged-in': {
		type: 'error',
		text: getText('User is not logged in')
	},
	'user-not-found': {
		type: 'error',
		text: getText('Incorrect login')
	},
	'invalid-email': {
		type: 'error',
		text: getText('Email is not valid')
	},
	'email-already-in-use': {
		type: 'error',
		text: getText('Email is already in use')
	},
	'same-email': {
		type: 'error',
		text: getText('Old and new emails have to be different')
	},
	'wrong-password': {
		type: 'error',
		text: getText('Incorrect password')
	},
	'invalid-password': {
		type: 'error',
		text: getText('Password must contain: minimum 8 characters, uppercase letter, lowercase letter, number and special character')
	},
	'same-passwords': {
		type: 'error',
		text: getText('Old and new passwords have to be different')
	},
	'email-not-verified': {
		type: 'error',
		text: getText('Email is not verified')
	},
	'requires-recent-login': {
		type: 'error',
		text: getText('Change requires recent login')
	},
	'invalid-name': {
		type: 'error',
		text: getText('Username must contain at least 3 characters')
	},
	'invalid-amount': { type: 'error', text: getText('Invalid amount') },
	'event-added': {
		type: 'success',
		text: getText('Event successfully added')
	},
	'event-removed': {
		type: 'success',
		text: getText('Event successfully removed')
	},
	'user-created': {
		type: 'success',
		text: getText('User successfully created')
	},
	'user-updated': {
		type: 'success',
		text: getText('User successfully updated')
	},
	'user-authenticated': {
		type: 'success',
		text: getText('User successfully authenticated')
	},
	'password-reset-sent': {
		type: 'success',
		text: getText('Password reset email successfully sent')
	},
	'verify-email': {
		type: 'error',
		text: getText('Verify to log in')
	}
}

export default messages
