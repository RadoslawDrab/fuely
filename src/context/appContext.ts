import React from 'react'

import { exampleLanguageObject } from '@/hooks/use-language'
import { LanguageObject } from '@type/hooks/use-language.modal'

import { exampleThemeObject } from '@/hooks/use-theme'
import { Theme } from '@type/hooks/use-theme.modal'

import { Navigation } from '@/types/hooks/use-navigation.modal'
import { exampleNavigationObject } from '@/hooks/use-navigation'

interface AppContext {
	Language: LanguageObject
	Theme: Theme
	Navigation: Navigation
}
const Language: LanguageObject = exampleLanguageObject
const Theme: Theme = exampleThemeObject
const Navigation: Navigation = exampleNavigationObject

export const AppContext = React.createContext<AppContext>({ Language, Theme, Navigation })
