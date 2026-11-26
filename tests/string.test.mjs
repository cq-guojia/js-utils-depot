import assert from 'node:assert/strict'
import test from 'node:test'

import { truncateBytes } from '../dist/index.js'

test('未超过上限时原样返回', () => {
  assert.equal(truncateBytes('abc', 3), 'abc')
  assert.equal(truncateBytes('中文', 6), '中文')
})

test('按 UTF-8 字节截断，suffix 计入总长', () => {
  assert.equal(truncateBytes('abcde', 5), 'abcde')
  assert.equal(truncateBytes('abcde', 4), 'a…')
  assert.equal(truncateBytes('abcde', 3), '…')
  assert.equal(truncateBytes('abcde', 2, '🔒'), '')
})

test('中文和 emoji 不会被切掉半个码点', () => {
  assert.equal(truncateBytes('中文abc', 7), '中…')
  assert.equal(truncateBytes('a😀b', 5), 'a…')
})

test('非法输入返回空串', () => {
  assert.equal(truncateBytes(null, 5), '')
  assert.equal(truncateBytes('abc', Number.NaN), '')
  assert.equal(truncateBytes('abc', 0), '')
})

test('不依赖 TextEncoder 全局', () => {
  const original = globalThis.TextEncoder
  try {
    Object.defineProperty(globalThis, 'TextEncoder', { value: undefined, configurable: true })
    assert.equal(truncateBytes('中文', 6), '中文')
  } finally {
    Object.defineProperty(globalThis, 'TextEncoder', { value: original, configurable: true })
  }
})
