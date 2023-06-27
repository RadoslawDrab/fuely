import React from 'react'

import { exampleLanguageObject } from '@/hooks/Language/use-language'
import { LanguageObject } from '@/hooks/Language/Language.modal'

import { exampleThemeObject } from '@/hooks/Theme/use-theme'
import { Theme } from '@/hooks/Theme/Theme.modal'

import { exampleNavigationObject } from '@/hooks/Navigation/use-navigation'
import { Navigation } from '@/hooks/Navigation/Navigation.modal'

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
