import { mergeClassName } from '@/lib'
import { experienceOptionSelector } from '@/redux/reps'
import { soTeamSelector } from '@/redux/sales-operations'
import { XIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { v4 as uuidv4 } from 'uuid'
import { FILTER_NAMES, FILTER_VALUES } from '../../'

const FilterTag = ({
  name,
  value,
  tip,
  text,
  onClose,
}) => {
  const id = useMemo(() => uuidv4(), [])

  const className = useMemo(() => ({
    'bg-red-100 text-red-800': [FILTER_NAMES.PROFILE, FILTER_NAMES.WORKDAY].includes(name) && value === FILTER_VALUES.INCOMPLETE,
    'bg-orange-100 text-orange-800': [FILTER_NAMES.PROFILE, FILTER_NAMES.WORKDAY].includes(name) && value === FILTER_VALUES.STARTED,
    'bg-green-100 text-green-800': [FILTER_NAMES.PROFILE, FILTER_NAMES.WORKDAY].includes(name) && value === FILTER_VALUES.COMPLETE,
  }), [name, value])

  return value ? (
    <div
      data-for={id}
      data-tip={tip}
      className={
        mergeClassName(
          'inline-flex items-center my-1 mx-1 py-0.5 px-2.5 rounded-md bg-gray-100 text-xs text-gray-900 font-medium cursor-default',
          className,
        )
      }
    >
      <span className="leading-normal">{text}</span>
      <button className="ml-1 text-gray-500 focus:outline-none hover:text-gray-900 focus:text-gray-900" onClick={onClose}>
        <XIcon className="w-3 h-3" aria-hidden="true" />
      </button>
      <ReactTooltip
        id={id}
        place="bottom"
        effect="solid"
      />
    </div>
  ) : null
}

FilterTag.propTypes = {
  name: PropTypes.oneOf(Object.values(FILTER_NAMES)).isRequired,
  value: PropTypes.string.isRequired,
  tip: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
    text: {
      [FILTER_NAMES.TEAM]: soTeamSelector(state, +ownProps.value)?.name,
      [FILTER_NAMES.EXPERIENCE]: experienceOptionSelector(state, +ownProps.value)?.name,
    }[ownProps.name] || ownProps.text,
  }
)

export default connect(mapStateToProps)(FilterTag)
