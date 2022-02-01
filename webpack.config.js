const path = require('path');

module.exports = {
    mode: 'development',//or production
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    entry: {
        main: path.resolve(__dirname, "./src/index.ts")
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
        
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        hot: true,
        compress: true,
        allowedHosts:["sgb.st"],
    },
}