import React, { Component } from 'react'
import { Row, Col, Layout, message } from 'antd'
import FlipMove from 'react-flip-move'
import SunLayout from '../Layout'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { OverviewSocket, clientDisconnect } from '../Sockets'
import AnimationCount from 'react-count-animation'
import 'react-count-animation/dist/count.min.css'
import moment from 'moment'

const { Content } = Layout

export default class Sections extends Component {
  constructor (props) {
    super(props)
    clientDisconnect()
    this.state = {
      loading: true
    }
  }
  onFilterUpdate (filterValue) {
    console.log(filterValue)
    this.setState({
      loading: true
    })
    this.filters = filterValue
    // this.overviewSocketObj.reload(this.filters)
  }
  componentDidMount () {
    this.setState({
      loading: false,
      pageViewsPerVisitorTodaySettings: {
        start: 0,
        count: 1000,
        duration: 3000,
        decimals: 2,
        useGroup: true,
        animation: 'up'
      },
      pageViewsTodaySettings: {
        start: 0,
        count: 10000,
        duration: 3000,
        useGroup: true,
        animation: 'up'
      },
      hasData: true
    })
  }
  render () {
    if (this.state.loading) {
      return (
        <div>
          <SunLayout onFilterUpdate={this.onFilterUpdate} page={this.props} filters={this.filters} />
          <Content className='loader' />
        </div>
      )
    }
    return (
      <div>
        <SunLayout onFilterUpdate={this.onFilterUpdate} filters={this.filters} />
        <Content>
          <Row className='sd-sections-chart'>
        Chart
        </Row>
          <Row className='sd-sections-kpi'>
            <Row className='flex'>
              <Col className='sd-kpi-box'>
                <div className='sd-kpi-metric-value sd-numerics'>
                  <AnimationCount {...this.state.pageViewsTodaySettings} />
                </div>
                <div className='sd-kpi-metric-name'>Total Page Views</div>
              </Col>
              <Col className='sd-kpi-box'>
                <div className='sd-kpi-metric-value sd-numerics'>
                  <AnimationCount {...this.state.pageViewsPerVisitorTodaySettings} />
                </div>
                <div className='sd-kpi-metric-name'>Page Views Per Visit</div>
              </Col>
            </Row>

          </Row>
          <Row className='sd-sections-table'>
Tabel
        </Row>
        </Content>
      </div>
    )
  }
}
