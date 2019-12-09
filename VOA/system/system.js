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