import { LanguageObject } from '@/hooks/Language/types/Language.modal'
import { Navigation } from '@/hooks/Navigation/types/Navigation.modal'
import { Theme } from '@/hooks/Theme/types/Theme.modal'
import { Auth } from '@/hooks/Auth/types/Auth.modal'
import { NotificationObject } from '@/hooks/Other/types/Notification.modal'

export interface AppContext {
	Language: LanguageObject
	Theme: Theme
	Navigation: Navigation
	Auth: Auth
	Notification: NotificationObject
}
