// basically this is the configuration (basic setup/options) that Webpack is going to be running under.

// plugins (more on these below) need to be required in here before use (and after installation through npm)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const config = {
  // I don't know eaxctly what "module" means
  module: {

    // but "rules" lets you interprate (and hence ultimately bundle) different file types differently.
    // if you want to use a different bundling process you have to use a "loader", which in turn need to be installed through npm
    rules: [
      {

        // first we tell Webpack which file to look for
        test: /\.css$/,
        // now we tell Webpack what loaders to use on that kind of file
        use: [

          // the css loader allows Webpack to interprate css, without it webpack would try to read it as JS and fail

          // the style loader allows webpack to put the interpreted css into a JS file and have it still work as css when it gets used the html you'll be feeding the browser. This way we can put everything we require into one single JS file

          // NOTE: they MUST go in THIS order!!!!! order is super important for some gay reason
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ],
      }, {
        test: /\.sass/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },

  // webpack works by looking at files (called "entry points") and keeping track of ALL the libraries/packages or whatever that they require
  entry: {
    // you can have multiple entry points, the first one is out 'app.js' file in the home dir
    // NOTE: YOU MUST HAVE AN EXPLICIT (./) RELATIVE PATH
    javascript: './public/assets/entry.js'
  },

  // all of these files are then bundled together into a single file, which can then be easily included in your html (also probably smaller)
  output: {

    // the fact that we're using different kinds of loaders means
    filename: 'bundle.js',
    // NOTE: PATH MUST BE ABSOLOUTE for some gay reason
    path: __dirname + '/public/assets'
  },

  // this next obeject LITERALLY here to patch up some bugs with Webpack.
  node: {
    net: 'empty',
    fs: 'empty'
  },

  // a webpack plugin is just a fancy javascript object that has been configured to interact nicely with webpack. These generally tend to just automate stuff for you, like uglifying for instance.
  plugins: [
    // webpack wants to use the classically inherited versions of these objects, so we have to create new instances
    new UglifyJsPlugin()
  ]
};

// to actually get Webpack to DO STUFF it provides a CLI. Only issue is that this cli has to be run through npm, so you should create a "script" in package.json
module.exports = config;
