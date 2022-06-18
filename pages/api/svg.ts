import { NextApiRequest, NextApiResponse } from 'next'

import QueryType from '../../common/types/queryType'
import renderCard from '../../common/renderCard'
import NextCors from 'nextjs-cors'

const svgEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as QueryType

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  try {
    const svg = await renderCard(query)

    if (process.env.NODE_ENV === 'production') {
      res.setHeader(
        'Cache-Control',
        `max-age=${'cache' in req.query ? req.query.cache : 3600}, public`
      )
    }
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(svg)
  } catch (ex) {
    console.error(ex)
    res.status(404).send('Not found')
  }
}

export default svgEndpoint
