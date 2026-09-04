import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import path from 'node:path';
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

export default {
  input: './src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    /react/,
  ],
  output: [
    // {
    //   format: 'esm',
    //   entryFileNames: '[name].js',
    //   dir: path.dirname(pkg.module),
    //   preserveModules: true,
    // },
    {
      format: 'cjs',
      entryFileNames: '[name].js',
      dir: path.dirname(pkg.main),
      preserveModules: true,
    },
  ],
  plugins: [
    resolve({
      // Make .js/.jsx resolve to .ts/.tsx similar to TypeScript
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    babel({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      babelHelpers: 'bundled',
    }),
  ],
};
