
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
	if(format.indexOf("dd") > -1) {
		if (d < 10)
			d = "0" + d;
		r = r.replace("dd", d);		
	} else {
		r = r.replace("d", d);	
	}

	
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
	return r + "";
};

Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + days);
  return this;
}

Vue.prototype.$isDebug = function() {
	return location.href.indexOf("file:///") > -1 || location.href.indexOf("192.168") > -1 ? true : false;
}