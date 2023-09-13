import * as CryptoJS from 'crypto-js';

export const AesEncrypt = (text, method) => {
    const secretKey = '$2y$16$Iz#ZDNeX4j@gTr&BdhI0yOPeP41kANk0F5cgqxB$DEfb%hxWyhrVFb';
    let result;

    if (method == "encrypt") {
        result = CryptoJS.AES.encrypt(text, secretKey).toString();
    } else if (method == "decrypt") {
        result = CryptoJS.AES.decrypt(text, secretKey).toString(CryptoJS.enc.Utf8);
    }

    return result;
}