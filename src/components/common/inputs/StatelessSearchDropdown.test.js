import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';

import StatelessSearchDropdown from './StatelessSearchDropdown'
import {Button} from '../Button'

const openDropdown = () => {
  const listButtonElement = screen.getByRole('button')
  fireEvent.click(listButtonElement)
}
const testItems = [
  {id: 1, name: 'test 1'},
  {id: 2, name: 'test 2'},
  {id: 3, name: 'test 3'},
  {id: 4, name: 'test 4'},
]
describe('StatelessSearchDropdown', () => {
  test('renders StatelessSearchDropdown component', () => {
    const {container} = render(
      <StatelessSearchDropdown
        items={[]}
        onChange={()=>{}}
        selected={{}}
      />
    )
    expect(container).toBeInTheDocument();
  })
  test ('uses "name" as default display property', () => {
    render(
      <StatelessSearchDropdown
        items={testItems}
        onChange={()=>{}}
        selected={{}}
      />
    )
    openDropdown()

    const options= screen.getByRole('listbox')
    expect(options).toBeInTheDocument();
    expect(options).toHaveTextContent(/test 1/i)
    expect(options).toHaveTextContent(/test 2/i)
    expect(options).toHaveTextContent(/test 3/i)
    expect(options).toHaveTextContent(/test 4/i)
  })
  test ('uses custom property name to display value', () => {
    const namePropertyItems = [
      {id: 1, display: 'test with name 1'},
      {id: 2, display: 'test with name 2'},
      {id: 3, display: 'test with name 3'},
    ]
    render(
      <StatelessSearchDropdown
        items={namePropertyItems}
        onChange={()=>{}}
        selected={{}}
        displayProp="display"
      />
    )
    openDropdown()

    const options= screen.getByRole('listbox')
    expect(options).toBeInTheDocument();
    expect(options).toHaveTextContent(/test with name 1/i)
    expect(options).toHaveTextContent(/test with name 2/i)
    expect(options).toHaveTextContent(/test with name 3/i)
  })
  test ('label is displayed', () => {
    render(
      <StatelessSearchDropdown
        label="This is the label"
        items={testItems}
        onChange={()=>{}}
        selected={{}}
      />
    )
    const label = screen.getByText(/This is the label/i);
    expect(label).toBeInTheDocument();
  })
  test ('the search field narrows down the options', () => {
    const searchItems = [
      {id: 1, value: 'abcdef'},
      {id: 2, value: 'bcdefa'},
      {id: 3, value: 'cdefab'},
      {id: 4, value: 'defabc'},
      {id: 5, value: 'ghabcij'},
      {id: 6, value: 'ghijklm'},
    ];
    const { container } = render(
      <StatelessSearchDropdown
        label="Search test"
        items={searchItems}
        onChange={()=>{}}
        selected={{}}
        displayProp="value"
      />
    )
    openDropdown()

    const startingOptions = screen.getAllByRole('option')
    expect(startingOptions).toHaveLength(6)

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const searchElement = container.querySelector('#searchText')

    // search for abc
    fireEvent.change(searchElement, {
      target: { value: 'abc' },
    })

    const selectedOptions = screen.getAllByRole('option')
    expect(selectedOptions).toHaveLength(3)
  })
  test ( 'clicking on option triggers onChange', () => {
    const onChange = jest.fn();
    render(
      <StatelessSearchDropdown
        label="Search test"
        items={testItems}
        onChange={onChange}
        selected={{}}
      />
    )
    openDropdown()

    const selectedOption = screen.getByText(/test 3/i);

    fireEvent.click(selectedOption);
    expect(onChange).toHaveBeenCalledWith({id: 3, name: 'test 3'});
  })
  test ( 'the selected value is displayed', () => {
    render(
      <StatelessSearchDropdown
        label="Search test"
        items={testItems}
        onChange={()=>{}}
        selected={{id: 3, name: 'test 3'}}
      />
    )
    openDropdown()

    // get the button, look for value
    const listButtonElement = screen.getByRole('button')
    expect(listButtonElement).not.toHaveTextContent(/test 1/i)
    expect(listButtonElement).not.toHaveTextContent(/test 2/i)
    expect(listButtonElement).toHaveTextContent(/test 3/i)
  })
  test ('button can be rendered', () => {
    render(
      <StatelessSearchDropdown
        label="Search test"
        items={testItems}
        onChange={()=>{}}
        selected={{}}
        button={
          <Button
            onClick={()=>{}}
          >Hello world!</Button>
        }
      />
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[1]).toHaveTextContent(/Hello world!/i)
  })
})