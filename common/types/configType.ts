/* eslint-disable no-unused-vars */
enum Type {
  audio = 'Audio',
  video = 'Video'
}

enum Font {
  inter = 'Inter',
  bitter = 'Bitter',
  raleway = 'Raleway',
  rokkitt = 'Rokkitt',
  sourceCodePro = 'Source Code Pro',
  koho = 'KoHo'
}

export type RequiredConfigs = {
  title: string
  bgImage: string

  font: Font
  type: Type
}

const OptionalConfigKeyStrings = {
  description: true
}

export const RequiredConfigsKeys = {
  title: true,
  bgImage: true,
  font: true,
  type: true
}

export const OptionalConfigsKeys = {
  ...OptionalConfigKeyStrings
}

type OptionalConfigStringElement = {
  [name in keyof typeof OptionalConfigKeyStrings]?: {
    state: boolean
    value: string
    editable?: boolean
  }
}

export type OptionalConfigs = OptionalConfigStringElement

type Configuration = RequiredConfigs & OptionalConfigs

export default Configuration

export { Type, Font }
