import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

export const getUrlData = (link: string = window.location.href) => {
  const url = link
  const obj = {} as { [key: string]: string }
  if (url.includes('?')) {
    const params = url.split('?')[1].split('&')
    params.map((v) => (obj[v.split('=')[0]] = v.split('=')[1]))
  }
  return obj
}

// 防抖函数
export function debounce(fn: (...arg: any[]) => any, duration = 500) {
  let timer = -1
  return function (this: unknown, ...args: any[]) {
    if (timer > -1) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn.bind(this)(...args)
      timer = -1
    }, duration)
  }
}

// 数组中是否存在重复项
export const isRepeat = (arr: any) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == arr[i + 1]) {
      return true
    }
  }
  return false
}

// 替换url中的参数
export const replaceUrlArg = (url: string, arg: string, argVal: string) => {
  const urlObj = new URL(url)
  urlObj.searchParams.set(arg, argVal)
  return urlObj.href
}

// 下载文件并重名称
export const downloadFile = (url: string, fileName: string) => {
  //fileurl文件地址（一般是接口返回） filename文件下载后的名字
  const x = new XMLHttpRequest()
  x.open('GET', url, true)
  x.responseType = 'blob'
  x.onload = function () {
    const url = window.URL.createObjectURL(x.response)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    document.body.removeChild(a)
    // 然后移除
  }
  x.send()
}

// 是否被 iframe 内嵌、qiankun 内嵌
export const isEmbedded = () => {
  try {
    return window.self !== window.top || qiankunWindow.__POWERED_BY_QIANKUN__
  } catch (e) {
    return true
  }
}

// 内嵌曝光埋点上报
export const exposureLog = (bizName: string, functionName: string) => {
  try {
    if (qiankunWindow.__POWERED_BY_QIANKUN__) {
      qiankunWindow.expLogJSON(bizName, functionName)
    }
  } catch (e) {
    console.log(e)
  }
}

//写cookies
export const setCookie = (name: string, value: any) => {
  const Days = 30
  const exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

//读取cookies
export const getCookie = (name: string) => {
  let arr = []
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')

  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  else return null
}
