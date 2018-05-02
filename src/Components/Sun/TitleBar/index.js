import React from 'react'
// import js and css modularly, parsed by babel-plugin-import
import { Row, Col } from 'antd'

const SunLayout = () => {
  return (
    <Row type='flex' justify='start' align='top'>
      <Col>
        <div className='sd-logo'>
          <a href='/sun/overview' />
        </div>
      </Col>
      <Col>
        <div className='sd-title-text'>The Sun Realtime Dashboard</div>
      </Col>
    </Row>
  )
}
export default SunLayout
