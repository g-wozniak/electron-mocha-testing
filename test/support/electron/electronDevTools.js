/* eslint-disable no-console */
const {app} = require('electron')

const {
  default:installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer')

app.on('ready', () => {
  
  [REACT_DEVELOPER_TOOLS].forEach(extension => {
    installExtension(extension)
      .then(name => console.log(`Added Extension: ${name}`))
      .catch(err => console.log('An error occurred: ', err))
  })
})

// REDUX_DEVTOOLS