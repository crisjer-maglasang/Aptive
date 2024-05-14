import React from 'react'
import FormTextInput from './FormTextInput'

export default {
    title: 'Input/FormTextInput',
    component: FormTextInput,
    argTypes: {
        onChange: {
            action: 'field changed',
            description: 'Callback called when the input changes value'
        }
    }
}

const Template = (args) => <FormTextInput {...args} />

export const FormTextInputStory = Template.bind({})

FormTextInputStory.args = {
    id: 'firstName',
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    autoComplete: 'First name',
    placeholder: 'First Name',
    required: true,
    error: null,
    value: null
}

