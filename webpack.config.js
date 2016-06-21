var webpack = require('webpack');
var glob = require('glob');

module.exports = {
    entry: {
        main: glob.sync('./src/**/*.js')
    },

    output: {
        filename: './public/[name].js'
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],

    module: {
        loaders: [
            {
                test:    /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
            },

            { 
                test: /jquery\.min\.js$/,
                loader: 'imports?jQuery=jquery,$=jquery,this=>window'
            }
        ]
    }


} 