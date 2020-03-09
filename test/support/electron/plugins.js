process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

require('./electronReload')
require('./electronDevTools')

const { app } = require('electron')

app.on('before-quit', function () {
  app.exit()
})