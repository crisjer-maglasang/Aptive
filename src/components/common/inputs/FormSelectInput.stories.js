import React from 'react'
import FormSelectInput from './FormSelectInput'

export default {
    title: 'Input/FormSelectInput',
    component: FormSelectInput,
    argTypes: {
        onChange: {
            action: 'field changed',
            description: 'Callback called when the input changes value'
        }
    }
}

const Template = (args) => <FormSelectInput {...args} />

export const FormSelectInputStory = Template.bind({})

FormSelectInputStory.args = {
    id: 'gender',
    label: 'Gender',
    name: 'gender',
    autoComplete: 'Gender',
    required: true,
    error: null,
    value: null,
    options: [ 'Male', 'Female', 'Other' ]
}

