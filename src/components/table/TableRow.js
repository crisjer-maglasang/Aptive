import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames'

export default function TableRow({ row, onClick }) {
  return (
    <tr className="text-xs font-semibold text-gray-600">
      {row.map((value) => {
        let key = uuidv4();
        const tdClass = classNames(
          'px-3 py-6 whitespace-nowrap bt-1 border-gray-200',
          { 'text-left': isNaN(value) },
          { 'text-right': !isNaN(value) },
        )
        return (
          <td
            key={key}
            scope="col"
            className={tdClass}
          >
            {value}
          </td>
        );
      })}
    </tr>
  );
};
