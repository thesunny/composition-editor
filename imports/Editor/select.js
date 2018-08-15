export default function select(div, anchorOffset, focusOffset) {
  const textNode = div.childNodes[0]
  if (!textNode) return // abort if editor has no text
  const selection = window.getSelection()
  const range = document.createRange()
  range.setStart(textNode, anchorOffset)
  range.setEnd(textNode, focusOffset)
  selection.removeAllRanges()
  selection.addRange(range)
}

