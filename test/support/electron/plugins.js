process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

require('./electronReload')

const { app } = require('electron')

app.on('ready', (e) => {
  // addDevToolsExtension
  const electron = require('electron')
  const BrowserWindow = electron.BrowserWindow
  BrowserWindow.addDevToolsExtension('/home/gwozniak/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.4.0_0')
})

app.on('before-quit', function () {
  app.exit()
})