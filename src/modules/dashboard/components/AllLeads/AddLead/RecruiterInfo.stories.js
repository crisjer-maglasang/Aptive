import React from 'react'
import RecruiterInfo from './RecruiterInfo'

export default {
    title: 'Recruits/RecruiterInfo',
    component: RecruiterInfo
}

const Template = (args) => <RecruiterInfo {...args} />

export const RecruiterInfoStory = Template.bind({})

const recruiters = [
    {
        id: 1,
        parent_id: 1,
        recruiter: "Test1 User"
    },
    {
        id: 1,
        parent_id: 1,
        recruiter: "Test2 User"
    }
];
const recruitingOffices = [
    {
        id: 1,
        name: "Area1"
    },
    {
        id: 1,
        name: "Area2"
    }
];
RecruiterInfoStory.args = {
    recruiters,
    recruitingOffices
}
