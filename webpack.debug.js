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
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'bundle'),
    filename: 'algebr4.debug.js',
    library: 'algebr4'
  }
}