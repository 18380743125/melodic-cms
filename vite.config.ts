import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [
      react(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: mode === 'prod'
      }),
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
  }
  return config
})
