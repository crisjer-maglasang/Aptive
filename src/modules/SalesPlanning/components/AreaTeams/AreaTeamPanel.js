import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import { sptConstants } from '../../lib'
import { TeamPanelRow } from '../TeamPanelRow'
import { addFsExcludeClass } from '@/lib/utils';

const AreaTeamPanel = ({ areaData, team, updateTeamSelection, openClose }) => {
  const [height, setHeight] = useState('0px')
  const [showOrHideFullHeader, setShowOrHideFullHeader] = useState('show')
  const [selected, setSelected] = useState(false)

  const deselect = () => {
    setSelected(false)
    setHeight('0px')
    setShowOrHideFullHeader('inherit')
  }
  const triggerDeselect = () => {
    deselect()
    updateTeamSelection(team, false)
  }
  const select = () => {
    setSelected(true)
    setHeight(`${contentSpace.current.scrollHeight}px`)
    setShowOrHideFullHeader('none')
  }
  const triggerSelect = () => {
    select()
    updateTeamSelection(team, true)
  }
  const contentSpace = useRef(null)
  const leaderHeader = useRef(null)

  useEffect(() => {
    openClose ? select() : deselect()
  }, [openClose])

  return (
    <div className='border-x border-b p-1.5 pr-3'>
      {/*This is needed for the dynamic location markers to work*/}
      {/*<div className='
      text-locationmarker-#DC2626
      text-locationmarker-#9E6EE6
      text-locationmarker-#72A1E8
      text-locationmarker-#82D5EB
      text-locationmarker-#72E361
      text-locationmarker-#E4AC71
      text-locationmarker-#B7306E
      text-locationmarker-#1F498C
      text-locationmarker-#622ABF
      text-locationmarker-#FDE047
      '></div>*/}
      <div className='flow-root'>
        <div className="pb-7 pl-1.5 h-[25px]">
          <div className="flex">
            <div
              data-tip
              data-for={`teamName-${team.team_id}`}
              className="flex-auto w-full truncate text-sm">
              <svg
                className="h-7 inline pl-2"
                viewBox="0 -5 16 16" xmlns="http://www.w3.org/2000/svg">
                <circle
                  fill={`${team.color}`}
                  cx=".16em" cy=".16em" r=".16em"/>
              </svg>
              <span className="text-sm -ml-3">
                <Link to={`/sales-planning/team/${team.team_id}?origin=area&areaId=${areaData.areaId}&areaName=${areaData.areaName}`}>
                  <span className="text-primary-300 cursor-pointer">{team.team_name}</span>
                </Link>
              </span>
            </div>
            <ReactTooltip
              effect="solid"
              id={`teamName-${team.team_id}`}
            >
              <span>{team.team_name}</span>
            </ReactTooltip>
            <div className="w-1/4 flex-auto">
              <div className="float-right text-primary-300 text-[0.65rem] ml-1 leading-7">
                {
                  selected ?
                    <button onClick={triggerDeselect} onTouchStart={triggerDeselect}>{sptConstants.COLLAPSE}</button> :
                    <button onClick={triggerSelect} onTouchStart={triggerSelect}>{sptConstants.EXPAND}</button>
                }
              </div>
            </div>
          </div>
        </div>
        <div
          ref={leaderHeader}
          style={{ display: `${showOrHideFullHeader}` }}
          className="pl-3 text-[0.65rem]"
        >
          <div className='flow-root'>
            <div className='float-left text-gray-900 w-1/6'>
              {sptConstants.LEADER}
            </div>
            <div className={addFsExcludeClass('float-right text-right text-gray-900 w-5/6')}>
              {team.team_leaders.join(', ')}
            </div>
          </div>
          <div className='flow-root pt-2'>
            <div className='float-left text-gray-900'>
              {sptConstants.NUMBER_OF_REPS}
            </div>
            <div className='float-right text-right text-gray-900'>
              {team.total_reps}
            </div>
          </div>
          <div className='flow-root pt-2'>
            <div className='float-left text-gray-900'>
              {sptConstants.QUALIFIED_ADDRESSES}
            </div>
            <div className='float-right text-right text-gray-900'>
              {team.qualified_addresses}
            </div>
          </div>
        </div>
      </div>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-hidden transition-max-height duration-800 ease-in-out text-[0.65rem] pl-1">
        <TeamPanelRow
          label={sptConstants.LEADER}
          value={team.team_leaders.join(', ')}
          className={addFsExcludeClass()}
        />
        <TeamPanelRow
          label={sptConstants.NUMBER_OF_REPS}
          value={team.total_reps}
        />
        <TeamPanelRow
          label={sptConstants.PERCENTAGE}
          value={`${team.percentage_assigned}%`}
        />
        <TeamPanelRow
          label={sptConstants.QUALIFIED_ADDRESSES}
          value={team.qualified_addresses}
        />
        <TeamPanelRow
          label={sptConstants.TOTAL_ADDRESSES}
          value={team.total_addresses}
        />
        <TeamPanelRow
          label={sptConstants.ACTIVE_CUSTOMERS}
          value={team.active_customers}
        />
        <TeamPanelRow
          label={sptConstants.INACTIVE_CUSTOMERS}
          value={team.inactive_customers}
        />
      </div>
    </div>
  )
}
const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaTeamPanel)
