import { CustomButton, ModalWrapper, Select } from '@/components';
import { dashboardConstants } from '@/lib'
import { soTeamsLoadingSelector } from '@/redux/loading'
import { experienceOptionsSelector, repStatusesSelector } from '@/redux/reps';
import { requestSoTeamsAsync, soTeamsSortedSelector } from '@/redux/sales-operations'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { FILTER_NAMES, FILTER_VALUES, filtersShape } from '../';
import { DateRange, Radio, RadioGroup } from './Controls'
import { generateControlKeys } from './utils'

const viewAllOption = {
  value: FILTER_VALUES.DEFAULT,
  label: dashboardConstants.FILTER_CHOICE_VIEW_ALL,
}

const SalesOperationsFilters = ({
  modalOpen,
  closeModal,
  filters,
  setFilters,
  defaultFilters,
  teams,
  teamsLoading,
  experiences,
  repStatuses,
  getTeams,
}) => {
  const closeButtonRef = useRef()

  const [teamsLoaded, setTeamsLoaded] = useState(false)
  const [middleFilters, setMiddleFilters] = useState(filters)
  const [repStatusesOptions, setRepStatusesOptions] = useState([]);

  /**
   * Some Controls, in particular DateRange, may store its own intermediate value.
   * Passing new key will force React to replace Control component with a newly created instance.
   * That will reset intermediate value to its initial state.
   * The initial value MUST be based on the given filter value.
   */
  const [controlKeys, setControlKeys] = useState(generateControlKeys())

  const teamOptions = useMemo(() => {
    if (teamsLoading) {
      return []
    }

    const teamOptions = teams.map(({ id, name }) => ({
      value: String.raw`${id}`,
      label: name,
    }))

    teamOptions.unshift(viewAllOption)

    return teamOptions
  }, [teams, teamsLoading])

  const experienceChoices = useMemo(() => {
    return [
      { id: uuidv4(), value: FILTER_VALUES.DEFAULT, label: dashboardConstants.FILTER_CHOICE_VIEW_ALL },
      ...experiences.map(({ id, name }) => ({
        id: uuidv4(),
        value: String.raw`${id}`,
        label: name,
      }))
    ]
  }, [experiences])

  const onFiltersChange = useCallback((event) => {
    setMiddleFilters(filters => ({ ...filters, [event.target.name]: event.target.value }))
  }, [])

  const onResetFiltersClick = useCallback(() => {
    setMiddleFilters(filters => ({ ...filters, ...defaultFilters }))
    setControlKeys(generateControlKeys())
  }, [defaultFilters])

  const onApplyFiltersClick = useCallback(() => {
    setFilters({ ...middleFilters })
    closeModal()
  }, [closeModal, middleFilters, setFilters])

  useEffect(() => {
    // Sync filter values on modal open.
    if (modalOpen) {
      setMiddleFilters(filters)
    }
  }, [filters, modalOpen])

  useEffect(() => {
    // Delay teams loading until modal open.
    if (!teamsLoaded && modalOpen) {
      setTeamsLoaded(true)
      getTeams()
    }
  }, [getTeams, modalOpen, teamsLoaded])

  useEffect(() => {
    const options = [];

    repStatuses.forEach((repStatus) => options.push({ value: repStatus.statusCode, label: repStatus.statusTitle }));

    setRepStatusesOptions(options);
  }, [repStatuses]);

  return (
    <ModalWrapper
      isOpened={modalOpen}
      width=""
      onCloseModal={closeModal}
    >
      <div className="flex items-center justify-between py-5 px-6">
        <Dialog.Title as="h1" className="text-gray-900 font-semibold">
          {dashboardConstants.FILTERS_MODAL_TITLE}
        </Dialog.Title>
        <button
          className="px-6 py-5 -mx-6 -my-5 rounded-tr-lg text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-aptivegreen"
          onClick={closeModal}
          ref={closeButtonRef}
        >
          <XIcon className="w-4 h-6" aria-hidden="true" />
        </button>
      </div>
      <div className="pt-8 px-10 pb-12">
        <div className="grid grid-cols-3 gap-x-4">

          <div>
            <label className="text-sm text-gray-900">
              {dashboardConstants.FILTER_LABEL_SORT_BY_STATUS}
            </label>
            <div className="mt-1">
              <Select
                name={FILTER_NAMES.STATUS}
                value={middleFilters[FILTER_NAMES.STATUS]}
                options={repStatusesOptions}
                defaultOption={viewAllOption}
                onChange={onFiltersChange}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-900">
              {dashboardConstants.FILTER_LABEL_SELECT_A_TEAM}
            </label>
            <div className="mt-1">
              <Select
                name={FILTER_NAMES.TEAM}
                value={middleFilters[FILTER_NAMES.TEAM]}
                options={teamOptions}
                defaultOption={viewAllOption}
                onChange={onFiltersChange}
                isLoading={teamsLoading}
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-900">
              {dashboardConstants.FILTER_LABEL_SELECT_A_DATE_RANGE}
            </label>
            <div className="mt-1">
              <DateRange
                key={controlKeys[FILTER_NAMES.DATE_RANGE]}
                name={FILTER_NAMES.DATE_RANGE}
                value={middleFilters[FILTER_NAMES.DATE_RANGE]}
                onChange={onFiltersChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm text-gray-900">
            {dashboardConstants.FILTER_LABEL_SEASON}
          </label>
          <div className="grid grid-cols-4 gap-6 mt-2">
            <RadioGroup
              name={FILTER_NAMES.SEASON}
              checked={middleFilters[FILTER_NAMES.SEASON]}
              onChange={onFiltersChange}
            >
              <Radio
                label={dashboardConstants.FILTER_CHOICE_VIEW_ALL}
                value={FILTER_VALUES.DEFAULT}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_PRESEASON}
                value={FILTER_VALUES.PRESEASON}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_REGULAR_SEASON}
                value={FILTER_VALUES.REGULAR_SEASON}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_POSTSEASON}
                value={FILTER_VALUES.POSTSEASON}
              />
            </RadioGroup>
          </div>
        </div>
        {experienceChoices.length > 1 && (
          <div className="mt-4">
            <label className="text-sm text-gray-900">
              {dashboardConstants.FILTER_LABEL_EXPERIENCE}
            </label>
            <div className="grid grid-cols-4 gap-6 mt-2">
              <RadioGroup
                name={FILTER_NAMES.EXPERIENCE}
                checked={middleFilters[FILTER_NAMES.EXPERIENCE]}
                onChange={onFiltersChange}
              >
                {experienceChoices.map(({ id, label, value }) => (
                  <Radio
                    key={id}
                    label={label}
                    value={value}
                  />
                ))}
              </RadioGroup>
            </div>
          </div>
        )}
        <div className="mt-4">
          <label className="text-sm text-gray-900">
            {dashboardConstants.FILTER_LABEL_PROFILE}
          </label>
          <div className="grid grid-cols-4 gap-6 mt-2">
            <RadioGroup
              name={FILTER_NAMES.PROFILE}
              checked={middleFilters[FILTER_NAMES.PROFILE]}
              onChange={onFiltersChange}
            >
              <Radio
                label={dashboardConstants.FILTER_CHOICE_VIEW_ALL}
                value={FILTER_VALUES.DEFAULT}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_INCOMPLETE}
                value={FILTER_VALUES.INCOMPLETE}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_STARTED}
                value={FILTER_VALUES.STARTED}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_COMPLETE}
                value={FILTER_VALUES.COMPLETE}
              />
            </RadioGroup>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm text-gray-900">
            {dashboardConstants.FILTER_LABEL_SUBMITTED}
          </label>
          <div className="grid grid-cols-4 gap-6 mt-2">
            <RadioGroup
              name={FILTER_NAMES.NOT_SUBMITTED}
              checked={middleFilters[FILTER_NAMES.NOT_SUBMITTED]}
              onChange={onFiltersChange}
            >
              <Radio
                label={dashboardConstants.FILTER_CHOICE_VIEW_ALL}
                value={FILTER_VALUES.DEFAULT}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_SUBMITTED}
                value={FILTER_VALUES.SUBMITTED}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_NOT_SUBMITTED}
                value={FILTER_VALUES.NOT_SUBMITTED}
              />
            </RadioGroup>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-sm text-gray-900">
            {dashboardConstants.FILTER_LABEL_WORKDAY}
          </label>
          <div className="grid grid-cols-4 gap-6 mt-2">
            <RadioGroup
              name={FILTER_NAMES.WORKDAY}
              checked={middleFilters[FILTER_NAMES.WORKDAY]}
              onChange={onFiltersChange}
            >
              <Radio
                label={dashboardConstants.FILTER_CHOICE_VIEW_ALL}
                value={FILTER_VALUES.DEFAULT}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_INCOMPLETE}
                value={FILTER_VALUES.INCOMPLETE}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_STARTED}
                value={FILTER_VALUES.STARTED}
              />
              <Radio
                label={dashboardConstants.FILTER_CHOICE_COMPLETE}
                value={FILTER_VALUES.COMPLETE}
              />
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t py-5 px-6">
        <CustomButton
          className="px-0 focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
          color="seamless"
          onClick={onResetFiltersClick}
        >
          {dashboardConstants.FILTER_ACTION_RESET_FILTERS}
        </CustomButton>
        <CustomButton
          className="px-6 font-normal"
          color="green"
          onClick={onApplyFiltersClick}
        >
          {dashboardConstants.FILTER_ACTION_APPLY_FILTERS}
        </CustomButton>
      </div>
    </ModalWrapper>
  )
}

SalesOperationsFilters.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  filters: filtersShape.isRequired,
  setFilters: PropTypes.func.isRequired,
  defaultFilters: filtersShape.isRequired,
  repStatuses: PropTypes.arrayOf(PropTypes.object),
}

const mapStateToProps = (state) => ({
  teams: soTeamsSortedSelector(state),
  teamsLoading: soTeamsLoadingSelector(state),
  experiences: experienceOptionsSelector(state),
  repStatuses: repStatusesSelector(state),
})

const mapDispatchToProps = {
  getTeams: requestSoTeamsAsync.request,
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesOperationsFilters)
