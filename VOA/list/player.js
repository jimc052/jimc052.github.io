class Player {
	constructor(props) {
		this.props = props;
		this.timeID = null; this.canPlay = false; this.state = "stop"; this.repeat = 0;
		this.LRCs = []; this.block = 0; this.lrc = 0; 
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

		this.beep = new Audio("./mp3/beep.mp3");
		this.beep.autoplay = false;
		this.beep.addEventListener("loadstart", function() { 
		}, true);
		this.beep.addEventListener("canplay", function() { 
		}, true);
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
			if(range == null){
				this.currentRange = this.LRCs[0][0];
				this.block = 0;
				this.lrc = 0;
				this.onStateChange("sectionChange", 0, 0);
			} else if(time < range.start || time >= range.end){
				if(this._setting.repeat > 0 && time >= range.end) {
					clearInterval(this.timeID);
					this.timeID = null;
					this.audio.pause();
					// console.log(this.block + "-" + this.lrc + ": " + this.repeat + "/" + this._setting.repeat + ": " + (new Date()).toString("MM:ss.ms"))
					// console.log(this._setting.interval)
					let _block = this.block, _lrc = this.lrc;
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
							if(_block >= this.LRCs.length)
								_block = 0;
						} else {
							_lrc++;
						}
					}
				
					this.intervalID = setTimeout(()=>{ 
						if(this.state == "pendding") {
							this.lrc = _lrc;
							this.block = _block;
							if(this.repeat == 0) {
								this.onStateChange("sectionChange", this.block, this.lrc);
								this.currentRange = this.LRCs[this.block][this.lrc];
								this.audio.currentTime = this.currentRange.start;
							}
							this.audio.play();
							this.timing();
							this.state = "play";
							delete this.intervalID;
						}
					}, 1000 * this._setting.interval);
					this.state = "pendding";
				} else if(time >= range.end && this.block == this.LRCs.length - 1 && this.lrc == this.LRCs[this.block].length - 1) {
					clearInterval(this.timeID);
					this.state = "pendding";
					this.currentRange = null;
					this.block = 0;
					this.lrc = 0;
					this.audio.pause();
					this.assignBlock(0);
					// this.audio.currentTime = this.LRCs[0][0].start;
					this.intervalID = setTimeout(()=>{
						if(this.state == "pendding") {
							this.beep.play();
						} 
					}, 1000);
					setTimeout(() => {
						if(this.state == "pendding") {
							this.play(false);
						}	
					}, 1000 * 5);
					return;
				} else {
					for(let i = 0; i < this.LRCs.length; i++) {
						let row = this.LRCs[i];
						for(let j = 0; j < row.length; j++) {
							// console.log(i + "-" + j + ": " + row[j].start + "~" + row[j].end)
							if(time >= row[j].start && time <= row[j].end) {
								this.currentRange = row[j];
								this.block = i;
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
		this.block = 0;
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
		this.audio.currentTime = this.currentRange.start;
		this.state = "play";
		this.onStateChange("play");
		this.audio.play();
		this.timing();
	}

	assignBlock(value) {
		this.repeat = 0;
		if(value < this.LRCs.length) {
			if(this.intervalID) clearTimeout(this.intervalID);
			this.block = value;
			this.lrc = 0;
			this.currentRange = this.LRCs[value][0];
			this.audio.currentTime = this.currentRange.start;
			if(this.state == "pendding") {
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

	gotoBlock(value){
		this.repeat = 0;
		if(value == "first") {
			this.block = 0;
			this.lrc = 0;
		} else if(value == "end") {
			this.block = this.LRCs.length - 1;
			this.lrc = 0;
		} else if(!isNaN(value)) {
			if(value + this.block < 0)
				return;
			else if(value + this.block >= this.LRCs.length)
				this.block = 0;
			else {
				this.block = value + this.block;
			}
			this.lrc = 0;
		}
		if(this.intervalID) clearTimeout(this.intervalID);
		this.currentRange = this.LRCs[this.block][this.lrc]
		this.audio.currentTime = this.LRCs[this.block][this.lrc].start;
		if(this.state == "pendding") {
			clearTimeout(this.timeID);
			this.state = "play";
			this.audio.play();
			this.timing();
			delete this.intervalID;
			this.onStateChange("play");
		} 
		this.onStateChange("sectionChange", this.block, this.lrc);
	}
	gotoLRC(value) {
		this.repeat = 0;
		let rows = this.LRCs[this.block];
		let block = this.block;
		let lrc = 0;
		if(value == "first") {
			lrc = 0;
		} else if(value == "end") {
			lrc = rows.length - 1;
		}  else {
			lrc = value + this.lrc;
			if(lrc < 0) {
				block--;
				if(block > -1) {
					rows = this.LRCs[block];
					lrc = rows.length - 1;
				} else {
					return;
				}
			} else if(lrc >= rows.length) {
				block++;
				if(block >= this.LRCs.length) {
					block = 0;
				}
				rows = this.LRCs[block];
				lrc = 0;
			}
		}
		this.block = block;
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
		this.onStateChange("sectionChange", this.block, this.lrc);
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