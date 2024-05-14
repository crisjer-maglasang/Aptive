import { useEffect, useState } from 'react'
import AreaTeamPanel from './AreaTeamPanel'
import { Loader } from '@/components'
import { sptConstants } from '../../lib'

const AreaTeams = ({loading, teamData, areaData}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [openClose, setOpenClose] = useState({})

  const updateTeamSelection = (team, isSelected) => {
    const updatedOpenClose = openClose
    updatedOpenClose[team.team_id] = isSelected
    setOpenClose(updatedOpenClose)
    let isExpanded = true
    for (const isOpen of Object.values(updatedOpenClose)) {
      if (!isOpen) {
        isExpanded = false;
      }
    }
    setIsExpanded(isExpanded)
  }
  const closeAll = () => {
    let closePanels = openClose
    for (const key in teamData) {
      closePanels[key] = false
    }
    setOpenClose(closePanels)
    setIsExpanded(false)
  }
  const expandAll = () => {
    let openPanels = openClose
    for (const key in teamData) {
      openPanels[key] = true
    }
    setIsExpanded(true)
    setOpenClose(openPanels)
  }

  useEffect(() => {
    closeAll()
  }, [teamData])

  return (
    <div>
      <div className='flex justify-between h-[41px] rounded-t-lg border-x border-b p-1.5 pt-3'>
        <div className="text-sm font-bold pl-1.5">
          Teams
        </div>
        <div className="text-primary-300 text-[0.65rem] pt-1 pr-1.5">
          {
            isExpanded ?
              <button onClick={closeAll} onTouchStart={closeAll}>{sptConstants.CLOSE_ALL}</button> :
              <button onClick={expandAll} onTouchStart={expandAll}>{sptConstants.EXPAND_ALL}</button>
          }
        </div>
      </div>
      <div className="w-[280px] max-h-[574px] rounded-b-lg overflow-auto">
        {loading ?
          <Loader className="my-3.5"/>
          :
          teamData && Object.values(teamData).map(team => {
            return (
              <AreaTeamPanel
                loading={loading}
                areaData={areaData}
                key={team.team_id}
                openClose={openClose[team.team_id]}
                team={team}
                updateTeamSelection={updateTeamSelection}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default AreaTeams
