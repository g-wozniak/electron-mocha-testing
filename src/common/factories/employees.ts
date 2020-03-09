import { IEmployee } from '../intf/IEmployee'

export namespace EmployeesFactory {
  export function dummyList(): IEmployee[] {
    return [
      {
        id: 1,
        name: 'Lena',
        occupation: 'Front-end developer',
        contribution: '23%',
        pictureUrl: 'https://react.semantic-ui.com/images/avatar/small/lena.png'
      },
      {
        id: 2,
        name: 'Matthew',
        occupation: 'Full Stack developer',
        contribution: '22%',
        pictureUrl: 'https://react.semantic-ui.com/images/avatar/small/matthew.png'
      },
      {
        id: 3,
        name: 'Lindsay',
        occupation: 'Product Owner',
        contribution: '2%',
        pictureUrl: 'https://react.semantic-ui.com/images/avatar/small/lindsay.png'
      },
      {
        id: 4,
        name: 'Mark',
        occupation: 'Service Delivery Manager',
        contribution: '1%',
        pictureUrl: 'https://react.semantic-ui.com/images/avatar/small/mark.png'
      }
    ]
  }
}