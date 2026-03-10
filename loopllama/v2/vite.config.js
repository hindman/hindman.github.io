import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: '/loopllama/v2/',
  publicDir: '../public',
  build: {
    outDir: '..',
    emptyOutDir: false,
  },
})
