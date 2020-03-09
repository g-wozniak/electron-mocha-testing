import employees from './src/api/employees'
import { IAppStartup } from 'src/common/intf/IAppStartup'

const config: IAppStartup = {
  url: 'http://localhost',
  port: 3000,
  api: {
    routes: [
      {
        name: 'List of all users',
        method: 'GET',
        uri: '/employees',
        endpoint: employees
      }
    ]
  },
  webapp: 'webapp'
}

export default config
