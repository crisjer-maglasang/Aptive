import React from 'react'
import FormInput from './FormInput'

export default {
    title: 'Input/FormInput',
    component: FormInput
}

const Template = (args) => <FormInput {...args}>
    <input type="text" className="border border-gray-200 border-dashed" />
</FormInput>

export const FormInputStory = Template.bind({})

FormInputStory.args = {
    htmlFor: 'test',
    label: 'First name'
}

