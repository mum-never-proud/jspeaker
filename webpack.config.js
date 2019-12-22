const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/jSpeaker.js',
  devtool: 'source-map',
  output: {
    filename: 'jSpeaker.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'jSpeaker',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  }
};
