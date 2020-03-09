export interface IRoute {
  name: string
  method: 'GET' | 'POST'
  uri: string
  endpoint: any
}