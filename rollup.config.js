import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/angular-loading-bar.js',
    output: {
      format: 'umd',
      name: 'angularLoadingBar',
      file: pkg.browser,
      globals: {
        angular: 'angular',
      },
      external: ['angular', 'fetch-intercept']
    },
    plugins: [
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
        presets: [
          [
            '@babel/env',
            {
              modules: false
            }
          ]
        ],
        babelrc: false,
        plugins: ['angularjs-annotate']
      })
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: 'src/angular-loading-bar.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    external: ['angular', 'fetch-intercept'],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
        presets: [
          [
            '@babel/env',
            {
              modules: false
            }
          ]
        ],
        babelrc: false,
        plugins: ['angularjs-annotate']
      })
    ]
  }
];
