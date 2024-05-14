import { useEffect, useState } from 'react'
import StatelessSearchDropdown from './StatelessSearchDropdown'

export default function SearchDropdown({ label, items, displayProp, onChange, button, error, className }) {
  const [selected, setSelected] = useState()

  const onSelect = (item) => {
    onChange(item)
    setSelected(item);
  }

  useEffect(() => {
    if (selected?.value && !items.some(obj => obj.value === selected?.value)) {
      setSelected(null);
    }
  }, [selected, items]);

  return (
    <StatelessSearchDropdown
      label={label}
      items={items}
      displayProp={displayProp}
      onChange={onSelect}
      button={button}
      selected={selected}
      error={error}
      className={className}
    />
  )
}
