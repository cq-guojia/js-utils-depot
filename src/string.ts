function utf8Size(codePoint: number): number {
  if (codePoint <= 0x7f) return 1
  if (codePoint <= 0x7ff) return 2
  if (codePoint <= 0xffff) return 3
  return 4
}

/**
 * 按 UTF-8 字节数截断字符串，suffix 计入 maxBytes，不会切掉半个码点。
 * 不依赖 TextEncoder，可用于 Node、浏览器和小程序等运行时。
 */
export function truncateBytes(text: string, maxBytes: number, suffix = '…'): string {
  if (typeof text !== 'string' || !Number.isFinite(maxBytes) || maxBytes <= 0) return ''
  const tail = typeof suffix === 'string' ? suffix : '…'

  let total = 0
  for (const ch of text) total += utf8Size(ch.codePointAt(0) ?? 0)
  if (total <= maxBytes) return text

  let tailBytes = 0
  for (const ch of tail) tailBytes += utf8Size(ch.codePointAt(0) ?? 0)
  const budget = maxBytes - tailBytes

  let out = ''
  let used = 0
  const limit = budget <= 0 ? maxBytes : budget
  for (const ch of budget <= 0 ? tail : text) {
    const size = utf8Size(ch.codePointAt(0) ?? 0)
    if (used + size > limit) break
    used += size
    out += ch
  }
  return budget <= 0 ? out : out + tail
}
