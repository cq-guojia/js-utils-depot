# 设计总览

## 1. 系统上下文

| 外部系统 | 方向 | 协议 | 用途 |
|---|---|---|---|
| Node / 浏览器 / 小程序消费方 | 入站 | ESM import | 按能力子路径引入字符串纯函数、Day.js 核心与插件 |
| npm registry | 出站 | npm publish（OIDC） | 发布 `dist/` 与类型声明 |
| GitHub Actions | 出站 | tag `v*` 触发 | 构建、自检、发布 |

## 2. 模块与依赖

| 模块 | 职责 | 依赖 | 不能依赖 |
|---|---|---|---|
| `src/string/` | 字符串基础处理 | 无 | 其他域、宿主 API |
| `src/dayjs/` | 基于 Day.js 的时间解析、格式化、运算、比较、插件与语言包转发 | `dayjs@1.11.23` | `src/string/`、宿主 API |
| `tests/` | 验证导出函数行为 | `dist/` | `src/` 源码 |
| `docs/` | 文档索引、设计与目录约定 | 无 | 过程叙事 |

依赖方向固定为：消费方 → `package.json` 能力子路径 → `dist/` → Day.js 核心 / 插件 / 语言包 → 函数或 Dayjs 实例返回。`src/` 各域之间不互相依赖；具体文件布局见[目录结构](directory-structure.md)。

## 3. 关键链路

### 3.1 子路径导入与调用

1. 消费方从 `js-utils-depot/dayjs` 导入 Dayjs 构造器，再按需要从 `js-utils-depot/dayjs/plugin/<名称>` 或 `js-utils-depot/dayjs/locale/<名称>` 引入插件与语言包。
2. `package.json` 的 `exports` 把每个能力映射到 `dist/dayjs/...` 下独立文件与类型声明。
3. 插件子路径在加载时执行 `dayjs.extend(...)`，把实例方法或静态方法挂到本包持有的 Day.js 实例；不引入就不注册、不进 bundle。
4. 时间默认英文；中文由 `js-utils-depot/dayjs/locale/zh-cn` 独立引入，调用方通过 `dayjs.locale('zh-cn')` 设置全局默认或用实例级 `.locale()` 隔离。
5. 字符串函数仍按 `js-utils-depot` 根入口兼容 `truncateBytes`；非法输入按函数签名返回回退值。

## 4. 部署

| 组件 | 形态 | 副本 | 端口 |
|---|---|---|---|
| `dist/` | npm 包内 ESM 与类型声明 | 不适用 | 无 |

## 5. 不可破的约束

- 根 `.` 只保留对现有 `truncateBytes` 的兼容；禁止把时间能力聚合到根出口。
- `dayjs` 核心、每个官方插件、每个自有插件、每个语言包各占一个子路径；禁止在入口统一注册全部插件或静态引入全部语言包。
- 时间默认英文；中文语言包独立引入，`zh-cn` 与 `en` 是内置范围，其他语言由调用方注册 locale 对象。
- 自定义时间能力以 Day.js 插件提供，实例方法支持链式调用，静态方法按 Day.js 插件模型导出；插件必须带类型声明。
- `dayjs` 锁 `1.11.23`；升级须评估插件兼容性与行为变化。
- 新增域或新子路径必须有明确需求，并同步更新 `docs/architecture/directory-structure.md` 与 `package.json` 的 `exports`。

## 6. 术语

| 术语 | 含义 | 别称 |
|---|---|---|
| 子路径 | `package.json` 的 `exports` 中按能力暴露的入口 | 能力出口 |
| core | `src/` 下不依赖宿主 API 的纯函数集合 | 基础层 |
| 插件 | 通过 `dayjs.extend()` 注册到本包 Day.js 实例上的实例方法或静态方法 | 能力扩展 |
| 社区化时间表达 | 由 `relative-time` 插件与语言包返回的「3分钟前」类文案 | 相对时间文案 |

## 更新日志

- 2026-11-26 16:58:56：补齐设计总览：模块边界、调用链路与不可破约束
- 2026-11-26 22:31:29：纠正零依赖口径：允许 datetime 按函数子路径引入成熟轻量库
- 2026-11-27 19:03:39：时间层改为 dayjs 命名：Day.js 核心、插件与语言包按能力子路径暴露
