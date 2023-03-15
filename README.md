# ArcoProTable

在 ArcoDesign 的基础上进行封装，专注查询表格，提供更加便利的使用方式。

## 安装

```bash
# 使用 npm
npm install arco-pro-table

# 使用 yarn
yarn add arco-pro-table

# 使用 pnpm
pnpm add arco-pro-table
```

## 使用

在项目入口文件如 `main.ts` 中全局引入并安装 ArcoProTable 组件

```ts
import { createApp } from 'vue'
import ArcoProTable from 'arco-pro-table'

const app = createApp(App)

app.use(ArcoProTable)

app.mount('#app')
```

本组件要求额外安装的依赖有：`@arco-design/web-vue`、`dayjs`、`lodash`、`sortablejs`、`vue`

## 全局类型支持

如果全局引入了组件库，在项目的 `tsconfig.json` 文件配置 `compilerOptions.types` 选项可以快速获得全局类型支持：

```json
{
  "compilerOptions": {
    "types": ["arco-pro-table/dist/types"]
  }
}
```
