import { useState, useEffect } from 'react';
import { Icon } from '@/components/common';

const CheckboxControl = ({
  label,
  options,
  onChange,
  defaultSelections,
}) => {
  const [selections, setSelections] = useState(defaultSelections);

  const onSelect = (value) => {
    if (!selections.includes(value)) {
      setSelections([...selections, value]);
    } else {
      const newSelections = selections.filter((item) => item !== value);
      setSelections(newSelections);
    }
  };

  useEffect(() => {
    onChange(selections);
  }, [selections]);

  return (
    <div className="leaflet-top leaflet-right mt-9 mr-9">
      <div className="leaflet-control !cursor-pointer">
        <div className="grid gap-y-2 rounded border-2 border-black/25 m-3 p-2 bg-white overflow-auto">
          {label &&
            (
              <div className="text-sm">
                {label}
              </div>
            )
          }
          {options.map((thisOption) => {
            return (
              <div onClick={() => onSelect(thisOption.value)} key={thisOption.value} className="flex gap-x-2 justify-start">
                {selections.includes(thisOption.value) ?
                  <Icon icon="checkBoxSelected" className="w-4 h-4 text-aptivegreen inline"/>
                  :
                  <Icon icon="checkBoxUnselected" className="w-4 h-4 text-gray-600 inline"/>
                }
                {thisOption.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckboxControl;
