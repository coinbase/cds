import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const root = import.meta.dirname;

export default {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(root, 'dist'),
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    static: {
      directory: path.join(root, 'public'),
    },
  },
  module: {
    rules: [
      // Supports extensionless imports with ESM in CDS packages
      {
        test: /\.(js|ts)x?$/,
        include: /@coinbase\/cds/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),
  ],
};
