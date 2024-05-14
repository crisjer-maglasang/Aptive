import classNames from 'classnames'
import { useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BaseBox } from '.'

const ProgressBarBox = ({
  title,
  tooltip,
  loading,
  milestones,
}) => {
  const total = useMemo(() => (
    milestones.reduce((total, { value }) => total + value, 0)
  ), [milestones])

  return (
    <BaseBox
      title={title}
      tooltip={tooltip}
      loading={loading}
    >
      <div className="pt-1.5">
        <div className="flex">
          {milestones.map(({ value, bgClassName }, index) => {
            const first = 0
            const last = milestones.length - 1

            return (
              <div
                key={uuidv4()}
                className={classNames(`h-2.5 border-white min-w-[8px] ${bgClassName}`, {
                  'border-r-2': index === first,
                  'rounded-l-3xl': index === first,
                  'border-l-2': index === last,
                  'rounded-r-3xl': index === last,
                  'border-x-2': ![first, last].includes(index),
                })}
                style={{ width: `${value / total * 100}%` }}
              >
              </div>
            )
          })}
        </div>
        <div className="flex gap-x-1 mt-1 text-gray-900 text-[10px] leading-[1.2]">
          {milestones.map(({ label, bgClassName }) => {
            return (
              <div key={uuidv4()} className="inline-flex items-center">
                <i className={`w-1.5 h-1.5 rounded-full mr-1 ${bgClassName}`}></i>
                {label}
              </div>
            )
          })}
        </div>
      </div>
    </BaseBox>
  )
}

export default ProgressBarBox
