/* eslint-disable no-unused-vars */
enum Theme {
  light = 'Light',
  dark = 'Dark'
}

enum Language {
  None = 'none',
  C = 'c-plain',
  'C#' = 'csharp-plain',
  'C++' = 'cplusplus-plain',
  CoffeeScript = 'coffeescript-original',
  CSS = 'css3-plain',
  Go = 'go-plain',
  Groovy = 'groovy-plain',
  HTML = 'html5-plain',
  Java = 'java-plain',
  JavaScript = 'javascript-plain',
  'Jupyter Notebook' = 'python-plain',
  PHP = 'php-plain',
  Python = 'python-plain',
  Ruby = 'ruby-plain',
  Rust = 'rust-plain',
  Scala = 'scala-plain',
  Swift = 'swift-plain',
  TypeScript = 'typescript-plain',
  GitHub = 'github-original',
  DevIcon = 'devicon-plain'
}

enum Pattern {
  solid = 'Solid',
  signal = 'Signal',
  charlieBrown = 'Charlie Brown',
  formalInvitation = 'Formal Invitation',
  plus = 'Plus',
  circuitBoard = 'Circuit Board',
  overlappingHexagons = 'Overlapping Hexagons',
  brickWall = 'Brick Wall',
  floatingCogs = 'Floating Cogs',
  diagonalStripes = 'Diagonal Stripes'
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
  logo: string

  font: Font
  theme: Theme
  pattern: Pattern
  language?: Language
}

const OptionalConfigKeyStrings = {
  description: true
}

export const RequiredConfigsKeys = {
  title: true,
  logo: true,
  font: true,
  theme: true,
  pattern: true,
  language: true
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

export { Theme, Pattern, Font, Language }
