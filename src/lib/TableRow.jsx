import React from 'react'
import { arrayOf, string, bool, shape, func } from 'prop-types'

const TableRow = props => {
  const { item, index, columns, checkboxes, handleCheckboxChange } = props
  const isChecked = item.$checked$ ? 'checked' : ''
  return (
    <tr>
      {checkboxes
        ? <td>
            <input data-index={item[index]} checked={isChecked} type="checkbox" onChange={handleCheckboxChange} />
          </td>
        : ''}
      {columns.map(cell => <td key={`${item[index]}-${cell}`}>{item[cell]}</td>)}
    </tr>
  )
}

TableRow.defaultProps = {
  checkboxes: false,
  handleCheckboxChange: function noop() {}
}

TableRow.propTypes = {
  item: shape().isRequired,
  columns: arrayOf(string).isRequired,
  checkboxes: bool,
  index: string.isRequired,
  handleCheckboxChange: func
}

export default TableRow
