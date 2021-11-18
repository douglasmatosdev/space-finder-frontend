import React from 'react'
import { User } from '../model/Model'
import { AuthService } from '../services/AuthServie'
import { Login } from './Login'

interface AppState {
  user: User | undefined
}

export default class App extends React.Component<{}, AppState> {

  private authService: AuthService = new AuthService()

  constructor(props: any) {
    super(props)

    this.setUser = this.setUser.bind(this)
  }

  private setUser(user: User) {
    this.setState({ user: user })
    console.log('setting th user: ', user);

  }

  render() {
    return (
      <div>class App
        <Login authService={this.authService} setUser={this.setUser} />
      </div>
    )
  }
}
