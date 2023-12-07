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

const SECRET_KEY = CryptoJS.enc.Utf8.parse('sakdaldjqw12213');
const SECRET_IV = CryptoJS.enc.Utf8.parse('asldkasdljo');
// 加密
export const encrypt = (plaintext: string): string => {
  const dataHex = CryptoJS.enc.Utf8.parse(plaintext);
  const encrypted = CryptoJS.DES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
};

// 解密
export const decrypt = (encryptText: string): string => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(encryptText);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.DES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};