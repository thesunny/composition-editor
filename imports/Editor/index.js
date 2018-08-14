function getChangeStart(oldText, newText) {
  const length = Math.min(oldText.length, newText.length)
  for (let i = 0; i < length; i++) {}
  return []
}

function buildOperations(oldText, newText) {
  if (oldText === newText) return []
  const start = getChangeStart(oldText, newText)
  console.log(start)
}

export default class Editor extends React.Component {
  state = {
    text: "Hello World",
  }
  reset = () => {
    console.log("reset")
    this.setState({ text: "Hello World" })
  }
  sync = () => {
    console.log("sync")
    const oldText = this.state.text
    const newText = this.div.innerText
    const operations = buildOperations(oldText, newText)
  }
  render() {
    console.log("render")
    const { text } = this.state
    console.log(text)
    return (
      <div>
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.sync}>Sync</button>
        <div
          ref={div => (this.div = div)}
          className="Editor"
          contentEditable
          suppressContentEditableWarning
        >
          {text}
        </div>
      </div>
    )
  }
}
