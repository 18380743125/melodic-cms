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
        baseUrl: 'https://bingdaotiyu.com/api-new',
        assetUrl: '',
        // baseUrl: 'http://localhost:8085',
        // assetUrl: 'http://localhost:8085',
    },
    prod: {
        baseUrl: '/api',
        assetUrl: '',
    }
}

export default {
    env,
    ...config[env]
}
