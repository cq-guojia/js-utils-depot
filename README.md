# js-utils-depot

通用 JS 工具集：纯函数、零运行时依赖，不绑定宿主 API。

## 设计

- 一级域为 `string` 基础处理与 `datetime` 时间处理；相对时间文案 `relative-time` 属于 `datetime`，不单独开域。
- 一函数一文件、一子路径；根入口只保留对现有 `truncateBytes` 的兼容，不做全量聚合。
- 相对时间默认中文，其他语言由调用方传文案表；没有全局语言状态，不静态引入语言包。
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
- 运行时依赖：零
- 源码：TypeScript，发布 ESM 与类型声明
