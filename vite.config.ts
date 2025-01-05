import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...viteCompression(),
      apply: 'build'
    },
    visualizer({ open: true })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/styles/index.scss' as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('./src') // @代替src
    }
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom', 'zustand'],
          antd: ['antd']
        }
      }
    }
  }
})
