import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/predict': {
        target: 'http://18.207.120.238:8000',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://18.207.120.238:8000',
        changeOrigin: true,
      },
    },
  },
})
