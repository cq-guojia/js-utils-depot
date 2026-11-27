# js-utils-depot

通用 JS 工具集：字符串纯函数与基于 Day.js 的时间能力，按能力子路径按需引入。

## 设计

- 一级域为 `string` 基础处理与 `dayjs` 时间处理；时间层整体由 Day.js 提供，不另设 `datetime` 域。
- 根入口只保留对现有 `truncateBytes` 的兼容；`string` 与 `dayjs` 各自独立，不互相引入。
- 时间默认英文；中文语言包与每个插件（官方或自有）各占一个子路径，用哪个引哪个，不用的不进 bundle。
- 自定义时间能力以 Day.js 插件形式提供，支持链式调用；静态方法按 Day.js 插件模型导出。
- 设计依据：[设计总览](docs/architecture/overview.md)、[目录结构](docs/architecture/directory-structure.md)。

## 当前内容

- `truncateBytes(text, maxBytes, suffix = '…')`：按 UTF-8 字节数截断字符串，`suffix` 计入总长，不会切掉半个码点；不依赖 `TextEncoder`。

## 安装

```bash
pnpm add js-utils-depot
```

## 使用

```js
import { truncateBytes } from 'js-utils-depot'

truncateBytes('中文abc', 7) // '中…'
truncateBytes('a😀b', 5) // 'a…'
```

## 口径

- 包管理器：pnpm
- 运行时依赖：`string` 无；`dayjs` 域依赖 `dayjs@1.11.23`
- 源码：TypeScript，发布 ESM 与类型声明
