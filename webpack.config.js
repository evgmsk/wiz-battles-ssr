const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('mini-css-extract-plugin');
const CWP = require('compression-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const paths = require('./config/paths');
const env = process.env.NODE_ENV;
const prodSSR = env === 'prodSSR';
const prodCR = env === 'prodCR';
const SSR = process.env.BABEL_ENV === 'ssr';

const optimization = (prodSSR || prodCR) ? {
    minimize: true,
    splitChunks: {
        minSize: 50000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                chunks: 'async',
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
            },
            common: {
                chunks: 'async',
                minChunks: 2,
                priority: 20,
                reuseExistingChunk: true
            },
        }
    }
} : {};


// common plugins
const plugins = [new webpack.DefinePlugin({
    'process.env.SSR': JSON.stringify(SSR)
})];

if (env === 'devCR' || prodCR) { // client render
    plugins.push(
        new HtmlWebpackPlugin({
            template: paths.template,
            favicon: paths.favicon,
            chunks: ['start']
        }));
}
if (SSR) {
    plugins.push(
        new LoadablePlugin()
    )
}
if(prodSSR || prodCR) { // production
    plugins.push(new ExtractTextWebpackPlugin({
        filename: 'css/[name].css',
    }));
    plugins.push(
        new CWP({})
    );
} else { // development
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

const lint = env !== 'lint' ? {} : {
    test: /\.jsx?$/,
    enforce: 'pre',
    use: [
        {
            options: {
                baseConfig: '.eslintrc.js',
            },
            loader: "eslint-loader",
        },
    ],
    include: paths.srcPath,
    exclude: paths.nodePath,
};

// postcss
const postcssRules = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        ident: 'postcss',
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                ],
                flexbox: 'no-2009',
            }),
        ],
    },
};
const scssProd = {
    test: /\.scss$/,
    use: [
         ExtractTextWebpackPlugin.loader,
        "css-loader",
        postcssRules,
        'sass-loader',
    ]
};

const scssDev = {
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        postcssRules,
        'sass-loader',
    ],
};

const scssRules = (prodSSR || prodCR) ? scssProd : scssDev;

// css,
const cssDev = {
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader',
        postcssRules,
    ],
};

const cssProd = {
    test: /\.css$/,
    use: [
         ExtractTextWebpackPlugin.loader,
        'css-loader',
        postcssRules
    ],
};

const cssRules = (prodSSR || prodCR) ? cssProd : cssDev;

// entry
let entry;

if (prodSSR) {
    entry = {start: paths.startJsPath, game: paths.gameJsPath }
}
if (env === 'devSSR') {
    entry = {
        start: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', paths.startJsPath],
        game: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', paths.gameJsPath]
    }
}
if (prodCR) {
    entry = {start: paths.startJsPathCr, game: paths.gameJsPath}
}

if (env === 'devCR') {
    entry = {
        start: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', paths.startJsPathCr]
    };
}

// devtool
const devtool = (prodSSR || prodCR) ? 'source-map' : 'cheap-module-eval-source-map';

// webpack config
module.exports = {
    mode: (prodSSR || prodCR) ? 'production' : 'development',
    entry,
    output: {
        path: SSR ? paths.prodPath : paths.prodPathCR,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        publicPath: paths.publicPath,
        sourceMapFilename: '[file].map',
    },
    devtool,
    devServer: {
        port: 3002,
        stats: {
            modules: false,
            chunks: false,
            children: false,
        },
        open: true,
    },
    optimization,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: paths.nodePath,
                query: {compact: false},
            },
            scssRules,
            cssRules,
            {
                test: /\.mp3$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'assets/sounds/[name].[ext]',
                },
            },
            {
                test: /\.(?:png|svg|jpg|ico)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'assets/images/[name].[ext]',
                },
            },
            {
                test: /\.(?:woff|woff2|ttf|oem)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'assets/fonts/[name].[ext]',
                }
            },
        ],
    },
    plugins,
};

console.log(process.env.NODE_ENV, process.env.BABEL_ENV, plugins, entry, SSR);
