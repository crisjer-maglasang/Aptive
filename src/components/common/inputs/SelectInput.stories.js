import React from 'react'
import SelectInput from './SelectInput'

export default {
    title: 'Input/SelectInput',
    component: SelectInput,
    argTypes: {
        onChange: {
            action: 'field changed',
            description: 'Callback called when the input changes value'
        },
        error: {
            name: 'error',
            type: {
                name: 'string',
                required: false
            }
        }
    }
}

const Template = (args) => <SelectInput {...args} />

export const SelectInputStory = Template.bind({})

SelectInputStory.args = {
    autoComplete: 'Gender',
    error: null,
    id: 'gender',
    name: 'gender',
    options: [ 'Male', 'Female', 'Other' ],
    required: true
}

