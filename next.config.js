const GoogleFontsPlugin = require('google-fonts-plugin')

const fontNames = require('./common/fonts/fonts.json')

module.exports = {
  target: 'experimental-serverless-trace',

  webpack: config => {
    config.plugins.push(
      new GoogleFontsPlugin({
        fonts: Object.values(fontNames).map(f => ({
          family: f,
          variants: ['200', '400', '500']
        })),
        filename: 'google-fonts.css',
        formats: ['woff2']
      })
    )

    return config
  },

  async rewrites() {
    return [
      {
        source: '/svg',
        destination: '/api/svg'
      },
      {
        source: '/image',
        destination: '/api/svg'
      }
    ]
  }
}
