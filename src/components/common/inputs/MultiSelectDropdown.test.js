import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import MultiSelectDropdown from './MultiSelectDropdown'

const testItems = [
  {id: 1, name: 'test 1'},
  {id: 2, name: 'test 2'},
  {id: 3, name: 'test 3'},
  {id: 4, name: 'test 4'},
]

const openDropdown = () => {
  const listButtonElement = screen.getByRole('button')
  fireEvent.click(listButtonElement)
}
describe('MultiSelectDropdown', () => {
  test('renders MultiSelectDropdown component', () => {
    const { container } = render(
      <MultiSelectDropdown
        items={[]}
        label=""
        placeholder=""
        setSelected={()=>{}}
      />
    )
    expect(container).toBeInTheDocument()
  })
  test ('uses "name" as default display property', () => {
    render(
      <MultiSelectDropdown
        items={testItems}
        setSelected={()=>{}}
      />
    )

    openDropdown()

    const options= screen.getByRole('listbox')
    expect(options).toBeInTheDocument()
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
      <MultiSelectDropdown
        items={namePropertyItems}
        displayProp="display"
        setSelected={()=>{}}
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
      <MultiSelectDropdown
        label="This is the label"
        items={testItems}
        setSelected={()=>{}}
      />
    )
    const label = screen.getByText(/This is the label/i);
    expect(label).toBeInTheDocument();
  })
  test ('show "Select All" by default', () => {
    render(
      <MultiSelectDropdown
        items={testItems}
        setSelected={()=>{}}
      />
    )

    openDropdown()

    const options= screen.getByRole('listbox')
    expect(options).toBeInTheDocument()
    expect(options).toHaveTextContent(/test 1/i)
    expect(options).toHaveTextContent(/test 2/i)
    expect(options).toHaveTextContent(/test 3/i)
    expect(options).toHaveTextContent(/test 4/i)
  })
  test ( 'the selected value is displayed', () => {
    render(
      <MultiSelectDropdown
        label="Search test"
        items={testItems}
        setSelected={()=>{}}
      />
    )
    openDropdown()

    const selectedOption = screen.getByText(/test 3/i);
    fireEvent.click(selectedOption);

    const listButtonElement = screen.getByRole('button')

    expect(listButtonElement).not.toHaveTextContent(/test 1/i)
    expect(listButtonElement).not.toHaveTextContent(/test 2/i)
    expect(listButtonElement).toHaveTextContent(/test 3/i)
  })
  test ( 'a second value is displayed', () => {
    render(
      <MultiSelectDropdown
        label="Search test"
        items={testItems}
        setSelected={()=>{}}
      />
    )
    openDropdown()

    const selectedOption2 = screen.getByText(/test 2/i);
    fireEvent.click(selectedOption2);
    const selectedOption3 = screen.getByText(/test 3/i);
    fireEvent.click(selectedOption3);

    // get the button, look for value
    const listButtonElement = screen.getByRole('button')
    expect(listButtonElement).toHaveTextContent(/test 2, test 3/i)
  })
  test ( 'items are displayed alphabetically by last name', () => {
    const items = [
      {id: 1, name: 'Kajetan McMillan'},
      {id: 2, name: 'Rahim Bauer'},
      {id: 3, name: 'Raheel McDermott'},
      {id: 4, name: 'Gianni Clegg'},
      {id: 5, name: 'Daisie Hodgson'},
      {id: 6, name: 'Alysha Eastwood'},
      {id: 7, name: 'Eduard Woodward'},
      {id: 8, name: 'Vivienne Arnold'},
      {id: 9, name: 'Angharad Goddard'},
      {id: 10, name: 'Abu Quinn'},
    ]
    render(
      <MultiSelectDropdown
        label="Search test"
        items={items}
        setSelected={()=>{}}
      />
    )
    openDropdown()

    const selectedOption1 = screen.getByText(/Raheel McDermott/i);
    fireEvent.click(selectedOption1);
    const selectedOption2 = screen.getByText(/Eduard Woodward/i);
    fireEvent.click(selectedOption2);
    const selectedOption3 = screen.getByText(/Vivienne Arnold/i);
    fireEvent.click(selectedOption3);
    const selectedOption4 = screen.getByText(/Kajetan McMillan/i);
    fireEvent.click(selectedOption4);

    // get the button, look for value
    const listButtonElement = screen.getByRole('button')
    expect(listButtonElement).toHaveTextContent(/Vivienne Arnold, Raheel McDermott, Kajetan McMillan, Eduard Woodward/i)
  })
  test ( 'Return selected values', () => {
    const setSelected = jest.fn();

    render(
      <MultiSelectDropdown
        label="Search test"
        items={testItems}
        setSelected={setSelected}
      />
    )
    openDropdown()

    const selectedOption1 = screen.getByText(/test 1/i);
    fireEvent.click(selectedOption1);
    const selectedOption3 = screen.getByText(/test 3/i);
    fireEvent.click(selectedOption3);

    expect(setSelected).toHaveBeenCalledWith([
      {id: 1, name: 'test 1'},
      {id: 3, name: 'test 3'}
    ]);
  })
  test ( 'handle initial selections', () => {
    const setSelected = jest.fn();

    render(
      <MultiSelectDropdown
        label="Search test"
        items={testItems}
        setSelected={setSelected}
        initialSelections={[1,3]}
      />
    )
    openDropdown()

    expect(setSelected).toHaveBeenCalledWith([
      {id: 1, name: 'test 1'},
      {id: 3, name: 'test 3'}
    ]);
    const listButtonElement = screen.getByRole('button')
    expect(listButtonElement).toHaveTextContent(/test 1, test 3/i)
  })
})