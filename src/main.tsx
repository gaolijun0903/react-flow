import React from 'react'
import ReactDOM, { Root } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import App from './App'
import './styles/index.scss'

let root: Root
console.log(React)

const BASE_NAME = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/react-flow' : '/'

function render(props: any) {
  const { container } = props
  root = ReactDOM.createRoot(
    container
      ? container.querySelector('#root-react-flow')
      : document.getElementById('root-react-flow'),
  )

  root.render(
    <BrowserRouter basename={BASE_NAME}>
      <App />
    </BrowserRouter>,
  )
}

renderWithQiankun({
  mount(props) {
    console.log('react-flow mount')
    render(props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount(props: any) {
    console.log('react-flow unmount')
    root.unmount()
  },
  update(props: any) {
    console.log('react-flow update')
    console.log(props)
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}
