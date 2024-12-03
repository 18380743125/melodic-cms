/**
 * 格式化方法
 */

/**
 * 格式化金额
 * @param num
 * @returns
 */
export const formatMoney = (num?: number | string) => {
  if (!num) return '¥0.00';
  const a = parseFloat(num.toString());
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' });
};

/**
 * 格式化数字
 * @param num
 * @returns
 */
export const formatNum = (num?: number | string) => {
  if (!num) return 0;
  const a = num.toString();
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
};

/**
 * 格式化日期
 * @param date
 * @param rule
 * @returns
 */
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date();
  if (date) curDate = date;
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString().replaceAll('/', '-');
  if (rule === 'HH:mm:ss') return curDate.toLocaleTimeString().replaceAll('/', '-');
  return curDate.toLocaleString().replaceAll('/', '-');
};

/**
 * 格式化日期
 * @param date
 * @param rule
 * @returns
 */
export const formatDate = (date?: Date | string, rule?: string) => {
  let curDate = new Date();
  if (date instanceof Date) curDate = date;
  else if (date) curDate = new Date(date);

  let fmt = rule || 'yyyy-MM-dd HH:mm:ss';
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString());
  type OType = {
    [key: string]: number;
  };
  const O: OType = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  };
  for (const k in O) {
    const val = O[k].toString();
    fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length));
  }
  return fmt;
};

/**
 * 隐藏手机号
 * @param mobile 手机号
 */
export const formatMobile = (mobile?: number) => {
  if (!mobile) return '-';
  const phone = mobile.toString();
  return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
};

/**
 * 格式化空文本
 */
export function formatNull(str: string | undefined) {
  if (str === null || str === '' || str === undefined) {
    return '——';
  }
  return str;
}

/**
 * 格式化所在地区
 */
export function formatArea(province?: string, city?: string, country?: string) {
  let result = ``;
  if (province) {
    result += province;
  }
  if (city) {
    result += '/' + city;
  }
  if (country) {
    result += '/' + country;
  }
  return result === '' ? '——' : result;
}
