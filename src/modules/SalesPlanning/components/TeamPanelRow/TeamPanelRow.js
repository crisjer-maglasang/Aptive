import React from 'react'
import { mergeClassName } from '@/lib/utils';

const TeamPanelRow = ({label, value, className}) => {
  return (
    <div className='flow-root pr-1 pt-1 pb-1'>
      <div className='float-left text-gray-900'>
        {label}
      </div>
      <div className={mergeClassName('float-right text-right text-gray-900}', className)}>
        {value || 0}
      </div>
    </div>
  )
}

export default TeamPanelRow
