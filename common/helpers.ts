import { Pattern, Theme } from './types/configType'
import {
  signal,
  charlieBrown,
  formalInvitation,
  plus,
  circuitBoard,
  overlappingHexagons,
  brickWall,
  floatingCogs,
  diagonalStripes
} from 'hero-patterns'

const getDevIconClassName = (language: string, theme: Theme): string => {
  return `${language ? `devicon-${language}` : 'devicon-plain'} ${
    theme === Theme.light ? 'colored' : ''
  }`
}

const getHeroPattern = (pattern: Pattern, theme: Theme): string => {
  if (pattern === Pattern.solid) {
    console.log('Return solid')
    return theme === Theme.dark ? 'black' : 'white'
  }

  const PATTERN_FUNCTIONS_MAPPING: { [key: string]: any } = {
    [Pattern.signal]: signal,
    [Pattern.charlieBrown]: charlieBrown,
    [Pattern.formalInvitation]: formalInvitation,
    [Pattern.plus]: plus,
    [Pattern.circuitBoard]: circuitBoard,
    [Pattern.overlappingHexagons]: overlappingHexagons,
    [Pattern.brickWall]: brickWall,
    [Pattern.floatingCogs]: floatingCogs,
    [Pattern.diagonalStripes]: diagonalStripes
  }
  const patternFunction = PATTERN_FUNCTIONS_MAPPING[pattern]

  if (!patternFunction) return theme === Theme.dark ? '#000' : '#fff'

  const darkThemeArgs = ['#eaeaea', 0.2]
  const lightThemeArgs = ['#eaeaea', 0.6]
  return patternFunction.apply(
    null,
    theme === Theme.dark ? darkThemeArgs : lightThemeArgs
  )
}

let webpSupport: boolean | undefined
const checkWebpSupport = (): boolean => {
  if (webpSupport !== undefined) {
    return webpSupport
  }

  webpSupport = (() => {
    try {
      const canvas = document.createElement('canvas')
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch (e) {
      return false
    }
  })()

  return webpSupport
}

const HOST_PREFIX = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.PROJECT_URL || ''

export { getDevIconClassName, getHeroPattern, checkWebpSupport, HOST_PREFIX }
