import { EmployeesFactory } from '../common/factories/employees'

export default async (req: any, res: any) => {
  const data = {
    status: 200,
    data: EmployeesFactory.dummyList()
  }
  return res.status(200).json(data)
}
