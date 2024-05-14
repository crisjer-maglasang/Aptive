import { Icon } from '@/components'

export default function ColumnSortIndicator({column, sorted, sortOrder}) {
  if (!column.sortable) {
    return <></>
  }
  if (!sorted) {
    return <Icon icon="sort" className="w-4 h-4 text-gray-600 inline" />;
  }
  if (sortOrder === 'desc') {
    return <Icon icon="sortDown" className="w-4 h-4 text-gray-600 inline" />;
  }

  return <Icon icon="sortUp" className="w-4 h-4 text-gray-600 inline" />;
}
