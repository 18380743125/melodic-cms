/**
 * 手机号
 */
export const phoneRegExp = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/

/**
 * ip 地址
 */
export const ipAddressRegExp = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/

/**
 * 邮箱地址
 */
export const emailRegExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

/**
 * 身份证
 */
export const idCardRegExp = /\d{15}(\d\d[0-9xX])?/
