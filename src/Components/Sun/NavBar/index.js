import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import js and css modularly, parsed by babel-plugin-import
import { Menu, Tooltip } from 'antd'

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = { current: '' }
  }

  componentDidMount () {
    this.setState({
      current: (this.props.page) ? (this.props.page.pathname.includes('sections') ? 'Sections' : 'Overview') : ''
    })
  }

  render () {
    return (
      <div>
        <Menu mode='horizontal' className='sd-nav' defaultSelectedKeys={[this.state.current]} selectedKeys={[this.state.current]}>
          <Menu.Item className='sd-nav-item' key='Overview'><Link to='/sun/overview'>Overview</Link></Menu.Item>
        </Menu>
      </div>
    )
  }
}
export default NavBar
