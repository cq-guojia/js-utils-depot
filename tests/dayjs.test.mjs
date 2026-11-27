import assert from 'node:assert/strict'
import test from 'node:test'

import { dayjs } from '../dist/dayjs/index.js'
import '../dist/dayjs/plugin/relative-time.js'
import '../dist/dayjs/locale/zh-cn.js'

test('dayjs 核心可用', () => {
  assert.equal(dayjs('2026-11-27').format('YYYY-MM-DD'), '2026-11-27')
})

test('插件按子路径注册后才可用', () => {
  assert.equal(typeof dayjs('2026-11-27').fromNow, 'function')
})

test('中文语言包按需注册', () => {
  dayjs.locale('zh-cn')
  assert.match(dayjs().subtract(3, 'day').fromNow(), /天前/)
})
