import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import replace from 'rollup-plugin-replace';
import image from '@rollup/plugin-image';
import copy from 'rollup-plugin-copy';
import visualizer from 'rollup-plugin-visualizer';
import { eslint } from 'rollup-plugin-eslint';
import path from 'path';

export default {
  input: './src/index.tsx',
  plugins: [
    eslint({
      throwOnError: true, // lint 结果有错误将会抛出异常
      throwOnWarning: true,
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
      exclude: ['node_modules/**', 'lib/**', '*.js'],
    }),
    json(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    babel({
      exclude: 'node_modules/**',
    }),
    postcss({
      plugins: [
        autoprefixer(),
        cssnano(),
      ],
      extract: 'css/index.css',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    serve({
      contentBase: '', // 服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8020,
    }),
    livereload('dist'),
    alias({
      entries: [
        { find: '@', replacement: path.join(__dirname, 'src') },
      ],
    }),
    image(),
    // terser(),
    copy({
      targets: [
        { src: 'src/assets/iconfont/*', dest: 'dist/css/assets/iconfont' },
      ],
    }),
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // })
  ],
  external: [],
  output: {
    file: 'dist/bundle.es.js',
    format: 'esm',
  },
};
