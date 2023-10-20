import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import theme from './config/theme'

function dashline(str: string) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

const getAntdTokenStr = () => {
  let additionalData = ''
  for (const [, token] of Object.entries(theme)) {
    const tokenStr = Object.entries(token).reduce((result, item) => {
      return result + `$${item[0]}:var(--cjg-${dashline(item[0])});`
    }, '')
    additionalData += tokenStr
  }
  return additionalData
}

export const BASE_CONFIG = {
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: getAntdTokenStr(),
      },
    },
  },
  server: {
    port: 8118,
    host: 'local.jd.com',
    open: true,
    cors: true,
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
}
// https://vitejs.dev/config/
export default defineConfig(BASE_CONFIG)
