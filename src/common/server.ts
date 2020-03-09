import * as express from 'express'
import { Server } from 'http'
import { Logger } from './logger'
import { IAppStartup } from './intf/IAppStartup'
import { IRoute } from './intf/IRoute'
const helmet = require('helmet')
const bodyParser = require('body-parser')

class AppServer {

  private startup: IAppStartup

  constructor(startup: IAppStartup) {
    this.startup = startup
  }

  public start(callback?: any): Server {

    const statusText = `Application running: "${this.startup.url}", Port: "${this.startup.port}"`

    const app = express()

    app.use(helmet())

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(bodyParser.json())

    const routes = this.startup.api.routes

    try {
      this.bind(app, routes)
      this.bindWebApp(app, this.startup.webapp)
    } catch (launchError) {
      Logger.screen({
        level: 'error',
        slug: 'server_launch_error',
        message: launchError
      })
      Logger.startup('Error during application launch', false)
      process.exit(1)
    }

    return app.listen(this.startup.port, () => {
      Logger.startup(`Application is listening.\n${statusText}`)
      if (callback) {
        callback()
      }
    })
  }

  private bindWebApp(app: express.Express, webapp: any): express.Express {
    const cmdDir = process.cwd()

    app.use('/app', express.static(cmdDir + '/dist/app'))
    Logger.startup('+ /app (static mapping)', true)

    app.use('/styles', express.static(cmdDir + '/dist/styles'))
    Logger.startup('+ /styles (static mapping)', true)

    app.get('*', (req: any, res: any) => {
      const indexPath = `${cmdDir}/dist/index.html`
      res.sendFile(indexPath)
    })

    return app
  }

  private bind(app: express.Express, routes: IRoute[]): express.Express {
    if (routes.length > 0) {
      routes.forEach((route: IRoute) => {
        Logger.startup(`+ ${route.uri}`, true)
        switch (route.method) {
          case 'GET':
            app.route(route.uri).get(route.endpoint)
            break
          case 'POST':
            app.route(route.uri).post(route.endpoint)
            break
          default:
            Logger.screen({
              level: 'error',
              slug: 'server_bind_unknown_request',
              message: 'Unknown request type passed to the route'
            })
        }
      })
    } else {
      Logger.screen({
        level: 'error',
        slug: 'server_bind_no_routes',
        message: 'No API routes provided or `node` parameter is incorrect'
      })
      throw new Error('server_bind_no_routes')
    }
    return app
  }
}

export default AppServer
