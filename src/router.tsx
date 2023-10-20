import React from 'react'
import type { RouteObject } from 'react-router-dom'
import BasicLayout from './layouts/BasicLayout'
import NoMatch from '@/pages/NoMatch'
import Home from '@/pages/Home'
import FlowEditor from '@/pages/FlowEditor'


type MenuItem = {
  name?: string
  hidden?: boolean
  children?: IRouteObjectExt[]
}
export type IRouteObjectExt = RouteObject & MenuItem

export const basicLayoutRoutes = [
  {
    name: '欢迎',
    path: 'home',
    hidden: true,
    element: (
      <React.Suspense fallback={<>...</>}>
        <Home />
      </React.Suspense>
    ),
  },
  {
    name: '流程配置',
    path: 'flowEditor',
    // hidden: true,
    element: (
      <React.Suspense fallback={<>...</>}>
        <FlowEditor />
      </React.Suspense>
    ),
  },
  

  { path: '*', element: <NoMatch /> },
]

export const routes: IRouteObjectExt[] = [
  {
    path: '/',
    element: <BasicLayout />,
    children: basicLayoutRoutes,
  },
]
