const path = require('path');

module.exports = {
    mode: 'development',//or production
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.jsx'],
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
                test: /\.ts/,
                use: 'ts-loader',
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