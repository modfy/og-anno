import React, { useState } from 'react'

import { Row, Col } from 'antd'

import ConfigType from '../../common/types/configType'
import ConfigContext from '../contexts/ConfigContext'
import { DEFAULT_CONFIG } from '../../common/configHelper'

import Config from './configuration/config'
import Preview from './preview/preview'

const MainWrapper = () => {
  const [config, setConfig] = useState<ConfigType>(DEFAULT_CONFIG)

  const setConfigHelper = (config: ConfigType) => {
    setConfig(config)
  }

  return (
    <ConfigContext.Provider value={{ config, setConfig: setConfigHelper }}>
      <Row className="main-wrapper">
        <Col span={24} order={2} xl={{ span: 12, order: 1 }}>
          <Config />
        </Col>
        <Col span={24} order={1} xl={{ span: 12, order: 2 }}>
          <Preview />
        </Col>
      </Row>

      <style jsx global>{`
        .main-wrapper {
          padding-top: 50px;
          padding-bottom: 50px;
        }

        @media (max-width: 640px) {
          .main-wrapper {
            padding-top: 30px;
            padding-bottom: 50px;
          }
        }
      `}</style>
    </ConfigContext.Provider>
  )
}
export default MainWrapper
