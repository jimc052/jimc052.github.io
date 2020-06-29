class Player {
	constructor(props) {
		this.props = props;
		this.timeID = null; this.canPlay = false; this.state = "stop"; this.repeat = 0;
		this.LRCs = []; this.paragraph = 0; this.lrc = 0; this.block = props.block;
		this.currentRange = null;
		let self = this;
		self.audio = new Audio();
		this.audio.autoplay = false;
		self.audio.addEventListener("loadstart", function() { 
			self.onStateChange("loadStart");
		}, true);
		self.audio.addEventListener("canplay", function() {
			// console.log("canplay: " + self.canPlay + "; " + (new Date()))
			if(self.canPlay == false) {
				self.audio.autoplay = false;
				self.onStateChange("canPlay");
				self.canPlay = true;
				if(self._setting.autoPlay == true) {
					setTimeout(()=> { 
						if(self.audio.src.length > 0 && self.canPlay == true) 
							self.play() 
					}, 1000);
				}				
			}
			self.audio.removeEventListener("canplay", null)
		}, true);
		self.audio.addEventListener("durationchange", function() { 
			if(self.canPlay == false)
				self.onStateChange("durationChange", self.audio.duration);
				self.audio.removeEventListener("durationchange", null)
		}, true);
		self.audio.addEventListener("timeupdate", function() {
			// console.log("timeupdate: " + self.audio.currentTime)
		}, true);

		self.audio.addEventListener("ended", function() {
			self.onStateChange("sectionChange", -1);
			self.state = "pendding";
			self.currentRange = null;
			// self.paragraph =  self.block.length > 0 ? self.block[0] : 0;
			// self.lrc = 0;
			self.audio.pause();
			self.intervalID = setTimeout(()=>{
				if(self.state == "pendding") {
					self.beep.play();
					self.intervalID = setTimeout(()=>{
						self.assignParagraph(0);
					}, 5000);
				}
			}, 1000);
		}, true);

		this.beep = new Audio("./mp3/beep.mp3");
		this.beep.autoplay = false;
		this.beep.addEventListener("loadstart", function() { 
		}, true);
		this.beep.addEventListener("canplay", function() { 
		}, true);
		this.beep.volume = 0.7;
	}

	play(inform){
		this.repeat = 0;
		if(this.canPlay == false) return;
		try {
			this.audio.playbackRate = this._setting.rate;
			this.audio.play();
			this.state = "play";
			if(typeof inform == "undefined")
				this.onStateChange("play");
			this.timing();			
		} catch (e) {
			console.log(e)
		}
	}

	timing(){
		clearTimeout(this.timeID);
		let self = this;
		this.timeID = setInterval(() => {
			this.onStateChange("timeUpdate", this.audio.currentTime);
			let time = this.audio.currentTime;

			let range = this.currentRange;
			if(range == null){
				if(this.block.length > 0)
					this.paragraph = this.block[0];
				else
					this.paragraph = 0;
				let arr = this.LRCs[this.paragraph];
				this.currentRange = Object.assign({}, arr[0]);
				if(this._setting.range == "paragraph")
					this.currentRange.end = arr[arr.length - 1].end;

				this.audio.currentTime = this.currentRange.start;
				this.lrc = 0;
				this.onStateChange("sectionChange", this.paragraph, 0);
			} else if(time < range.start || time >= range.end){ // 時間到
				if(this._setting.repeat > 0 && time >= range.end) {
					let start = this.block.length > 0 ? this.block[0] : 0;
					let end = this.block.length > 0 ? this.block[1] : this.LRCs.length - 1;
					clearInterval(this.timeID);
					this.timeID = null;
					this.audio.pause();
					// console.log(this.paragraph + "-" + this.lrc + ": " + this.repeat + "/" + this._setting.repeat + ": " + (new Date()).toString("MM:ss.ms"))
					// console.log(this._setting.interval)
					let _block = this.paragraph, _lrc = this.lrc, beep = false;
					if(this.repeat < this._setting.repeat - 1) {
						this.audio.currentTime = range.start;
						this.repeat++;
						this.onStateChange("repeat", this.repeat);
				  } else if(this._setting.interrupt == true) {
						this.repeat = 0;
						this.onStateChange("interrupt");
						this.state = "pendding";
						this.intervalID = setTimeout(()=>{
							if(this.state == "pendding") {
								this.beep.play();
							} 
						}, 1000);
						this.onStateChange("repeat", this.repeat);
						return;
					} else if(this._setting.range == "paragraph") {
						this.repeat = 0;
						_lrc = 0;
						_block++;
						if(_block >= end + 1){
							_block = start;
						}
						beep = true;
					} else {
						this.repeat = 0;
						if(_lrc == this.LRCs[_block].length - 1) {
							_lrc = 0;
							_block++;
							if(_block >= end + 1){
								_block = start;
								beep = true;
							}
						} else {
							_lrc++;
						}
					}
	
					if(beep == true || (this.repeat == 0 && this._setting.repeat >= 5)) {
						this.intervalID = setTimeout(()=>{
							if(this.state == "pendding") {
								this.beep.play();
								waitToNext();
							}
						}, 1000);
					} else 
						waitToNext();

					function waitToNext() {
						let timeout = 1000 * (self._setting.interval > 0 
							? self._setting.interval
							: (range.end - range.start) * Math.abs(self._setting.interval)
						);
						// console.log("interval: " + (timeout / 1000) + " second")

						self.intervalID = setTimeout(()=>{ 
							if(self.state == "pendding") {
								self.lrc = _lrc;
								self.paragraph = _block;
								if(self.repeat == 0) {
									self.onStateChange("sectionChange", self.paragraph, self.lrc);
									if(self._setting.range == "paragraph"){
										let arr = self.LRCs[self.paragraph];
										self.currentRange = Object.assign({}, arr[0]);
										self.currentRange.end = arr[arr.length - 1].end;
									} else {
										self.currentRange = self.LRCs[self.paragraph][self.lrc];
									}
									self.audio.currentTime = self.currentRange.start;
								}
								self.audio.play();
								self.timing();
								self.state = "play";
								delete self.intervalID;
							}
						}, timeout);
					}
					this.state = "pendding";
				} else if(time >= range.end && this.paragraph == this.LRCs.length - 1 && this.lrc == this.LRCs[this.paragraph].length - 1) {
					clearTimeout(this.timeID);
					this.onStateChange("sectionChange", -1);
					this.state = "pendding";
					this.currentRange = null;
					// this.paragraph = this.block.length > 0 ? this.block[0] : 0;
					// this.lrc = 0;
					this.audio.pause();
					this.intervalID = setTimeout(()=>{
						if(this.state == "pendding") {
							this.beep.play();
							this.intervalID = setTimeout(()=>{
								// this.intervalID = setTimeout(() => {
									this.assignParagraph(this.block.length > 0 ? this.block[0] : 0);
									// if(this.state == "pendding") {
									// 	this.play(false);
									// }	
								// }, 1000 * 5);
							}, 5000);
						}
					}, 1000);
					return;
				} else {
					for(let i = 0; i < this.LRCs.length; i++) {
						let row = this.LRCs[i];
						for(let j = 0; j < row.length; j++) {
							if(time >= row[j].start && time <= row[j].end) {
								this.currentRange = row[j];
								this.paragraph = i;
								this.lrc = j;
								this.onStateChange("sectionChange", i, j);
								return;
							}
						}
					}
				}
			} else if(this._setting.range == "paragraph") { // 段落模式的字幕
				for(let i = 0; i < this.LRCs.length; i++) {
					let row = this.LRCs[i];
					for(let j = 0; j < row.length; j++) {
						if(time >= row[j].start && time <= row[j].end) {
							if(j != this.lrc) {
								this.paragraph = i;
								this.lrc = j;
								this.onStateChange("sectionChange", i, j, this.repeat + 1);								
							}
							return;
						}
					}
				}
			}
		}, 100);
	}

	stop(beep){
		this.audio.pause();
		if(this.LRCs.length > 0 && this.LRCs[0].length > 0)
			this.audio.currentTime = this.LRCs[0][0].start;
		else 
			this.audio.currentTime = 0;
		this.paragraph = 0;
		this.lrc = 0;
		this.currentRange = null;
		this.state = "stop";
		this.onStateChange("stop");			
		this.repeat = 0;
		clearInterval(this.timeID);
		if(typeof beep =="boolean" && beep == true) {
			setTimeout(()=>{
				this.beep.play();
			}, 1000);
		}
	}

	pause(){
		this.audio.pause();
		this.state = "pause";
		this.onStateChange("pause");
		clearInterval(this.timeID);
		this.timeID = null;
	}

	continue(){
		console.log("continue");
		if(this.intervalID) clearTimeout(this.intervalID);
		clearTimeout(this.timeID);
		this.audio.currentTime = this.currentRange.start;
		this.state = "play";
		this.onStateChange("play");
		this.audio.play();
		this.timing();
	}

	assignParagraph(value, play) {
		this.repeat = 0;
		let start = this._setting.repeat > 0 && this.block.length > 0 ? this.block[0] : 0;
		let end = this._setting.repeat > 0 && this.block.length > 0 ? this.block[1] : this.LRCs.length - 1;
		if(value >= start && value <= end) {
			this.restart(value, 0, true);
		}
	}

	gotoParagraph(value){
		this.repeat = 0;
		let start = this._setting.repeat > 0 && this.block.length > 0 ? this.block[0] : 0;
		let end = this._setting.repeat > 0 && this.block.length > 0 ? this.block[1] : this.LRCs.length - 1;
		// console.log("value: " + value + ", " + start + " = " + end)
		let block = 0;
		if(value == "first") {
			block = start;
		} else if(value == "end") {
			block = end;
		} else if(!isNaN(value)) {
			if(value + this.paragraph < 0)
				return;
			else if(value + this.paragraph >= end + 1)
				block = start;
			else {
				block = value + this.paragraph;
			}
			if(block < start)
				return;
			else if(block > end)
				block = start;
		}
		this.restart(block, 0, true);
	}
	gotoLRC(value) {
		let start = this._setting.repeat > 0 && this.block.length > 0 ? this.block[0] : 0;
		let end = this._setting.repeat > 0 && this.block.length > 0 ? this.block[1] : this.LRCs.length - 1;

		this.repeat = 0;
		let rows = this.LRCs[this.paragraph];
		let block = this.paragraph;
		let lrc = 0;
		if(value == "first") {
			lrc = 0;
		} else if(value == "end") {
			lrc = rows.length - 1;
		}  else {
			lrc = value + this.lrc;
			if(lrc < 0) {
				block--;
				if(block > start - 1) {
					rows = this.LRCs[block];
					lrc = rows.length - 1;
				} else {
					return;
				}
			} else if(lrc >= rows.length) {
				block++;
				if(block >= end + 1) {
					block = start;
				}
				// rows = this.LRCs[block];
				lrc = 0;
			}
		}
		this.restart(block, lrc);
	}

	restart(paragraph, lrc, first) {
		this.paragraph = paragraph;
		this.lrc = lrc;
		// this.currentRange =  this.LRCs[paragraph][lrc];
		if(first == true && this._setting.range == "paragraph"){
			let arr = this.LRCs[paragraph];
			this.currentRange = Object.assign({}, arr[0]);
			this.currentRange.end = arr[arr.length - 1].end;
		} else {
			this.currentRange = this.LRCs[paragraph][lrc];
		}

		this.audio.currentTime = this.currentRange.start;
		if(this.intervalID) clearTimeout(this.intervalID);
		if(this.state == "pendding") {
			clearTimeout(this.timeID);
			this.state = "play";
			this.audio.play();
			this.timing();
			delete this.intervalID;
			this.onStateChange("play");
		} 
		this.onStateChange("sectionChange", this.paragraph, this.lrc);
	}

	get duration() {
		return this.audio.duration;
	}

	get currentTime() {
		return this.audio.currentTime;
	}

	set currentTime(value) {
		this.audio.currentTime = value;
	}

	set src(value) {
		this.audio.src = value;
	}

	set setting(value) {
		if(this.audio.playbackRate != value.rate) {
			this.audio.playbackRate = value.rate;
		}

		if(this._setting != null && this._setting.repeat != value.repeat) {
			this.repeat = 0;
		}

		this._setting = value;
	}
	get setting() {
		return this._setting;
	}
}