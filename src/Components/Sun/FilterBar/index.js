import React, { Component } from 'react';
// import js and css modularly, parsed by babel-plugin-import
import { Row, Col } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import TimeRangeFilter from '../Filters/TimeRange';
import ProductFilter from '../Filters/Product';
import CountryFilter from '../Filters/Country';

class FilterBar extends Component {
  render() {
    return (
      <div>
        <Row
          type="flex"
          justify="start"
          align="top"
          className="sd-global-filter"
        >
          <Col className="pull sd-filter-col">
            <TimeRangeFilter
              onFilterUpdate={this.props.onFilterUpdate}
              filters={this.props.filters}
            />
          </Col>
          <Col className="sd-filter-col">
            {' '}
            <ProductFilter
              onFilterUpdate={this.props.onFilterUpdate}
              filters={this.props.filters}
            />
          </Col>
          <Col className="sd-filter-col">
            {' '}
            <CountryFilter
              onFilterUpdate={this.props.onFilterUpdate}
              filters={this.props.filters}
            />
          </Col>
          <Col className="sd-filter-col" />
        </Row>
      </div>
    );
  }
}
export default FilterBar;
