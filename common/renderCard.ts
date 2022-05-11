import { readFileSync } from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { flushToHTML } from 'styled-jsx/server'

import Card from '../src/components/preview/card'

import { Font } from './types/configType'
import QueryType from './types/queryType'

import { mergeConfig } from './configHelper'

const cwd = process.cwd()

const devIconCSS = readFileSync(`${cwd}/common/fonts/devicon.css`).toString(
  'utf-8'
)

const getGoogleFontCSS = (font: Font): string => {
  const googleFontsCSS = readFileSync(`${cwd}/.next/google-fonts.css`).toString(
    'utf-8'
  )

  return googleFontsCSS
    .replace(/([{;])\n*\s*/g, '$1')
    .split('\n')
    .filter(f => f.startsWith(`@font-face {font-family: '${font}'`))
    .join('\n')
}

const getBase64Image = async (imgUrl: string) => {
  const imagePromise = new Promise<string>(resolve => {
    fetch(imgUrl)
      .then(async response => {
        const arrayBuffer = await response.arrayBuffer()
        const base64Url =
          'data:' +
          ((response.headers.get('content-type') || 'image/png') +
            ';base64,' +
            Buffer.from(arrayBuffer).toString('base64'))
        resolve(base64Url)
      })
      .catch(() => {
        resolve('')
      })
  })
  const timeoutPromise = new Promise<string>(resolve => {
    setTimeout(() => {
      resolve('')
    }, 1500)
  })
  return Promise.race([timeoutPromise, imagePromise])
}

const renderCard = async (query: QueryType) => {
  if (query.bgImage) {
    if (query.bgImage.toLowerCase().startsWith('http')) {
      const imagePromise = getBase64Image(query.bgImage)
      const imageUrl = await imagePromise
      Object.assign(query, { logo: imageUrl })
    }
  }

  const config = mergeConfig(query)

  console.log(config)

  if (!config) throw Error('Configuration failed to generate')

  const cardComponent = React.createElement(Card, config)
  const cardHTMLMarkup = ReactDOMServer.renderToStaticMarkup(cardComponent)
  const styleTags = flushToHTML()

  if (cardHTMLMarkup.includes('</foreignObject>')) {
    return cardHTMLMarkup.replace(
      '</foreignObject>',
      `${styleTags}</foreignObject>
    <defs><style type="text/css">
      ${devIconCSS}
      ${getGoogleFontCSS(config.font)}
    </style></defs>`
    )
  } else {
    return cardHTMLMarkup.replace(
      '</svg>',
      `
    <defs><style type="text/css">
      ${devIconCSS}
      ${getGoogleFontCSS(config.font)}
    </style></defs></svg>`
    )
  }
}

export default renderCard
