import React, { Component } from 'react'
import { arrayOf, string, bool, shape } from 'prop-types'
import TableHead from './TableHead'
import TableRow from './TableRow'

class DataTable extends Component {
  constructor(props) {
    super(props)
    if (props.columns.length === 0 && props.items.length === 0) {
      throw Error("can't create DataTable with no columns and no Items")
    }

    const columns = props.columns.length > 0 ? props.columns : Object.keys(props.items[0])

    this.state = {
      columns,
      items: this.props.items,
      searchTerm: this.props.searchTerm,
      isCheckedAll: this.props.isCheckedAll
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleSearch(ev) {
    const searchTerm = ev.target.value
    const filteredItems = this.props.items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    this.setState({ filteredItems, searchTerm })
  }

  handleCheckboxChange(ev) {
    const elem = ev.target
    const index = elem.dataset.index
    const items = this.state.filteredItems
    if (index) {
      // is single item
      const clickedItem = items.find(item => item[this.props.index] === index)
      clickedItem.$checked$ = elem.checked
    } else {
      // is select-all checkbox
      items.forEach(item => (item.$checked$ = elem.checked))
    }
    const isCheckedAll = items.every(item => item.$checked$)
    this.setState({ filteredItems: items, isCheckedAll })
  }

  render() {
    const { index, checkboxes } = this.props
    const { columns, searchTerm, isCheckedAll } = this.state
    return (
      <div>
        <input onChange={this.handleSearch} type="text" placeholder="Search" value={searchTerm} />
        <table>
          <TableHead
            columns={columns}
            checkboxes={checkboxes}
            isCheckedAll={isCheckedAll}
            handleCheckboxChange={this.handleCheckboxChange}
          />
          <tbody>
            {this.state.filteredItems.map(item => (
              <TableRow
                key={`row-${item[index]}`}
                item={item}
                index={index}
                columns={columns}
                checkboxes={checkboxes}
                handleCheckboxChange={this.handleCheckboxChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

DataTable.getDerivedStateFromProps = (nextProps, prevState) => {
  return Object.assign({}, nextProps, { filteredItems: nextProps.items, searchTerm: '', isCheckedAll: false })
}

DataTable.defaultProps = {
  id: '',
  columns: [],
  items: [],
  checkboxes: true
}

DataTable.propTypes = {
  id: string,
  columns: arrayOf(string),
  index: string.isRequired,
  items: arrayOf(shape),
  checkboxes: bool
}

export default DataTable
