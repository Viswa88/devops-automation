import React, { Component } from 'react'
// import js and css modularly, parsed by babel-plugin-import
import { Layout, Row } from 'antd'
import TitleBar from '../TitleBar'
import NavBar from '../NavBar'
import FilterBar from '../FilterBar'
const { Header, Content } = Layout
// import FilterBar from '../FilterBar'

class SunLayout extends Component {
  render () {
    console.log(this.props)
    return (
      <Layout>
        <Header>
          <Row type='flex' justify='start' align='top'>
            <TitleBar />
          </Row>
        </Header>
        <Content>
          <Row>
            <NavBar page={(this.props.page) ? this.props.page.location : ''} />
          </Row>
          <Row>
            <FilterBar onFilterUpdate={this.props.onFilterUpdate} filters={this.props.filters} />
          </Row>
        </Content>
      </Layout>
    )
  }
}
export default SunLayout
