class Player {
	constructor(props) {
		this.props = props;
		this.timeID = null; this.canPlay = false; this.state = "stop"; this.repeat = 0;
		this.LRCs = []; this.paragraph = 0; this.lrc = 0; this.block = props.block;
		this.currentRange = null;
		let self = this;
		self.audio = new Audio();

		self.audio.addEventListener("loadstart", function() { 
			self.onStateChange("loadStart");
		}, true);
		self.audio.addEventListener("canplay", function() {
			// console.log("canplay: " + self.canPlay)
			if(self.canPlay == false) {
				self.onStateChange("canPlay");
				self.canPlay = true;
				if(self._setting.autoPlay == true) {
					setTimeout(()=> { 
						if(self.audio.src.length > 0 && self.canPlay == true) 
							self.play() 
					}, 1000);
				}				
			}
		}, true);
		self.audio.addEventListener("durationchange", function() { 
			self.onStateChange("durationChange", self.audio.duration);
			// self.$emit('onPlayState', "durationchange", self.duration);
		}, true);
		self.audio.addEventListener("timeupdate", function() {
			// console.log("timeupdate: " + self.audio.currentTime)
		}, true);

		self.audio.addEventListener("ended", function() {
			this.onStateChange("sectionChange", -1);
			self.state = "pendding";
			self.intervalID = setTimeout(()=>{
				if(self.state == "pendding") {
					self.beep.play();
					self.intervalID = setTimeout(()=>{
						self.assignParagraph(0);
					}, 3000);
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
		// console.log("play: " + inform)
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
		this.timeID = setInterval(() => {
			this.onStateChange("timeUpdate", this.audio.currentTime);
			let time = this.audio.currentTime;
			let range = this.currentRange;
			let self = this;
			if(range == null){
				if(this.block.length > 0)
					this.paragraph = this.block[0];
				else
					this.paragraph = 0;
				this.currentRange = this.LRCs[this.paragraph][0];
				this.audio.currentTime = this.currentRange.start
				this.lrc = 0;
				this.onStateChange("sectionChange", this.paragraph, 0);
			} else if(time < range.start || time >= range.end){
				if(this._setting.repeat > 0 && time >= range.end) {
					let start = this.block.length > 0 ? this.block[0] : 0;
					let end = this.block.length > 0 ? this.block[1] : this.LRCs.length - 1;
					clearInterval(this.timeID);
					this.timeID = null;
					this.audio.pause();
					// console.log(this.paragraph + "-" + this.lrc + ": " + this.repeat + "/" + this._setting.repeat + ": " + (new Date()).toString("MM:ss.ms"))
					// console.log(this._setting.interval)
					let _block = this.paragraph, _lrc = this.lrc;
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
					} else {
						this.repeat = 0;
						if(_lrc == this.LRCs[_block].length - 1) {
							_lrc = 0;
							_block++;
							if(_block >= end + 1)
								_block = start;
						} else {
							_lrc++;
						}
					}

					if((_block == start && _lrc == 0) || (this.repeat == 0 && this._setting.repeat >= 5)) {
						this.intervalID = setTimeout(()=>{
							if(this.state == "pendding") {
								this.beep.play();
								waitToNext();
							}
						}, 1000);
					} else 
						waitToNext();

					function waitToNext() {						
						self.intervalID = setTimeout(()=>{ 
							if(self.state == "pendding") {
								self.lrc = _lrc;
								self.paragraph = _block;
								if(self.repeat == 0) {
									self.onStateChange("sectionChange", self.paragraph, self.lrc);
									self.currentRange = self.LRCs[self.paragraph][self.lrc];
									self.audio.currentTime = self.currentRange.start;
								}
								self.audio.play();
								self.timing();
								self.state = "play";
								delete self.intervalID;
							}
						}, 1000 * self._setting.interval);
					}
					this.state = "pendding";
				} else if(time >= range.end && this.paragraph == this.LRCs.length - 1 && this.lrc == this.LRCs[this.paragraph].length - 1) {
					this.onStateChange("sectionChange", -1);
					this.state = "pendding";
					this.currentRange = null;
					this.paragraph = 0;
					this.lrc = 0;
					this.audio.pause();
					this.intervalID = setTimeout(()=>{
						if(this.state == "pendding") {
							this.beep.play();
							this.intervalID = setTimeout(()=>{
								// this.intervalID = setTimeout(() => {
									this.assignParagraph(0);
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
							// console.log(i + "-" + j + ": " + row[j].start + "~" + row[j].end)
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
			if(this.intervalID) clearTimeout(this.intervalID);
			this.paragraph = value;
			this.lrc = 0;
			this.currentRange = this.LRCs[value][0];
			this.audio.currentTime = this.currentRange.start;
			if(this.state == "pendding" || play == true) {
				clearTimeout(this.timeID);
				this.state = "play";
				this.audio.play();
				this.timing();
				delete this.intervalID;
				this.onStateChange("play");
			} 
			this.onStateChange("sectionChange", value, 0);
		}
	}

	gotoParagraph(value){
		this.repeat = 0;
		let start = this._setting.repeat > 0 && this.block.length > 0 ? this.block[0] : 0;
		let end = this._setting.repeat > 0 && this.block.length > 0 ? this.block[1] : this.LRCs.length - 1;
		if(value == "first") {
			this.paragraph = start;
			this.lrc = 0;
		} else if(value == "end") {
			this.paragraph = end;
			this.lrc = 0;
		} else if(!isNaN(value)) {
			if(value + this.paragraph < 0)
				return;
			else if(value + this.paragraph >= end + 1)
				this.paragraph = start;
			else {
				this.paragraph = value + this.paragraph;
			}
			this.lrc = 0;
		}
		if(this.intervalID) clearTimeout(this.intervalID);
		this.currentRange = this.LRCs[this.paragraph][this.lrc]
		this.audio.currentTime = this.LRCs[this.paragraph][this.lrc].start;
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
				rows = this.LRCs[block];
				lrc = 0;
			}
		}
		this.paragraph = block;
		this.lrc = lrc;
		this.currentRange =  this.LRCs[block][lrc];
		this.audio.currentTime = this.LRCs[block][lrc].start;
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