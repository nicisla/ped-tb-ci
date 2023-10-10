const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // Use __dirname instead of _dirname
        filename: 'bundle.js'
    },
    watch: true
};