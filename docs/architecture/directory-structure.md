# 目录结构

## 2. 模块与依赖

| 模块 | 职责 | 依赖 | 不能依赖 |
|---|---|---|---|
| `src/string/` | 字符串基础处理；当前含 `truncateBytes` | 无 | `src/datetime/`、宿主 API |
| `src/datetime/` | 时间解析、格式化、运算、比较与相对时间文案 | 无 | 宿主 API、全局语言状态、第三方库 |
| `tests/` | 与导出函数同名的行为测试 | 构建产物 `dist/` | `src/` 源码 |
| `docs/` | 文档索引、设计与目录约定 | 无 | 过程叙事 |

依赖方向固定为：消费方 → `package.json` 函数级子路径 → `dist/` → `tests/` 验证。`src/` 各域之间不互相依赖。

```text
js-utils-depot/                                     # 包根
├── README.md                                       # 包说明、安装与设计入口
├── package.json                                    # 出口、脚本与依赖声明
├── tsconfig.json                                   # TypeScript 编译配置
├── pnpm-lock.yaml                                  # pnpm 锁文件
├── src/                                            # 源码目录
│   ├── string/                                     # 字符串基础处理
│   │   └── truncate-bytes.ts                       # 按 UTF-8 字节截断字符串
│   └── datetime/                                   # 时间处理
│       ├── parse.ts                                # 解析时间输入
│       ├── format.ts                               # 格式化时间
│       ├── add.ts                                  # 按单位加时间
│       ├── subtract.ts                             # 按单位减时间
│       ├── diff.ts                                 # 计算时间差
│       ├── min.ts                                  # 取最早时间
│       ├── max.ts                                  # 取最晚时间
│       ├── start-of.ts                             # 归零到单位起点
│       ├── end-of.ts                               # 归尾到单位终点
│       ├── compare.ts                              # 比较时间先后
│       └── relative-time.ts                        # 返回相对时间文案
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

- 必须一函数一文件、一子路径；禁止用域 `index.ts` 做全量 re-export：barrel 在 CJS 与小程序构建中无法 tree-shaking，一次导入会带进整域。
- `src/` 必须零运行时依赖；禁止引入 moment、lodash、date-fns 等第三方库：零依赖与跨端是本包的基本口径。
- 禁止全局可变语言状态与静态语言包导入：会引入副作用并把全量文案带进包。
- 根 `.` 只保留对现有 `truncateBytes` 的兼容；禁止把新函数聚合到根出口。
- 新增域必须有明确需求，并同步更新本文件、`docs/architecture/overview.md` 与 `package.json` 的 `exports`。

## 更新日志

- 2026-11-26 16:58:56：补齐源码、测试与文档的目录约定
