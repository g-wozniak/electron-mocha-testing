import * as React from 'react'
import axios from 'axios'
import { Grid, Table, Header, Image } from 'semantic-ui-react'
import { IWebAppProps } from '../common/intf/IWebAppProps'
import { IEmployee } from '../common/intf/IEmployee'

class App extends React.Component<IWebAppProps, any> {

  private hostname: string

  constructor(props: IWebAppProps) {
    super(props)
    const { url, port } = this.props.startup
    this.hostname = `${url}:${port}`
    this.state = {
      employees: undefined
    }
  }

  public async componentDidMount(): Promise<void> {
    const response = await axios.get(`${this.hostname}/employees`)
    this.setState({ employees: response.data.data })
  }

  public render(): JSX.Element {
    const { employees } = this.state
    return (
      <Grid container={true} centered={true}>
        <Grid.Column width={12}>
          <Table basic="very" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Employee</Table.HeaderCell>
                <Table.HeaderCell>Contribution</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                employees && employees.map((employee: IEmployee) => {
                  return (
                    <Table.Row key={employee.id}>
                      <Table.Cell>
                        <Header as="h4" image={true}>
                          <Image src={employee.pictureUrl} rounded size="small" />
                          <Header.Content>
                            <span className="employee--name">{employee.name}</span>
                            <Header.Subheader className="employee--occupation">{employee.occupation}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell className="employee--contribution">{employee.contribution}</Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          </Table>
        </Grid.Column>
        <link rel="stylesheet" href="http://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"></link>
      </Grid>
    )
  }
}

export default App

          // <ul>
          //   { users && users.map((user: IUser, index: number) => <li key={index}>User: {user.name} (id={user.id})</li>) }
          // </ul>