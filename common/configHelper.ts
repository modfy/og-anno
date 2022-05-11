import Configuration, {
  Font,
  OptionalConfigs,
  OptionalConfigsKeys,
  Type
} from './types/configType'
import QueryType from './types/queryType'

type Key = keyof typeof OptionalConfigsKeys

const DEFAULT_CONFIG: Configuration = {
  title: '',
  bgImage: 'https://editor.modfy.video/api/thumbnail/default',
  font: Font.inter,
  type: Type.audio
}

const getOptionalConfig = () => {
  const newConfig: OptionalConfigs = {
    description: {
      state: false,
      editable: true,
      value: ''
    }
  }
  return newConfig
}

const mergeConfig = (query: QueryType): Configuration | null => {
  const config: Configuration = {
    title: query.title,
    bgImage: query.bgImage || DEFAULT_CONFIG.bgImage,
    font: query.font || DEFAULT_CONFIG.font,
    type: query.type || DEFAULT_CONFIG.type
  }
  const optionalConfig = getOptionalConfig()

  if (optionalConfig) {
    Object.assign(config, optionalConfig)
    for (const key in query) {
      if (key in OptionalConfigsKeys) {
        Object.assign(config[key as Key], {
          state: query[key as Key] === '1'
        })
        if (config[key as Key]?.editable) {
          const editableValue = query[`${key}Editable` as keyof typeof query]
          if (editableValue) {
            Object.assign(config[key as Key], { value: editableValue })
          }
        }
      }
    }
  }

  return config
}

export { DEFAULT_CONFIG, getOptionalConfig, mergeConfig }
