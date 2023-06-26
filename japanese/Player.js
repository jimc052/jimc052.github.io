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
			else if(mp3 == "cha" || mp3 == "cho" || mp3 == "chu") 
				mp3 = mp3.replace("ch", "cy");
			else if(mp3 == "sha" || mp3 == "sho" || mp3 == "shu") 
				mp3 = mp3.replace("sh", "sy");
			else if(mp3 == "tsu") 
				mp3 = "cu"
			else if(mp3 == "shi") 
				mp3 = "si"
			else if(mp3 == "ji") 
				mp3 = "zi"
			else if(mp3 == "fu") 
				mp3 = "hu"
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