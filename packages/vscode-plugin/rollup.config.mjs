/* eslint-disable import/no-extraneous-dependencies */
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'node:fs';
import path from 'node:path';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

export default {
  input: ['./src/client.ts', './src/server.ts'],
  external: [
    'vscode',
    'vscode-languageclient/node',
    'vscode-languageserver/node',
    'vscode-languageserver-textdocument',
    // 'vscode',
    // ...getExternals(pkg.dependencies),
    // ...getExternals(pkg.peerDependencies),
    // ...getExternals(pkg.devDependencies),
  ],
  output: {
    format: 'cjs',
    entryFileNames: '[name].js',
    dir: path.dirname(pkg.main),
  },
  plugins: [
    resolve({
      // Make .js/.jsx resolve to .ts/.tsx similar to TypeScript
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      preferBuiltins: true,
    }),
    commonjs(),
    babel({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      include: ['src/**/*'],
      babelHelpers: 'bundled',
    }),
  ],
};
