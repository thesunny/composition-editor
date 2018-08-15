import { getDiffOffsets } from "./util"

function sliceText(text, offsets) {
  return text.slice(offsets.start, offsets.start + text.length - offsets.total)
}

export default function buildOperations(prev, next) {
  if (prev === next) return []
  const ops = []
  const offsets = getDiffOffsets(prev, next)
  const prevLength = prev.length
  const nextLength = next.length
  if (offsets.total < prev.length) {
    const text = sliceText(prev, offsets)
    ops.push({
      type: "remove_text",
      offset: offsets.start,
      text,
    })
  }
  if (offsets.total < next.length) {
    const text = sliceText(next, offsets)
    ops.push({
      type: "insert_text",
      offset: offsets.start,
      text,
    })
  }
  return ops
}
