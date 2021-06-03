import Configuration, {
  Font,
  Language,
  OptionalConfigs,
  OptionalConfigsKeys,
  Pattern,
  Theme
} from './types/configType'
import QueryType from './types/queryType'

type Key = keyof typeof OptionalConfigsKeys

const DEFAULT_CONFIG: Configuration = {
  title: '',
  logo: '',
  font: Font.inter,
  theme: Theme.light,
  pattern: Pattern.plus,
  language: Language.None
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
    logo: query.logo || DEFAULT_CONFIG.logo,
    font: query.font || DEFAULT_CONFIG.font,
    pattern: query.pattern || DEFAULT_CONFIG.pattern,
    theme: query.theme || DEFAULT_CONFIG.theme,
    language: (query.language as Language) || DEFAULT_CONFIG.language
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
