/**
 * 环境配置
 */

type ENV = 'dev' | 'prod'

const env = (document.documentElement.dataset.env as ENV) || 'prod'

interface ConfigProperties {
  baseUrl: string
  assetUrl: string
}

interface Config {
  dev: ConfigProperties
  prod: ConfigProperties
}

const config: Config = {
  dev: {
    baseUrl: '',
    assetUrl: ''
  },
  prod: {
    baseUrl: '/api',
    assetUrl: ''
  }
}

// 公共配置
const commonConfig = {}

export default {
  env,
  ...config[env],
  ...commonConfig
}
