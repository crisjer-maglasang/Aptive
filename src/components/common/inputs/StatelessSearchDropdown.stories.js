import React from 'react'
import StatelessSearchDropdown from './StatelessSearchDropdown'
import { Button } from '@/components'

export default {
    title: 'Input/StatelessSearchDropdown',
    component: StatelessSearchDropdown,
    argTypes: {
        onChange: {
            action: 'field changed',
            description: 'Callback called when the input changes value'
        }
    }
}

const Template = (args) => <StatelessSearchDropdown {...args} />

export const Default = Template.bind({});
Default.args = {
    label: 'Stateless Search Dropdown',
    items: [
        {id: 1, name: 'test 1'},
        {id: 2, name: 'test 2'},
        {id: 3, name: 'test 3'},
        {id: 4, name: 'test 4'},
    ],
    selected: {},
}
export const ButtonProp = Template.bind({});
ButtonProp.args = {
    label: 'Stateless Search Dropdown',
    items: [
        {id: 1, name: 'test 1'},
        {id: 2, name: 'test 2'},
        {id: 3, name: 'test 3'},
        {id: 4, name: 'test 4'},
    ],
    selected: null,
    button: <Button onClick={() => {}}>hello world</Button>
}
