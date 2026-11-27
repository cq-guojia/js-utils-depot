# 目录结构

## 2. 模块与依赖

| 模块 | 职责 | 依赖 | 不能依赖 |
|---|---|---|---|
| `src/string/` | 字符串基础处理；当前含 `truncateBytes` | 无 | `src/dayjs/`、宿主 API |
| `src/dayjs/` | Day.js 核心转发、语言包注册、官方与自有插件注册 | `dayjs@1.11.23` | `src/string/`、宿主 API |
| `tests/` | 与导出函数同名的行为测试 | 构建产物 `dist/` | `src/` 源码 |
| `docs/` | 文档索引、设计与目录约定 | 无 | 过程叙事 |

依赖方向固定为：消费方 → `package.json` 能力子路径 → `dist/` → Day.js 核心 / 插件 / 语言包 → `tests/` 验证。`src/` 各域之间不互相依赖。

```text
js-utils-depot/                                     # 包根
├── README.md                                       # 包说明、安装与设计入口
├── package.json                                    # 出口、脚本与依赖声明
├── tsconfig.json                                   # TypeScript 编译配置
├── pnpm-lock.yaml                                  # pnpm 锁文件
├── src/                                            # 源码目录
│   ├── string/                                     # 字符串基础处理
│   │   └── truncate-bytes.ts                       # 按 UTF-8 字节截断字符串
│   └── dayjs/                                      # 基于 Day.js 的时间能力
│       ├── index.ts                                # Day.js 核心转发
│       ├── locale/                                 # 语言包，按需引入
│       │   └── zh-cn.ts                            # 中文语言包注册
│       └── plugin/                                 # 官方与自有插件，一插件一文件
│           ├── relative-time.ts                    # 官方相对时间插件
│           └── duration.ts                         # 官方时长插件
├── tests/                                          # 与导出函数同名的测试
│   └── string.test.mjs                             # truncateBytes 边界测试
├── docs/                                           # 项目文档库
│   ├── README.md                                   # 文档索引
│   └── architecture/                               # 架构与设计文档
│       ├── overview.md                             # 设计总览
│       └── directory-structure.md                  # 目录结构约定
└── ledger/                                         # 任务台账
```

## 5. 不可破的约束

- 根 `.` 只保留对现有 `truncateBytes` 的兼容；禁止把时间能力聚合到根出口。
- `dayjs` 核心、每个官方插件、每个自有插件、每个语言包各占一个文件与一个子路径；禁止在入口统一注册全部插件或静态引入全部语言包。
- 官方插件全部做成独立子路径，用哪个引哪个；会改变 Day.js 语义的插件也只在主动 import 时生效。
- 时间默认英文；`zh-cn` 语言包独立子路径引入；自定义时间能力写成插件并带类型声明。
- `dayjs` 锁 `1.11.23`；新增子路径或升级依赖须同步更新本文件、`docs/architecture/overview.md` 与 `package.json` 的 `exports`。

## 更新日志

- 2026-11-26 16:58:56：补齐源码、测试与文档的目录约定
- 2026-11-26 22:31:29：纠正零依赖口径：允许 datetime 按函数子路径引入成熟轻量库
- 2026-11-27 19:03:39：目录树改为 src/dayjs：核心、locale、plugin 各自独立子路径
