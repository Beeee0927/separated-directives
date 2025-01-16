import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

const tsconfig = { tsconfig: 'tsconfig.src.json' }

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: 'src/main.ts',
    output: {
      file: 'lib/index.js',
      format: 'esm',
      plugins: [terser()]
    },
    plugins: [typescript(tsconfig)]
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'lib/index.d.ts',
      format: 'esm'
    },
    plugins: [typescript(tsconfig), dts(tsconfig)]
  }
]
