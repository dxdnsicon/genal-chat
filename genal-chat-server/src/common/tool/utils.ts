import * as CryptoJS from 'crypto-js';
/**
 * 群名/用户名校验
 * @param name
 */
export function nameVerify(name: string): boolean {
  const nameReg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  if (name.length === 0) {
    return false;
  }
  if (!nameReg.test(name)) {
    return false;
  }
  if (name.length > 9) {
    return false;
  }
  return true;
}

/**
 * 密码校验
 * @param password
 */
export function passwordVerify(password: string): boolean {
  console.log(password);
  const passwordReg = /^\w+$/gis;
  if (password.length === 0) {
    return false;
  }
  if (!passwordReg.test(password)) {
    return false;
  }
  if (password.length > 9) {
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

const day = CryptoJS.MD5(formateTime(new Date(), 'yyyyMMddhh') as string).toString();
const SECRET_KEY_DAY = CryptoJS.enc.Utf8.parse(day);
const SECRET_IV_DAY = CryptoJS.enc.Utf8.parse(day);
// 加密
export const encrypt = (plaintext: string, isDay = false): string => {
  const dataHex = CryptoJS.enc.Utf8.parse(plaintext);
  console.log('key', isDay ? SECRET_KEY_DAY : SECRET_KEY);
  const encrypted = CryptoJS.DES.encrypt(dataHex, isDay ? SECRET_KEY_DAY : SECRET_KEY, {
    iv: isDay ? SECRET_IV_DAY : SECRET_IV,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
};

// 解密
export const decrypt = (encryptText: string, isDay = false): string => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(encryptText);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  console.log('key', isDay ? SECRET_KEY_DAY : SECRET_KEY);
  const decrypt = CryptoJS.DES.decrypt(str, isDay ? SECRET_KEY_DAY : SECRET_KEY, {
    iv: isDay ? SECRET_IV_DAY : SECRET_IV,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};
