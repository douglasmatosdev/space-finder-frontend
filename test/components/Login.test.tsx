import ReactDOM from 'react-dom'
import { fireEvent } from '@testing-library/react'
import { Login } from '../../src/components/Login'

describe('Login component test suite', () => {
    let container: HTMLDivElement

    const setUserMock = jest.fn()

    const authServiceMock = {
        login: jest.fn()
    }

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(
            <Login
                setUser={setUserMock}
                authService={authServiceMock as any}
            />,
            container
        )
    })

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
        jest.clearAllMocks()
    })

    test('Renders correctly initial document', () => {
        const title = document.querySelector('h2')
        expect(title!.textContent).toBe('Please login')

        const inputs = document.querySelectorAll('input')
        expect(inputs).toHaveLength(3)
        expect(inputs[0].value).toBe('')
        expect(inputs[1].value).toBe('')
        expect(inputs[2].value).toBe('Login')

        const label = document.querySelector('label')
        expect(label).not.toBeInTheDocument()
    })

    test('Passes credentials correctly', () => {
        const inputs = document.querySelectorAll('input')
        const loginInput = inputs[0]
        const passwordInput = inputs[1]
        const loginButton = inputs[2]

        fireEvent.change(loginInput, { target: { value: 'someUser' } })
        fireEvent.change(passwordInput, { target: { value: 'somePass' } })
        fireEvent.click(loginButton)

        expect(authServiceMock.login).toBeCalledWith(
            'someUser',
            'somePass'
        )
    })
})