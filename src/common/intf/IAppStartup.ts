import { IRoute } from './IRoute'

export interface IAppStartup {
  url: string
  port: number
  api: {
    routes: IRoute[]
  },
  webapp: string
}