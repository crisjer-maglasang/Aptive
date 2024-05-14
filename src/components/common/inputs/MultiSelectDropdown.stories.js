import React from 'react'
import MultiSelectDropdown from './MultiSelectDropdown'

export default {
    title: 'Input/MultiSelectDropdown',
    component: MultiSelectDropdown,
    argTypes: {
        onChange: {
            action: 'option clicked',
            description: 'Callback called when an option is selected'
        },
        setSelected: {
            action: 'selection changed',
            description: 'Return an array of the selected values'
        }
    }
}

const Template = (args) => <MultiSelectDropdown {...args} />

const items = [
    {id: 1, name: 'Kajetan Mcmillan'},
    {id: 2, name: 'Rahim Bauer'},
    {id: 3, name: 'Raheel Mcdermott'},
    {id: 4, name: 'Gianni Clegg'},
    {id: 5, name: 'Daisie Hodgson'},
    {id: 6, name: 'Alysha Eastwood'},
    {id: 7, name: 'Eduard Woodward'},
    {id: 8, name: 'Vivienne Arnold'},
    {id: 9, name: 'Angharad Goddard'},
    {id: 10, name: 'Abu Quinn'},
]
export const Default = Template.bind({});
Default.args = {
    label: 'Multi Select Dropdown',
    items: items,
}

export const NoSelectAll = Template.bind({});
NoSelectAll.args = {
    label: 'Multi Select Dropdown',
    items: items,
    selectAllOption: false
}

