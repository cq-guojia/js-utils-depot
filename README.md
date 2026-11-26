# js-utils-depot

通用 JS 工具集：纯函数、零运行时依赖，不绑定宿主 API。

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
