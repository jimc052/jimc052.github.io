
class MedialPlayer{
	constructor(props) {
		this.props = props;
		let self = this;
		this.audio = new Audio();
		this.audio.addEventListener("loadstart", props.loadstart, true);
		this.audio.addEventListener("loadeddata", props.loadeddata, true);

		// this.audio.addEventListener("canplay", function() {
		// 	// console.log("canplay: " +  (new Date()))		
		// }, true);
		this.audio.addEventListener("durationchange", function() {
			// console.log("durationChange: " + self.audio.duration + "; index: " + )
			// self.duration = self.audio.duration;
		}, true);

		// this.audio.addEventListener("timeupdate", function() {
		// 	// console.log("timeupdate: " + self.audio.currentTime)
		// }, true);

		this.audio.addEventListener("ended", props.ended, true);
	}

	init(){
		return new Promise(async (success, error) => {
			let url = await FireStore.downloadFileURL("VOA/" + this.props.report + 
						"/" + this.props.key + ".mp3");
			this.audio.src = url;
			this.audio.playbackRate = this.props.rate;
			this.audio.autoplay = false;
			success();
		});
	}

	get duration() {
		return this.audio != null && typeof this.audio.duration == "number" ? this.audio.duration : 0;
	}


	set rate(value) {
		this.audio.playbackRate = value;
	}

	get currentTime() {
		return this.audio != null && typeof this.audio.currentTime == "number" ? this.audio.currentTime : 0;
	}
	set currentTime(value) {
		if(this.audio != null)
			this.audio.currentTime = value;
	}

	play() {
		this.audio.play();
	}
	pause() {
		this.audio.pause();
	}
	

	close(){
		this.audio.pause();
		this.audio.removeEventListener("loadstart", this.props.loadstart);
		this.audio.removeEventListener("loadeddata", this.props.loadeddata);
		this.audio.removeEventListener("ended", this.props.ended);
		this.audio = null;
	}

}