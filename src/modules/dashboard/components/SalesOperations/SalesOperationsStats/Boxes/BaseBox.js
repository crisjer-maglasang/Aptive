import { Icon, Loader } from '@/components'
import { mergeClassName } from '@/lib'
import { v4 as uuidv4 } from 'uuid'

const BaseBox = ({
  title,
  tooltip,
  loading,
  children,
  onClick,
  name,
  value,
  selected,
}) => {
  return (
    <div className={mergeClassName(
      'w-full h-full bg-white border rounded-lg', {
        'border-primary-300 ring-1 ring-primary-300': selected,
        'cursor-pointer': onClick,
        'hover:ring-1 hover:ring-gray-200': onClick && !selected,
      },
    )} {...onClick && { onClick: () => onClick({ name, value, selected }) }}>
      <div className="px-6 py-4">
        <div className="inline-flex items-center max-w-full text-xs text-gray-400 font-semibold">
          <span
            className="text-ellipsis whitespace-nowrap overflow-hidden"
            title={title}
          >
            {title}
          </span>
          <Icon
            icon="infoCircle"
            id={uuidv4()}
            title={title}
            message={tooltip}
            className="w-4 h-4 shrink-0 text-gray-400 ml-2"
            allowHtml={true}
          />
        </div>
      </div>
      <div className="px-6 pb-3">
        {loading
          ? <Loader className="h-[32px] leading-[34px]" />
          : children
        }
      </div>
    </div>
  )
}

export default BaseBox
