import "./css/styles.scss"
import Editor from "/imports/Editor"

export default class App extends React.Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="/_next/static/style.css" />
        <h1>Composition Respecting Editor</h1>
        <Editor />
      </div>
    )
  }
}
