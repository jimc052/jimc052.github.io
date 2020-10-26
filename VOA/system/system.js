String.prototype.replaceAll = function (source, newStr = "") {
	let s = this.toString().split(source).join(newStr);
	return s;
};
String.prototype.byteLength = function () {
	let len = 0, s = this.toString();
	for (let i = 0; i < s.length; i++) {
		s.charCodeAt(i) < 256 ? len++ : len += 2; // charCode大於256代表是全形字串
	}
	return len;
};
String.prototype.leftPadding = function (len, padding = "0") {
	let s = this.toString();
	while (s.byteLength() < len) {
		s = padding + s;
	}
	return s;
};

Number.prototype.toString = function (radius) {
	radius = typeof radius === "undefined" ? 0 : radius;
	if (radius > 20)
			radius = 20; // 小數位數不得大於 20
	let s = this.toFixed(radius) + '';
	let x = s.split('.');
	let x1 = x[0];
	let x2 = x.length > 1 ? '.' + x[1] : '';
	let rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
};

Number.prototype.leftPadding = function (len, padding = "0") {
	let s = this.toString(0).replaceAll(",", "");
	return s.leftPadding(len, padding);
};

Date.prototype.toString = function (format = "yyyy/mm/dd hh:MM:ss.ms") {
	let y = this.getFullYear(), m = this.getMonth() + 1;
	let d = this.getDate(), h = this.getHours();
	let M = this.getMinutes(), s = this.getSeconds();
	let ms = this.getMilliseconds();
	let r = "";
	if (typeof (format) == "undefined") {
		format = "yyyy/mm/dd hh:MM:ss.ms";
	}
	r = format.replace("yyyy", y);
	r = r.replace("yy", ("" + y).substr(2, 2));
	if (m < 10)
		m = "0" + m;
	r = r.replace("mm", m);
	if (d < 10)
		d = "0" + d;
	r = r.replace("dd", d);
	if (h < 10)
		h = "0" + h;
	r = r.replace("hh", h);
	if (M < 10)
		M = "0" + M;
	r = r.replace("MM", M);
	if (s < 10)
		s = "0" + s;
	r = r.replace("ss", s);
	if (ms < 10)
		ms = "00" + ms;
	else if (ms < 100)
		ms = "0" + ms;
	r = r.replace("ms", ms);
	return r;
};

Date.prototype.between = function (d, kind) { // 天
	// 1000*60*60*24 or 86400000 or 864e5, beween 有含當天
	let seed = 864e5; // 預設為天
	if(typeof kind == "string") {
		if(kind == "s") //秒
			seed = 1000;
		else if(kind == "M")// 分
			seed = 1000 * 60;
		else if(kind == "h")// 時
			seed = 1000 * 60 * 60;
	}

	var t = this,
		i = t.getTime() - d.getTime(),
		r = Math.ceil(i / seed);
	//console.log("between: " + i + "ms => " + r + " => " + (Math.round((i / seed) * 100) / 100));
	return r;
};

Vue.prototype.$isConnected = true;

Vue.prototype.$isLogin = function () {
	return FireStore.login;
}

Vue.prototype.$yahoo = function (word) {
	if(word.indexOf("(") > -1) {
		word = word.substr(0, word.indexOf("("))
	}
	window.open('https://tw.dictionary.search.yahoo.com/search?p=' + word, "",
		"resizable=yes,toolbar=no,status=no,location=no,menubar=no,scrollbars=yes"
		// + ",width=600,height=100"
	); 
}

Vue.prototype.$google = function (word) {
	if(word.indexOf("(") > -1) {
		word = word.substr(0, word.indexOf("("))
	}
	window.open('https://www.google.com.tw/#q=' + word, "",
		"resizable=yes,toolbar=no,status=no,location=no,menubar=no,scrollbars=yes"
	); // + ",width=200,height=100"
}

Vue.prototype.$open = function (url, title, setting) {
	return window.open(url, title,
		"resizable=yes,toolbar=no,status=no,location=no,menubar=no,scrollbars=yes"
		+ (typeof setting == "string" ? "," + setting : "" )
		//",width=200,height=100"
	); // + 
}

