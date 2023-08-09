import React from 'react'

import { exampleLanguageObject } from '@/hooks/Language/use-language'
import { LanguageObject } from '@/hooks/Language/types/Language.modal'

import { exampleThemeObject } from '@/hooks/Theme/use-theme'
import { Theme } from '@/hooks/Theme/types/Theme.modal'

import { exampleNavigationObject } from '@/hooks/Navigation/use-navigation'
import { Navigation } from '@/hooks/Navigation/types/Navigation.modal'

import { exampleAuthObject } from '@/hooks/Auth/use-auth'
import { Auth } from '@/hooks/Auth/types/Auth.modal'

import { exampleNotificationObject } from '@/hooks/Other/use-notification'
import { NotificationObject } from '@/hooks/Other/types/Notification.modal'

import { AppContext as Context } from './appContext.modal'

const Language: LanguageObject = exampleLanguageObject
const Theme: Theme = exampleThemeObject
const Navigation: Navigation = exampleNavigationObject
const Auth: Auth = exampleAuthObject
const Notification: NotificationObject = exampleNotificationObject

export const AppContext = React.createContext<Context>({ Language, Theme, Navigation, Auth, Notification })
