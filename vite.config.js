import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname, '.'),
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  server: {
    open: '/index.html'
  }
})