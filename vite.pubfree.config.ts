import { ConfigEnv, defineConfig } from 'vite'
import uniqueCommitId from 'unique-commit-id'
import fs from 'fs'
import path from 'path'
import qiankun from 'vite-plugin-qiankun'
import packageJSON from './package.json'
import BASE_CONFIG from './vite.config'

const disableCatchPlugin = () => {
  return {
    name: 'disable-catch-plugin',
    transformIndexHtml: (html: string) => {
      // 在.js 后追加时间戳，防止safari低版本浏览器缓存影响
      // @ts-ignore
      return html.replace(/\.js'/g, '.js\' + "?" + Date.now()')
    },
  }
}

const prebuild = (mode: string) => {
  const content = `module.exports = {
    publisher: {
      options: {
        // 上传 oss 配置
        uploadRule: {
          customOSSDir: '${mode || ''}',
          // 上传文件是否带有发布时的时间戳，默认以 commitId 作为文件区分
          useTimeStamp: false,
          // 是否替换图片路径
          replaceImgSource: false,
          // 是否替换资源路径
          replaceDepSource: false,
        },
      },
    },
  }`
  // 生成 leorc.js 文件配置
  fs.writeFileSync(path.join('./', 'leorc.js'), content, 'utf-8')
}

export default defineConfig(({ mode }: ConfigEnv) => {
  prebuild(mode)
  return {
    ...BASE_CONFIG,
    base: `https://storage.360buyimg.com/pubfree-bucket/${
      packageJSON.name
    }/${mode}/${uniqueCommitId.latest()}/`,
    plugins: [
      qiankun('reac18', {
        useDevMode: false,
      }),
      disableCatchPlugin(),
    ],
  }
})
