const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  entry: './public/sw.js',
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'bundle.js',
  },
  mode: 'production',
  plugins: [
    new InjectManifest({
      swSrc: './public/sw.js',
      swDest: 'sw.js',
    }),
  ],
};
