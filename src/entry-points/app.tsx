import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { FloatingSquare } from './floating-square'

const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <FloatingSquare />
    </div>
  )
}

const root = document.getElementById('app')

ReactDOM.render(<App />, root)
