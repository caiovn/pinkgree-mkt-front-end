const path = require('path')

module.exports = {
  images: {
    domains: ['imgur.com'],
    formats: ['image/webp', 'image/avif'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
