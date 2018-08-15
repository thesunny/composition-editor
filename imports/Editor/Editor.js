import diffOps from "/imports/diffOps"
import applyOps from "/imports/applyOps"
import select from "./select"

const initialState = {
  text: "Hello World",
  selection: { anchorOffset: 0, focusOffset: 0 },
  ops: [],
}

export default class Editor extends React.Component {
  state = { ...initialState }
  savedSelection = initialState.selection
  reset = () => {
    this.setState(initialState)
  }
  componentDidMount() {
    this.div.addEventListener("compositionstart", this.compositionStart)
    this.div.addEventListener("compositionend", this.compositionEnd)
    this.div.addEventListener("keyup", this.keyUp)
  }
  componentWillUnmount() {
    this.div.removeEventListener("compositionstart", this.compositionStart)
    this.div.removeEventListener("compositionend", this.compositionEnd)
    this.div.removeEventListener("keyup", this.keyUp)
  }
  compositionStart = () => {
    this.composing = true
  }
  compositionEnd = () => {
    this.composing = false
    this.reconcile()
  }
  keyUp = () => {
    if (this.composing) return
    this.reconcile()
  }
  reconcile = () => {
    this.saveSelection()
    this.diff(false)
  }
  componentDidUpdate() {
    // after editor updates, restore selection
    const { anchorOffset, focusOffset } = this.state.selection
    select(this.div, anchorOffset, focusOffset)
  }
  // save selection whenever we blur the editor
  saveSelection = () => {
    const { anchorOffset, focusOffset } = window.getSelection()
    this.savedSelection = { anchorOffset, focusOffset }
  }
  diff = (focus = true) => {
    const prev = this.state.text
    const next = this.div.innerText
    // create operations (same as SlateJS but without `marks` and `path`)
    const ops = diffOps(prev, next)
    // apply ops against our current state which is plain text for prototype
    const text = applyOps(this.state.text, ops)
    this.setState({
      text,
      selection: this.savedSelection,
      ops: this.state.ops.concat(ops),
    })
    if (focus) this.div.focus()
  }
  render() {
    console.log("render")
    const { text } = this.state
    return (
      <div>
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.diff}>Diff</button>
        <div
          onBlur={this.saveSelection}
          ref={div => (this.div = div)}
          className="Editor"
          contentEditable
          suppressContentEditableWarning
        >
          {text}
        </div>
        <div className="EditorState">{JSON.stringify(this.state, null, 2)}</div>
      </div>
    )
  }
}
