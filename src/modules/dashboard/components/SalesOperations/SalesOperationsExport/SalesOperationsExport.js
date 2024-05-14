import { CustomButton, Icon, Loader } from '@/components'
import { dashboardConstants } from '@/lib'
import { soExportLoadingSelector } from '@/redux/loading'
import { exportSoRepsAsync } from '@/redux/sales-operations'
import { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { normalizeRequestFilters, requestFiltersShape } from '../'

const SalesOperationsExport = ({
  requestFilters,
  search,
  searchType,
  selectedReps,
  exportLoading,
  exportSoReps,
}) => {
  const normalizedFilters = useMemo(() => (
    normalizeRequestFilters(requestFilters)
  ), [requestFilters])

  const exportOnClick = useCallback(() => {
    const params = {
      filter: {},
    }

    normalizedFilters.forEach(({ name, value }) => {
      params.filter[name] = value
    })

    if (search) {
      params.filter.search = search;
      params.filter.search_type = searchType;
    }

    exportSoReps({ selectedReps, params })
  }, [exportSoReps, selectedReps, normalizedFilters, search, searchType])

  return (
    exportLoading
      ? <Loader className="items-center w-[50px] h-[38px] leading-[42px]" />
      : (
        <CustomButton className="p-0 text-gray-400" color="white" onClick={exportOnClick}>
          <Icon
            icon="export"
            id="export"
            title={dashboardConstants.EXPORT}
            message={dashboardConstants.EXPORT}
            className="w-12 h-9 px-4 py-2"
          />
        </CustomButton>
      )
  )
}

SalesOperationsExport.propTypes = {
  requestFilters: requestFiltersShape.isRequired,
}

const mapStateToProps = (state) => ({
  exportLoading: soExportLoadingSelector(state),
})

const mapDispatchToProps = {
  exportSoReps: exportSoRepsAsync.request,
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesOperationsExport)
