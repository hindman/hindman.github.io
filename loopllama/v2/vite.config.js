import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  root: 'src',
  base: '/loopllama/v2/',
  publicDir: '../public',
  build: {
    outDir: command === 'build' ? '..' : 'dist',
    emptyOutDir: false,
  },
}))
