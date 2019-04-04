import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/loading-bar.js',
    external: ['fetch-intercept'],
    output: {
      format: 'umd',
      name: 'angularLoadingBar',
      file: pkg.browser,
      globals: {
        angular: 'angular',
        'fetch-intercept': 'fetch-intercept'
      }
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
        babelrc: false
      })
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: 'src/loading-bar.js',
    external: ['fetch-intercept'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
        babelrc: false
      })
    ]
  }
];
