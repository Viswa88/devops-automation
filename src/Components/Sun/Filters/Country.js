import React, { Component } from 'react'
import { Select } from 'antd'
const Option = Select.Option

class Country extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick (value) {
    this.props.onFilterUpdate(Object.assign({}, this.props.filters, {country: value}))
  }
  render () {
    return (
      <div>
        <div className='sd-filter-title'>Country</div>
        <div className='sd-filter-control'>
          <Select defaultValue='All' onChange={this.onClick}>
            <Option value='All'>All</Option>
            <Option value='UK'>UK</Option>
          </Select>
        </div>
      </div>
    )
  }
}

export default Country
