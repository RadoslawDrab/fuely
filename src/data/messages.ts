import { passwordInfo } from '@/utils'
import { Messages } from '@/utils/messages'

const messages: Messages = {
	'not-enough-data': {
		type: 'error',
		text: 'Not enough data provided'
	},
	'not-logged-in': {
		type: 'error',
		text: 'User is not logged in'
	},
	'user-not-found': {
		type: 'error',
		text: 'Incorrect login'
	},
	'invalid-email': {
		type: 'error',
		text: 'Email is not valid'
	},
	'wrong-password': {
		type: 'error',
		text: 'Incorrect password'
	},
	'invalid-password': {
		type: 'error',
		text: passwordInfo
	},
	'email-not-verified': {
		type: 'error',
		text: 'Email is not verified'
	},
	'invalid-amount': { type: 'error', text: 'Invalid amount' },
	'event-added': {
		type: 'success',
		text: 'Event successfully added'
	},
	'event-removed': {
		type: 'success',
		text: 'Event successfully removed'
	}
}

export default messages
