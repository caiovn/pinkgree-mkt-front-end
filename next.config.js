const path = require('path')

module.exports = {
  images: {
    domains: ['imgur.com'],
    formats: ['image/avif', 'image/webp', 'image/gif'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
