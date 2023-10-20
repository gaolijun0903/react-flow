import { useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import { routes } from './router'
import theme from '../config/theme'
import 'antd/dist/reset.css'
import Empty from '@/components/Empty'

dayjs.locale('zh-cn')

const App = () => {
  const element = useRoutes(routes)
  return (
    <ConfigProvider
      prefixCls="react-flow"
      locale={zhCN}
      theme={theme}
      renderEmpty={() => <Empty />}
      autoInsertSpaceInButton={false}
    >
      {element}
    </ConfigProvider>
  )
}

export default App
