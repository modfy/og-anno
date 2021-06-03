import { Font, Pattern, Theme } from './configType'

type QueryType = {
  font: Font
  theme: Theme
  pattern: Pattern

  language: string
  description: string
  descriptionEditable: string
  logo: string

  title: string
}

export default QueryType
