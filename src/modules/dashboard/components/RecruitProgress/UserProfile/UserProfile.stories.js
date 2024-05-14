import React from 'react';
import UserProfile from './UserProfile';

export default {
  title: 'UserProfile',
  component: UserProfile,
};

const Template = (args) => <UserProfile {...args} />;

export const UserProfileStory = Template.bind({});

UserProfileStory.args = {};
