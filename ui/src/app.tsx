import * as React from 'react'
import * as ReactDOM from 'react-dom'

const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}

const root = document.getElementById('app')

ReactDOM.render(<App />, root)
