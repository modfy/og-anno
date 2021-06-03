import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Col, Form, Row, Space } from 'antd'
import ConfigContext from '../../contexts/ConfigContext'

import ConfigType, {
  Theme,
  Pattern,
  Font,
  RequiredConfigsKeys,
  Language
} from '../../../common/types/configType'

import { getOptionalConfig } from '../../../common/configHelper'

import SelectWrapper from './selectWrapper'
import CheckBoxWrapper from './checkBoxWrapper'
import InputWrapper from './inputWrapper'
import TextAreaWrapper from './textAreaWrapper'

const Config = () => {
  const router = useRouter()

  const { config, setConfig } = useContext(ConfigContext)

  const handleChanges = (changes: { value: any; key: keyof ConfigType }[]) => {
    let newConfig: ConfigType = { ...config }
    const urlParams = router.query

    changes.forEach(({ value, key }) => {
      const currentValue = newConfig[key] ? newConfig[key] : {}
      if (value.required === true) {
        newConfig = { ...newConfig, [key]: value.val }
      } else {
        newConfig = { ...newConfig, [key]: { ...currentValue, ...value } }
      }

      if (value && value.state === true && value.editable) {
        urlParams[key] = '1'
        urlParams[`${key}Editable`] = value.value
      } else if (value && value.state === true) {
        urlParams[key] = '1'
      } else if (value && value.required === true) {
        urlParams[key] = value.val
      } else {
        urlParams[key] = '0'
      }

      if (!urlParams[key] || urlParams[key] === '0') {
        delete urlParams[key]
      }
    })

    router.push(
      `${window.location.pathname}?${Object.entries(urlParams)
        .sort()
        .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
        .join('&')}`,
      undefined,
      { shallow: true }
    )
  }

  const handleChange = (value: any, key: keyof ConfigType) => {
    handleChanges([{ value, key }])
  }

  useEffect(() => {
    const handleRouteChange = (asPath: string) => {
      const newConfig = getOptionalConfig()
      if (newConfig) {
        const params = new URLSearchParams(asPath.split('?')[1])

        Array.from(params.keys()).forEach(stringKey => {
          const key = stringKey as keyof ConfigType
          if (key in newConfig) {
            const query = params.get(key)
            const currentConfig = newConfig[key as keyof typeof newConfig]
            const newChange = {
              state: query === '1'
            }
            if (currentConfig?.editable) {
              const editableValue = params.get(`${key}Editable`)
              if (editableValue != null) {
                Object.assign(newChange, {
                  value: editableValue
                })
              }
            }

            Object.assign(newConfig[key as keyof typeof newConfig], newChange)
          } else if (key in RequiredConfigsKeys) {
            const query = params.get(key)
            if (query != null) {
              const newChange = {
                [key]: query
              }

              Object.assign(newConfig, newChange)
            }
          }
        })
        setConfig({ ...config, ...newConfig })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    handleRouteChange(router.asPath)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Row align="middle">
        <Col span={20} offset={4}>
          <Form>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <SelectWrapper
                title="Theme"
                keyName="theme"
                map={Object.keys(Theme).map(key => ({
                  key,
                  label: (Theme as any)[key]
                }))}
                value={config.theme}
                defaultValue={Theme.light}
                handleChange={handleChange}></SelectWrapper>
              <InputWrapper
                keyName="title"
                title="Title"
                placeholder="The title you want to set"
                value={config.title || ''}
                handleChange={handleChange}
              />
              <SelectWrapper
                title="Font"
                keyName="font"
                map={Object.keys(Font).map(key => ({
                  key,
                  label: (Font as any)[key]
                }))}
                value={config.font}
                defaultValue={Font.inter}
                handleChange={handleChange}
              />
              <SelectWrapper
                title="Background Pattern"
                keyName="pattern"
                map={Object.keys(Pattern).map(key => ({
                  key,
                  label: (Pattern as any)[key]
                }))}
                value={config.pattern}
                defaultValue={Pattern.plus}
                handleChange={handleChange}
              />
              <InputWrapper
                title="Logo"
                keyName="logo"
                placeholder={'Enter logo url'}
                value={config.logo}
                handleChange={handleChange}
              />

              <SelectWrapper
                title="Devicons"
                keyName="language"
                map={Object.keys(Language).map(key => ({
                  key,
                  label: (Language as any)[key]
                }))}
                value={config.language || Language.None}
                defaultValue={Language.GitHub}
                handleChange={handleChange}
              />
              <Row>
                <div className="text-area-wrapper">
                  <CheckBoxWrapper
                    title="Description"
                    keyName="description"
                    checked={config.description?.state}
                    handleChange={handleChange}
                  />
                  <TextAreaWrapper
                    keyName="description"
                    value={config.description?.value || ''}
                    defaultValue={''}
                    handleChange={handleChange}
                    disabled={!config.description?.state}
                  />
                </div>
              </Row>
            </Space>
          </Form>
        </Col>
      </Row>

      <style jsx>{`
        .text-area-wrapper {
          display: flex;
          align-items: center;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default Config
