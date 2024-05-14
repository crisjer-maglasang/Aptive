import { v4 as uuidv4 } from 'uuid'
import { FILTER_NAMES } from '../'

export { formatDate, resolveFilterDates, formatDateRequest } from './Controls/DateRange/utils'

export const generateControlKeys = () => ({
  [FILTER_NAMES.DATE_RANGE]: uuidv4(),
})
