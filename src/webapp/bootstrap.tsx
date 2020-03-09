import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import config from '../../config'

ReactDOM.render(
  <App startup={config} />,
  document.getElementById('app') as HTMLElement
)
