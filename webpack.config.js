
// basically this is the configuration (basic setup/options) that Webpack is going to be running under.
const config = {
  // webpack works by looking at files (called "entry points") and keeping track of ALL the libraries/packages or whatever that they require
  entry: {
    // you can have multiple entry points, the first one is out 'app.js' file in the home dir
    // NOTE: YOU MUST PUT THE RELATIVE PATH IN, 'app.js' causes woe and devastation
    main: './app.js'
  },
  // all of these files are then bundled together into a single file, which can then be easily included in your html (also probably smaller)
  output: {
    filename: '[name]_bundle.js',
    // NOTE: PATH MUST BE ABSOLOUTE for some gay reason
    path: __dirname + '/public/assets/javascripts'
  },
  // this next obeject LITERALLY here to patch up some bugs with Webpack. 
  node: {
    net: 'empty',
    fs: 'empty'
  }
};

module.exports = config;
