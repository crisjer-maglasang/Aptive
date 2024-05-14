import { BaseBox } from '.'

const TextInfoBox = ({
  title,
  tooltip,
  loading,
  text,
  onClick,
  name,
  value,
  selected,
}) => {
  return (
    <BaseBox
      title={title}
      tooltip={tooltip}
      loading={loading}
      onClick={onClick}
      name={name}
      value={value}
      selected={selected}
    >
      <div className="text-[32px] text-gray-900 font-semibold leading-none">
        {text}
      </div>
    </BaseBox>
  )
}

export default TextInfoBox
