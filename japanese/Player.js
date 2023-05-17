class Player {
	static url = "https://riyutool.com/50yintuceshi/";
	static mode = "";
	constructor() {
	}

	static play(mp3) {
		return new Promise(async (resolve, reject) => {
			let audio = new Audio();
			if(mp3 == "chi") 
				mp3 = "ci";
			else if(mp3 == "tsu") 
				mp3 = "cu"
			else if(mp3 == "shi") 
				mp3 = "si"
			audio.src = Player.url + mp3 + ".mp3";
			audio.autoplay = false;
			audio.addEventListener("loadstart", () => {
				Player.mode = "start";
				// console.log("loadstart")
			}, true);
			audio.addEventListener("loadeddata", () => {
				// console.log("loadeddata")
			}, true);
			audio.addEventListener("canplay", () => {
				Player.mode = "playing";
				audio.play();
				// console.log("canplay")
			}, true);
			audio.addEventListener("durationchange", () => {
				// console.log("durationchange")
			}, true);
			audio.addEventListener("timeupdate", () => {
			}, true);
			audio.addEventListener("ended", () => {
				// console.log("ended")
				setTimeout(() => {
					Player.mode = "";
					resolve();
				}, 1000);
    	}, true);

		});
	}

	static wait(sec) {
		return new Promise(async (resolve, reject) => {
			setTimeout(() => {
				resolve()
			}, 1000 * sec);
		});
	}
}