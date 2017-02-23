// this file provides a list of unbundled files that
// need to be included when exporting the application
// for production.
module.exports = {
  'list': [
    'index.html',
    'config.js',
    'styles/**/*.css',
    'src/editor/config/*.js',
    'jspm_packages/github/systemjs/plugin-json@0.1.25',
    'jspm_packages/system.js',
    'jspm_packages/system.js.map',
    'jspm_packages/system-polyfills.js',
    'jspm_packages/system-csp-production.js',
    'jspm_packages/npm/core-js@2.0.3/**',
    'dist/app-build-*.js',
    'dist/aurelia-*.js'
  ],
  // this section lists any jspm packages that have
  // unbundled resources that need to be exported.
  // these files are in versioned folders and thus
  // must be 'normalized' by jspm to get the proper
  // path.
  'normalize': [
    [
      'bootstrap', [
        '/css/bootstrap.min.css',
        '/fonts/*'
      ]
    ],
    [
      'bluebird', [
        '/js/browser/bluebird.min.js'
      ]
    ]
  ]
};
