import React from 'react';

const ChildRadioGroupWrapper = ({ children }) => (
  <div
    className="flex items-start p-5 bg-gray-50 border-t-0 border-l border-r border-b  shadow-sm rounded-b-lg"
  >
    {children}
  </div>
);

export default ChildRadioGroupWrapper;
