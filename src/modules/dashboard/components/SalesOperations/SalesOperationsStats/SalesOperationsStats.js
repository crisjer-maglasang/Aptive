import { Icon } from '@/components'
import { dashboardConstants, formatNumber } from '@/lib'
import { soStatsLoadingSelector } from '@/redux/loading'
import { requestSoStatsAsync, soStatsSelector } from '@/redux/sales-operations'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { FILTER_NAMES, FILTER_VALUES, filtersShape, normalizeRequestFilters, requestFiltersShape } from '../'
import { ProgressBarBox, TextInfoBox } from './Boxes'
import { resolveRepsStartedBoxTitle } from './utils'

const REP_EXPERIENCE_ROOKIE = '1'

const SalesOperationsStats = ({
  filters,
  searchText,
  searchType,
  stats,
  statsLoading,
  getStats,
  setFilters,
  requestFilters,
}) => {
  const [show, setShow] = useState(true)

  const toggleStats = useCallback(() => {
    setShow(shown => !shown)
  }, [])

  const normalizedFilters = useMemo(() => (
    normalizeRequestFilters(requestFilters)
  ), [requestFilters])

  const repsStartedBoxTitle = useMemo(() => (
    resolveRepsStartedBoxTitle(requestFilters)
  ), [requestFilters])

  const onBoxClicked = useCallback(({ name, value, selected }) => {
    setFilters({ ...filters, [name]: selected ? FILTER_VALUES.DEFAULT : value })
  }, [filters, setFilters])

  useEffect(() => {
    const params = {
      filter: {},
    }

    normalizedFilters.forEach(({ name, value }) => {
      params.filter[name] = value
    })

    if (searchText) {
      params.filter.search = searchText;
      params.filter.search_type = searchType;
    }

    getStats(params)
  }, [getStats, normalizedFilters, searchText, searchType])

  return (
    <div className="mt-4">
      <div className="flex px-4 py-2.5">
        <button
          className="inline-flex items-center text-sm text-gray-900 focus:outline-none"
          onClick={toggleStats}
        >
          <Icon
            icon="chevron"
            className={classNames('w-6 h-6 text-gray-400 mr-2', { '-rotate-90': !show })}
          />
          {dashboardConstants.SHOW_CHARTS_AND_GRAPHS}
        </button>
      </div>
      <div className={classNames('mt-4', { hidden: !show })}>
        <div className="grid grid-cols-12 gap-x-3 gap-y-4">
          <div className="col-span-6 md:col-span-3">
            <TextInfoBox
              title={dashboardConstants.BOX_PROFILE_COMPLETED}
              tooltip={dashboardConstants.BOX_PROFILE_COMPLETED_TOOLTIP}
              loading={statsLoading}
              text={formatNumber(stats.profile_completed)}
              selected={filters[FILTER_NAMES.PROFILE] === FILTER_VALUES.COMPLETE}
              name={FILTER_NAMES.PROFILE}
              value={FILTER_VALUES.COMPLETE}
              onClick={onBoxClicked}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <TextInfoBox
              title={dashboardConstants.BOX_REP_NOT_SUBMITTED}
              tooltip={dashboardConstants.BOX_REP_NOT_SUBMITTED_TOOLTIP}
              loading={statsLoading}
              text={formatNumber(stats.not_submitted)}
              selected={filters[FILTER_NAMES.NOT_SUBMITTED] === FILTER_VALUES.NOT_SUBMITTED}
              name={FILTER_NAMES.NOT_SUBMITTED}
              value={FILTER_VALUES.NOT_SUBMITTED}
              onClick={onBoxClicked}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <TextInfoBox
              title={dashboardConstants.BOX_WORKDAY_COMPLETED}
              tooltip={dashboardConstants.BOX_WORKDAY_COMPLETED_TOOLTIP}
              loading={statsLoading}
              text={formatNumber(stats.workday_complete)}
              selected={filters[FILTER_NAMES.WORKDAY] === FILTER_VALUES.COMPLETE}
              name={FILTER_NAMES.WORKDAY}
              value={FILTER_VALUES.COMPLETE}
              onClick={onBoxClicked}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <ProgressBarBox
              title={dashboardConstants.BOX_REPS_STATUS}
              tooltip={dashboardConstants.BOX_REPS_STATUS_TOOLTIP}
              loading={statsLoading}
              milestones={[
                {
                  value: stats.started,
                  label: dashboardConstants.BOX_REPS_STATUS_STARTED,
                  bgClassName: 'bg-teal-400',
                },
                {
                  value: stats.not_started,
                  label: dashboardConstants.BOX_REPS_STATUS_NOT_STARTED,
                  bgClassName: 'bg-orange-400',
                },
              ]}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <TextInfoBox
              title={dashboardConstants.BOX_ROOKIES}
              tooltip={dashboardConstants.BOX_ROOKIES_TOOLTIP}
              loading={statsLoading}
              text={formatNumber(stats.rookies)}
              selected={filters[FILTER_NAMES.EXPERIENCE] === REP_EXPERIENCE_ROOKIE}
              name={FILTER_NAMES.EXPERIENCE}
              value={REP_EXPERIENCE_ROOKIE}
              onClick={onBoxClicked}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <TextInfoBox
              title={dashboardConstants.BOX_PROFILE_AND_WORKDAY_COMPLETE}
              tooltip={dashboardConstants.BOX_PROFILE_AND_WORKDAY_COMPLETE_TOOLTIP}
              loading={statsLoading}
              text={formatNumber(stats.profile_and_workday_complete)}
              selected={filters[FILTER_NAMES.PROFILE_AND_WORKDAY_COMPLETE] === FILTER_VALUES.COMPLETE}
              name={FILTER_NAMES.PROFILE_AND_WORKDAY_COMPLETE}
              value={FILTER_VALUES.COMPLETE}
              onClick={onBoxClicked}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <TextInfoBox
              title={dashboardConstants.BOX_ASSIGNED_TO_A_TEAM}
              tooltip={dashboardConstants.BOX_ASSIGNED_TO_A_TEAM_TOOLTIP}
              loading={statsLoading}
              text={formatNumber(stats.team_assigned)}
              selected={filters[FILTER_NAMES.TEAM_ASSIGNED] === FILTER_VALUES.ASSIGNED}
              name={FILTER_NAMES.TEAM_ASSIGNED}
              value={FILTER_VALUES.ASSIGNED}
              onClick={onBoxClicked}
            />
          </div>
          <div className="col-span-6 md:col-span-3">
            <TextInfoBox
              title={repsStartedBoxTitle}
              tooltip={dashboardConstants.BOX_REPS_STARTED_TOOLTIP}
              loading={statsLoading}
              text={formatNumber(stats.total_by_date)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

SalesOperationsStats.propTypes = {
  requestFilters: requestFiltersShape.isRequired,
  filters: filtersShape.isRequired,
  setFilters: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  searchType: PropTypes.string,
}

const mapStateToProps = (state) => ({
  stats: soStatsSelector(state),
  statsLoading: soStatsLoadingSelector(state),
})

const mapDispatchToProps = {
  getStats: requestSoStatsAsync.request,
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesOperationsStats)
