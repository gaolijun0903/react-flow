import type { ThemeConfig } from 'antd'

const defineThemeConfig = (config: ThemeConfig): ThemeConfig => {
  return config
}

// 官方可视化配置地址 https://ant.design/theme-editor-cn
export default defineThemeConfig({
  token: {
    colorPrimary: '#266bf6',
    colorPrimaryHover: '#5189f8',
    colorPrimaryActive: '#1e56c5',
    borderRadius: 8,
  },
})
