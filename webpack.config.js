require('dotenv').config()
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        crossy: ['./src/embed.tsx'],
    },
    optimization: {
        minimizer: [new TerserPlugin({ extractComments: false }), new CssMinimizerPlugin()],
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'prefix-css-loader',
                        options: {
                            selector: `#${process.env.CROSSY_ROOT}`,
                        }
                    },
                    'postcss-loader'
                ],
            },
        ],
    },
    plugins: [
        new EnvironmentPlugin(['CROSSY_ORIGIN', 'CROSSY_ROOT']),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'demo/', to: '' },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist/'),
            watch: true,
        },
        open: '/demo.html',
        port: 8080,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '...'],
        alias: {
            'react': 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
            'react/jsx-runtime': 'preact/jsx-runtime',
        },
    },
    experiments: {
        topLevelAwait: true,
    },
};
