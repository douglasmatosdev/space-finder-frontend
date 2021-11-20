import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent, waitFor } from '@testing-library/react'
import { Spaces } from '../../../src/components/spaces/Spaces'
import { Space } from '../../../src/model/Model'
import { DataService } from '../../../src/services/DataService'

const someSpaces: Space[] = [
    {
        location: "Paris",
        name: "Park place",
        spaceId: "1234"
    },
    {
        location: "Paris",
        name: "Park place",
        spaceId: "1235"
    },
    {
        location: "Paris",
        name: "Park place",
        spaceId: "1236"
    },
    {
        location: "Paris",
        name: "Park place",
        spaceId: "1237"
    }
]

describe('Spaces shuite tests', () => {
    let container: HTMLDivElement

    const dataServiceMock = {
        getSpaces: jest.fn(),
        reserveSpace: jest.fn()
    }

    beforeEach(() => {
        dataServiceMock.getSpaces.mockResolvedValue(someSpaces)
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(
            <Spaces
                dataService={(dataServiceMock as any) as DataService}
            />,
            container
        )
    })

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
        jest.clearAllMocks()
    })

    test('Renders all spaces', () => {
        const spaces = document.getElementsByClassName('spaceComponent')
        expect(spaces!.length).toBe(4)
    })

    test('Correctly calls for reservation all spaces', () => {
        const buttons = document.querySelectorAll('button')
        expect(buttons!.length).toBe(4)
        fireEvent.click(buttons[0])
        expect(dataServiceMock.reserveSpace).toBeCalledWith('1234')
    })

    test('Correctly displays modal with reservation', async () => {
        dataServiceMock.reserveSpace.mockResolvedValue('555')
        const buttons = document.querySelectorAll('button')
        fireEvent.click(buttons[0])
        expect(dataServiceMock.reserveSpace).toBeCalledWith('1234')

        const modalValue = await waitFor(() => document.getElementsByClassName('modalText'))
        expect(modalValue[0]).toHaveTextContent('You reserved the space with id 1234 and got the reservation number 555')
    })


    test('Correctly displays modal without reservation', async () => {
        dataServiceMock.reserveSpace.mockResolvedValue(undefined)
        const buttons = document.querySelectorAll('button')
        fireEvent.click(buttons[0])

        const modalValue = await waitFor(() => document.getElementsByClassName('modalText'))
        expect(modalValue[0]).toHaveTextContent(`You can't reserve the space with id 1234`)
    })

    test('Correctly close modal', async () => {
        dataServiceMock.reserveSpace.mockResolvedValue('555')
        const buttons = document.querySelectorAll('button')
        fireEvent.click(buttons[0])

        const closeButton = await waitFor(() => document.getElementsByClassName('modalButton'))
        fireEvent.click(closeButton[0])

        const modalValue = await waitFor(() => document.getElementsByClassName('modalText'))
        expect(modalValue[0]).toBeUndefined()
    });
})