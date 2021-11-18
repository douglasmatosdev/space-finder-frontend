import React from "react"
import { Link } from "react-router-dom"
import { UserAttribute, User } from "../model/Model"
import { AuthService } from "../services/AuthServie"

interface ProfileState {
    userAttributes: UserAttribute[]
}

interface ProgileProps {
    user: User | undefined,
    authService: AuthService
}

export class Profile extends React.Component<ProgileProps, ProfileState> {

    state: ProfileState = {
        userAttributes: []
    }

    async componentDidMount() {
        if (this.props.user) {
            const userAttrs = await this.props.authService.getUserAttributes(this.props.user)

            this.setState({
                userAttributes: userAttrs
            })
        }
    }

    private renderUserAttributes() {
        const rows = []

        for (const userAttributes of this.state.userAttributes) {
            rows.push(
                <tr key={userAttributes.Name}>
                    <td>{userAttributes.Name}</td>
                    <td>{userAttributes.Value}</td>
                </tr>
            )
        }

        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

    render() {
        let profileSpace: any

        if (this.props.user) {
            profileSpace = <div>
                <h3>Hello {this.props.user.userName}</h3>
                {this.renderUserAttributes()}
            </div>
        } else {
            profileSpace = <div>Please <Link to="login">Login</Link></div>
        }

        return (
            <div>
                Wellcome to the profile page!
                {profileSpace}
            </div>
        )
    }
}