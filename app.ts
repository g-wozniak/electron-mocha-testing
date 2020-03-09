import AppServer from './src/common/server'
import startup from './config'

import { Logger } from './src/common/logger'

const appServer = new AppServer(startup)
const server = appServer.start()
const sign = ['SIGINT', 'SIGTERM']

sign.forEach((sig: any) => {
  process.on(sig, () => {
    server.close()
    console.info()
    Logger.screen({
      level: 'info',
      slug: 'app_sigterm_server_killed',
      message: 'Server killed'
    })
    process.exit()
  })
})
