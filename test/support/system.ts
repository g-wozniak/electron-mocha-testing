import { EventEmitter } from 'events'
import { Server } from 'http'

import { IAppStartup } from '../../src/common/intf/IAppStartup'
import { IApiRequest } from '../../src/common/intf/IApiRequest'
import AppServer from '../../src/common/server'
import users from '../../src/api/employees'
import axios, { AxiosInstance } from 'axios'
import { IRoute } from '../../src/common/intf/IRoute'

class System {

  private server: AppServer

  private express: Server

  private startup: IAppStartup

  private axios: AxiosInstance

  public constructor(startup?: IAppStartup) {
    this.startup = startup || {
      url: 'http://localhost',
      port: 3000,
      api: {
        routes: [
          {
            name: 'users',
            uri: '/users',
            method: 'GET',
            endpoint: users
          }
        ]
      },
      webapp: 'webapp'
    }

    this.axios = axios.create({
      baseURL: `${this.startup.url}:${this.startup.port}`,
      timeout: 20000
    })

    this.server = new AppServer(this.startup)
  }

  public async start(): Promise<Server> {
    this.express = await this.startServer()
    return this.express
  }

  public async stop(): Promise<void> {
    if (this.express) {
      await this.express.close()
    }
  }

  public async request({ uri, payload }: IApiRequest): Promise<any> {
    const route = this.startup.api.routes.find((r: IRoute) => r.uri === uri)
    if (route) {
      return (route.method === 'GET')
        ? await this.axios.get(route.uri)
        : await this.axios.post(route.uri, payload)
    }
    return null
  }

  private async startServer(): Promise<any> {
    let server: Server | undefined
    const serverReady = new EventEmitter()

    const unlockingServer = async () => {
      await new Promise((resolve: any) => {
        serverReady.once('serverListeningEvent', resolve)
      })
    }

    const callback = () => {
      serverReady.emit('serverListeningEvent')
    }
    server = this.server.start(callback)
    await unlockingServer()
    return server
  }

}
export default System
