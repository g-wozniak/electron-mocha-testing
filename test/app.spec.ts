const reactMonkey = require('./support/electron/browserMonkeyWrapper')

import App from '../src/webapp/App'
import System from './support/system'

import config from '../config'
import { EmployeesFactory } from '../src/common/factories/employees'
import { IEmployee } from '../src/common/intf/IEmployee'

describe('App', () => {
  const testConfig = {
    ...config,
    port: 3001
  }
  const system = new System(testConfig)
  let browser: any

  before(async () => {
    await system.start()
    browser = reactMonkey(App, {
      startup: testConfig
    })
  })

  describe('employees table', () => {

    const employees = EmployeesFactory.dummyList()

    it('renders table', async () => {
      await browser.find('table.ui').shouldExist()
    })

    it('renders list of employees', async () => {
      await browser.find('.employee--name').shouldHave({
        text: employees.map((e: IEmployee) => e.name)
      })
      await browser.find('.employee--occupation').shouldHave({
        text: employees.map((e: IEmployee) => e.occupation)
      })
      await browser.find('.employee--contribution').shouldHave({
        text: employees.map((e: IEmployee) => e.contribution)
      })
    })

  })

  after(async () => {
    await system.stop()
  })
})
