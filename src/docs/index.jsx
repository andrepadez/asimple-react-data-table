import React from 'react'
import { render } from 'react-dom'
import DataTable from '../../lib'
import data from './mock-data.json'
import './styles.css'

const Example = () => (
  <div className="data-tables-example">
    <h1>Related DataTables I</h1>
    <div className="table-container">
      <DataTable columns={['title', 'year']} index="imdbID" items={data.shows} />
    </div>
  </div>
)

render(<Example />, document.getElementById('app'))
