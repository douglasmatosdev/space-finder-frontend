import React from 'react'
import { User } from '../model/Model'
import { AuthService } from '../services/AuthServie'
import { Login } from './Login'

interface AppState {
  user: User | undefined
}

export default class App extends React.Component<{}, AppState> {

  private authService: AuthService = new AuthService()

  render() {
    return (
      <div>class App
        <Login authService={this.authService} />
      </div>
    )
  }
}
