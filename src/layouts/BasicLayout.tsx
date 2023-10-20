import React, { useCallback, useMemo, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { basicLayoutRoutes, IRouteObjectExt } from '@/router'
import styles from './BasicLayout.module.css'
import { actions } from '@/models/global'
import { isEmbedded } from '@/utils/util'

const { Header, Content, Sider } = Layout

type MenuItemProps = MenuProps['items']
const routesAdapt = (routes: IRouteObjectExt[], parentPath = ''): MenuItemProps => {
  if (!routes || routes.length === 0) return undefined
  const filterRoutes = routes.filter((route) => route.name && !route.hidden)
  if (!filterRoutes.length) {
    return undefined
  }
  return filterRoutes.map((route) => {
    const fullPath = `${parentPath}/${route.path || ''}`
    return {
      key: fullPath,
      label: route.name,
      hidden: route.hidden,
      children:
        route.children && route.children.length > 0
          ? routesAdapt(route.children, fullPath)
          : undefined,
    }
  })
}

const BasicLayout: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const selectedKeys = useMemo(() => {
    return [pathname]
  }, [pathname])

  const menuItems = useMemo(() => {
    console.log('basicLayoutRoutes', routesAdapt(basicLayoutRoutes))
    return routesAdapt(basicLayoutRoutes)
  }, [])

  const handleMenuClick = useCallback(({ key }: { key: string }) => {
    navigate(key)
  }, [])

  useEffect(() => {
    actions.setUserInfo() // 获取当前用户
  }, [])

  return (
    <>
      {!isEmbedded() ? (
        <Layout>
          <Header style={{ height: 48, background: '#fff' }} className={styles.header}>
            <h1>工作流</h1>
          </Header>
          <Layout>
            <Sider width={200}>
              <Menu
                mode="inline"
                selectedKeys={selectedKeys}
                style={{ height: '100%', borderRight: 0 }}
                items={menuItems}
                onClick={handleMenuClick}
              />
            </Sider>
            <Layout
              style={{
                width: 'calc(100vw - 200px)',
                position: 'relative',
                backgroundColor: '#F7F8FA',
              }}
            >
              <Content className={styles.content}>
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      ) : (
        <Layout
          style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            backgroundColor: '#F7F8FA',
          }}
        >
          <Content>
            <Outlet />
          </Content>
        </Layout>
      )}
    </>
  )
}

export default BasicLayout
