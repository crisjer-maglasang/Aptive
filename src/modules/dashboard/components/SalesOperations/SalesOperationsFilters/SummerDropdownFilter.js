import { soSeasonsLoadingSelector } from '@/redux/loading'
import { requestSoSeasonsAsync, soSeasonsSelector } from '@/redux/sales-operations'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { FILTER_NAMES, filtersShape } from '../'
import { Select } from '@/components'

const SalesDropdownFilter = ({
  filters,
  seasons,
  getSeasons,
  seasonsLoading,
  setFilters,
}) => {
  const [selectedSeason, setSelectedSeason] = useState()

  useEffect(() => {
    getSeasons()
  }, [getSeasons])

  const seasonOptions = useMemo(() => {
    if (seasonsLoading) {
      return []
    }

    return seasons.map(({ id, name, is_current }) => {
      if (is_current) {
        setSelectedSeason(String.raw`${id}`)
      }

      return {
        value: String.raw`${id}`,
        label: name,
      }
    })
  }, [seasons, seasonsLoading])

  const onSeasonChange = useCallback(({ target }) => {
    setSelectedSeason(target.value)
    setFilters({ ...filters, [target.name]: target.value })
  }, [filters, setFilters])

  return (
    <Select
      name={FILTER_NAMES.RECRUITING_SEASON}
      value={selectedSeason}
      options={seasonOptions}
      onChange={onSeasonChange}
      isLoading={seasonsLoading}
      className="w-[155px]"
    />
  )
}

SalesDropdownFilter.propTypes = {
  filters: filtersShape.isRequired,
  setFilters: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  seasons: soSeasonsSelector(state),
  seasonsLoading: soSeasonsLoadingSelector(state),
})

const mapDispatchToProps = {
  getSeasons: requestSoSeasonsAsync.request,
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesDropdownFilter)
