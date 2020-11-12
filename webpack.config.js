const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/algebr4.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules|dist|src\/test/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'algebr4.bundle.js',
    library: 'algebr4'
  }
}