import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({
  extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx'],
}),
  commonjs(),
  //typescript(),
  typescript({
  noEmit: false,
  sourceMap: false,
  inlineSources: false
}),
  //terser() // Optional: Minify the output
  json(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  process.env.ROLLUP_WATCH && serve(serveopts),
  !process.env.ROLLUP_WATCH && !process.env.DEV && terser(),
];

export default [
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/controlroom-music-card.js',
      format: 'es',
      sourcemap: true,
    },
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
    plugins: [...plugins],
  },
];
