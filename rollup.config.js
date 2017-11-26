'use strict';

import * as path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
  input: 'src/index.ts',
  output: {
    file: 'public/app.min.js',
    format: 'iife',
    name: 'app',
    sourcemap: true,
  },
  external: ['firebase/app'],
  globals: {
    'firebase/app': 'firebase'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: { }
      }
    }),
    uglify({}, minify),
  ],
}
