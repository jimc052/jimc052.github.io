

class Crypt {
	constructor(arg) {
		if(typeof arg == "undefined"){
			let aes = localStorage.AES();
			this.key = CryptoJS.enc.Utf8.parse(aes.key);
			this.iv = CryptoJS.enc.Utf8.parse(aes.iv);
		} else {
			this.key = CryptoJS.enc.Utf8.parse(arg.key);
			this.iv = CryptoJS.enc.Utf8.parse(arg.iv);
		}
		this.key = (this.key + "0123456789ABCDEF").substr(0, 16);
		this.iv = (this.iv + "0123456789ABCDEF").substr(0, 16);
	}
	encrypt(data) {
		var encrypted = CryptoJS.AES.encrypt(data, this.key, {
			iv: this.iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	}
	decrypt(data){
		var decrypted = CryptoJS.AES.decrypt(data, this.key, {
				iv: this.iv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
		});
		// 转换为 utf8 字符串
		return CryptoJS.enc.Utf8.stringify(decrypted);
	}
}