import React from 'react'

import { exampleLanguageObject } from '@/hooks/use-language'
import { LanguageObject } from '@type/hooks/use-language.modal'

import { exampleThemeObject } from '@/hooks/use-theme'
import { Theme } from '@type/hooks/use-theme.modal'

interface AppContext {
	Language: LanguageObject
	Theme: Theme
}
const Language: LanguageObject = exampleLanguageObject
const Theme: Theme = exampleThemeObject

export const AppContext = React.createContext<AppContext>({ Language, Theme })
