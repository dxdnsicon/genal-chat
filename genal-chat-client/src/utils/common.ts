import Vue from 'vue';
import { AxiosResponse } from 'axios';
import CryptoJS from 'crypto-js';
import remakeChat from './strategy';

// 处理所有后端返回的数据
export function processReturn(res: AxiosResponse<ServerRes>) {
  // code 0:成功 1:错误 2:后端报错
  let { code, msg, data } = res.data;
  if (code) {
    Vue.prototype.$message.error(msg);
    return;
  }
  if (msg) {
    Vue.prototype.$message.success(msg);
  }
  return data;
}

// 判断一个字符串是否包含另外一个字符串
export function isContainStr(str1: string, str2: string) {
  return str2.indexOf(str1) >= 0;
}

/**
 * 屏蔽词
 * @param text 文本
 */
export function parseText(text: string) {
  return remakeChat(text);
}

/**
 * 判断是否URL
 * @param text 文本
 */
export function isUrl(text: string) {
  // 解析网址
  const UrlReg = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
  return UrlReg.test(text);
}

/**
 * 消息时间格式化
 * @param time
 */
export function formatTime(time: number) {
  let moment = Vue.prototype.$moment;
  // 大于昨天
  if (
    moment()
      .add(-1, 'days')
      .startOf('day') > time
  ) {
    return moment(time).format('M/D HH:mm');
  }
  // 昨天
  if (moment().startOf('day') > time) {
    return '昨天 ' + moment(time).format('HH:mm');
  }
  // 大于五分钟不显示秒
  if (new Date().valueOf() > time + 300000) {
    return moment(time).format('HH:mm');
  }
  return moment(time).format('HH:mm:ss');
}

export function getParam(name: string) {
  var u = location.href.split('#')[0]; //去掉hash

  var m = u.match(new RegExp('(\\?|&)' + name + '=(.*?)(#|&|$)', 'i'));
  return decodeURIComponent(m ? m[2] : '');
}

/**
 * 群名/用户名校验
 * @param name
 */
export function nameVerify(name: string): boolean {
  let nameReg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  if (name.length === 0) {
    Vue.prototype.$message.error('请输入名字');
    return false;
  }
  if (!nameReg.test(name)) {
    Vue.prototype.$message.error('名字只含有汉字、字母、数字和下划线 不能以下划线开头和结尾');
    return false;
  }
  if (name.length > 9) {
    Vue.prototype.$message.error('名字太长');
    return false;
  }
  return true;
}

/**
 * 密码校验
 * @param password
 */
export function passwordVerify(password: string): boolean {
  const passwordReg = /^\w+$/gis;
  if (password.length === 0) {
    Vue.prototype.$message.error('请输入密码');
    return false;
  }
  if (!passwordReg.test(password)) {
    Vue.prototype.$message.error('密码只含有字母、数字和下划线');
    return false;
  }
  if (password.length > 9) {
    Vue.prototype.$message.error('密码太长');
    return false;
  }
  return true;
}

export function formateTime(time: any, fmt: string | 'timestamps' = 'yyyy-MM-dd hh:mm:ss') {
  if (time instanceof Date) {
    time = time;
  } else if (!isNaN(time / 1)) {
    if (`${time}`?.length === 10) {
      time = +time * 1000;
    } else {
      time = +time;
    }
  } else if (`${time}`.indexOf('-') > -1) {
    time = time.replace(/-/g, '/');
  }

  const date = new Date(time);
  if (fmt === 'timestamps') {
    return +date;
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      // @ts-ignore
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
    }
  }
  return fmt;
}
const SECRET_KEY = CryptoJS.enc.Utf8.parse('sakdaldjqw12213');
const SECRET_IV = CryptoJS.enc.Utf8.parse('asldkasdljo');

const day = CryptoJS.MD5(formateTime(new Date(), 'yyyyMMdd') as string).toString();
console.log('day', day, formateTime(new Date(), 'yyyyMMdd'));
const SECRET_KEY_DAY = CryptoJS.enc.Utf8.parse(day);
const SECRET_IV_DAY = CryptoJS.enc.Utf8.parse(day);
// 加密
export const encrypt = (plaintext: string, isDay = false): string => {
  const dataHex = CryptoJS.enc.Utf8.parse(encodeURIComponent(plaintext));
  const encrypted = CryptoJS.DES.encrypt(dataHex, isDay ? SECRET_KEY_DAY : SECRET_KEY, {
    iv: isDay ? SECRET_IV_DAY : SECRET_IV,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
};

// 解密
export const decrypt = (encryptText: string, isDay = false): string => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(encryptText);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.DES.decrypt(str, isDay ? SECRET_KEY_DAY : SECRET_KEY, {
    iv: isDay ? SECRET_IV_DAY : SECRET_IV,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decodeURIComponent(decryptedStr.toString());
};

(window as any)['encrypt'] = encrypt;
(window as any)['decrypt'] = decrypt;
