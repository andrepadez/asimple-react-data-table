import React from 'react'
import { arrayOf, string, bool, func } from 'prop-types'

const TableHead = props => (
  <thead>
    <tr>
      {props.checkboxes
        ? <th><input type="checkbox" checked={props.isCheckedAll} onChange={props.handleCheckboxChange} /></th>
        : ''}
      {props.columns.map(col => <th key={`th-${col}`}>{col}</th>)}
    </tr>
  </thead>
)

TableHead.defaultProps = {
  checkboxes: false,
  handleCheckboxChange: function noop() {}
}

TableHead.propTypes = {
  columns: arrayOf(string).isRequired,
  checkboxes: bool,
  handleCheckboxChange: func
}

export default TableHead
