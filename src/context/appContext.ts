import React from 'react'

import { exampleLanguageObject } from '@/hooks/use-language'
import { LanguageObject } from '@/hooks/Language.modal'

import { exampleThemeObject } from '@/hooks/use-theme'
import { Theme } from '@/hooks/Theme.modal'

import { exampleNavigationObject } from '@/hooks/use-navigation'
import { Navigation } from '@/hooks/Navigation.modal'


interface AppContext {
	Language: LanguageObject
	Theme: Theme
	Navigation: Navigation
}
const Language: LanguageObject = exampleLanguageObject
const Theme: Theme = exampleThemeObject
const Navigation: Navigation = exampleNavigationObject

export const AppContext = React.createContext<AppContext>({ Language, Theme, Navigation })
