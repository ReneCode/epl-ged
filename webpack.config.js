var webpack = require('webpack');
var glob = require('glob');
var fs = require('fs');

// do not pack the testing files sample.test.js
var entries = glob.sync('./src/**/*.js').filter( function(file) {
    return !file.match(/\.test\./);
});

module.exports = {
    entry: {
        main: entries
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