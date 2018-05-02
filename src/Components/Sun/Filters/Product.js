import React, { Component } from 'react'
import { Select } from 'antd'
const Option = Select.Option

class Product extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick (value) {
    this.props.onFilterUpdate(Object.assign({}, this.props.filters, {product: value}))
  }
  render () {
    return (
      <div>
        <div className='sd-filter-title'>Product</div>
        <div className='sd-filter-control'>
          <Select defaultValue='All' style={{ width: 180 }} onChange={this.onClick}>
            <Option value='All'>All</Option>
            <Option value='The Sun (+ IA & AMP)'>The Sun (+ IA & AMP)</Option>
            <Option value='The Scottish Sun'>The Scottish Sun</Option>
            <Option value='The Irish Sun'>The Irish Sun</Option>
            <Option value='Google AMP'>Google AMP</Option>
            <Option value='Facebook IA'>Facebook IA</Option>
          </Select>
        </div>
      </div>
    )
  }
}

export default Product
