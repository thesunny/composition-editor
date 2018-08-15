export function applyOp(prev, op) {
  switch (op.type) {
    case "insert_text":
      return prev.slice(0, op.offset) + op.text + prev.slice(op.offset)
      break
    case "remove_text":
      return prev.slice(0, op.offset) + prev.slice(op.offset + op.text.length)
      break
  }
}

export default function applyOps(prev, ops) {
  let text = prev
  for (const op of ops) {
    text = applyOp(text, op)
  }
  return text
}
