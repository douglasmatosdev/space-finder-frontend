import ReactDOM from 'react-dom'
import { fireEvent } from '@testing-library/react'
import { ConfirmModalComponent } from '../../../src/components/spaces/ConfirmModalComponent'

describe('Confirm Modal Component test suit', () => {
    let container: HTMLDivElement
    const closeMock = jest.fn()

    test('Setup test showing modal', () => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(
            <ConfirmModalComponent
                show={true}
                close={closeMock}
                content="some content"
            />,
            container
        )
    })

    test('Showing modal text correctly', () => {
        const modalContentText = container.querySelector('h3')
        expect(modalContentText!.textContent).toBe('some content')
    })

    test('Modal button action', () => {
        const modalCloseButton = container.querySelector('button')
        fireEvent.click(modalCloseButton!)
        expect(closeMock).toBeCalled()
    })

    test('Teardown test with show', () => {
        document.body.removeChild(container)
        container.remove()
    })

    test('Setup test hiding modal', () => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(
            <ConfirmModalComponent
                show={false}
                close={closeMock}
                content='some content'
            />,
            container
        )
    })

    test('hiding modal', () => {
        expect(container).toBeEmptyDOMElement()
    })
})