import React from 'react'

import { exampleLanguageObject } from '@/hooks/use-language'
import { LanguageObject } from '@/hooks/Language.modal'

import { exampleThemeObject } from '@/hooks/use-theme'
import { Theme } from '@/hooks/Theme.modal'

import { exampleNavigationObject } from '@/hooks/use-navigation'
import { Navigation } from '@/hooks/Navigation.modal'

import { exampleAuthObject } from '@/hooks/Auth/use-auth'
import { Auth } from '@/hooks/Auth/Auth.modal'

interface AppContext {
	Language: LanguageObject
	Theme: Theme
	Navigation: Navigation
	Auth: Auth
}
const Language: LanguageObject = exampleLanguageObject
const Theme: Theme = exampleThemeObject
const Navigation: Navigation = exampleNavigationObject
const Auth: Auth = exampleAuthObject

export const AppContext = React.createContext<AppContext>({ Language, Theme, Navigation, Auth })