Vue.prototype.$isSmallScreen = function () {
	return document.body.clientWidth > 600 ? false : true;
}

Vue.prototype.$isAdmin = function () {
	return FireStore.login == true && (
		FireStore.mail().indexOf("jimc@") > -1 || FireStore.mail().indexOf("jimchen5342@") > -1
	) ? true : false;
}
Vue.prototype.$isLocal = function () {
	return location.href.indexOf("file:///") > -1 ? true : false;
}

Vue.prototype.$isMobile = function () {
	return this.$isFlutter() ? true : false;
}
Vue.prototype.$isFlutter = function () {
	return navigator.userAgent.indexOf("Flutter") > -1 ? true : false;
}

Vue.prototype.$checkMP3 = function (report, key) { // webview 無法讀 local resource, 所以沒用了
	return new Promise( async (success, error) => {
		this.broadcast.$on('onFlutter', onFlutter)
		function onFlutter(arg, result, token){
			if(arg != "checkMP3" || token != report + ":" + key) return;

			if(result.length > 0 && result.indexOf("not exist..") == -1) {
				// result = "file://" + result;
				success(result)
			} else {
				error(result)
			}
			this.broadcast.$off('onFlutter', onFlutter)
		}

		let obj = {func: "checkMP3", report, key, token: (new Date()).getTime()}
		Flutter.postMessage(JSON.stringify(obj));
	});
};

Vue.prototype.$toBase64 = function (path) { // webview 無法讀 local resource, 
	return new Promise( async (success, error) => {
		let _token = (new Date()).getTime();
		this.broadcast.$on('onFlutter', onFlutter);

		function onFlutter(arg, result, token){
			if(arg != "toBase64" || token != _token) return;
			if(result.length > 0) {
				result = "data:audio/mpeg;base64," + result;
				success(result)
			} else {
				error(result)
			}
			this.broadcast.$off('onFlutter', onFlutter)
		}

		let obj = {func: "toBase64", path, token: _token};
		Flutter.postMessage(JSON.stringify(obj));
	});
};

Vue.prototype.$downloadMP3 = function (report, key, url){ // 
	return new Promise( async (success, error) => {
		this.broadcast.$on('onFlutter', onFlutter)
		function onFlutter(arg, result, token){
			if(arg != "downloadMP3" || token != report + ":" + key) return;
			success(result); // "file://" + 
			this.broadcast.$off('onFlutter', onFlutter)
		}
		let obj = {func: "downloadMP3", report, key, url}
		Flutter.postMessage(JSON.stringify(obj));
	});
}

Vue.prototype.$delMP3 = function (report, key){ // 
	return new Promise( async (success, error) => {
		this.broadcast.$on('onFlutter', onFlutter)
		function onFlutter(arg, token){
			if(arg != "delMP3" || token != report + ":" + key) return;
			success()
			this.broadcast.$off('onFlutter', onFlutter)
		}
		let obj = {func: "delMP3", report, key}
		Flutter.postMessage(JSON.stringify(obj));
	});
}

Vue.prototype.$MP3 = function (report, key) { // webview 無法讀 local resource, 所以沒用了
	return new Promise( async (success, error) => {
		let url = "", urlFlutter = "";
		try {
			if(this.$isFlutter()) {
				try{
					urlFlutter = await this.$checkMP3(report, key);
				} catch(e){
					console.log("checkMP3: " + e + "....................")
				}
			}
			if(urlFlutter.length == 0) {
				url = await FireStore.downloadFileURL("VOA/" + report + 
						"/" + key + ".mp3");
				if(this.$isFlutter()) {
					try{
						url = await this.$downloadMP3(report, key, url);
					} catch (e) {
						console.log(e)
						error(e)
					}
				}			
			} else
				url = urlFlutter;
			console.log(url)
			success(url)
		} catch(err) {
			error(err)
		}
	});
}