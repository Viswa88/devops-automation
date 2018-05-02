import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Select } from 'antd';
const Option = Select.Option;

class TimeRangeFilter extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(value) {
    this.props.onFilterUpdate(
      Object.assign({}, this.props.filters, { timeRange: value })
    );
  }
  render() {
    return (
      <div>
        <div className="sd-filter-title">Period</div>
        <div className="sd-filter-control">
          <Select
            defaultValue="15"
            style={{ width: 150 }}
            onChange={this.onClick}
          >
            <Option value="5">
              <Link to="?timerange=5">Past 5 Minutes</Link>
            </Option>
            <Option value="10">
              <Link to="?timerange=10">Past 10 Minutes</Link>
            </Option>
            <Option value="15">
              <Link to="?timerange=15">Past 15 Minutes</Link>
            </Option>
            <Option value="30">
              <Link to="?timerange=30">Past 30 Minutes</Link>
            </Option>
            <Option value="60">
              <Link to="?timerange=60">Past 1 Hour</Link>
            </Option>
            <Option value="today">
              <Link to="?timerange=today">Today</Link>
            </Option>
            <Option value="1440">
              <Link to="?timerange=1440">Past 24 Hours</Link>
            </Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default TimeRangeFilter;
