import messages from '@/data/messages'

export function getMessage(message: string): Message | EmptyMessage {
	return (
		messages[message.replace(/[a-z]*\//g, '')] || {
			type: 'error',
			text: 'Something went wrong'
		}
	)
}

interface EmptyMessage {
	readonly type: 'error'
	readonly text: 'Something went wrong'
}
interface Message {
	readonly type: 'error' | 'success'
	readonly text: string
}
export interface Messages {
	readonly [message: string]: Message
}
