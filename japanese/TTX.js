let idSpeak = "";
class TTX {
	static initial(){
		return new Promise(async (resolve, reject) => {
			TTX.msg = new SpeechSynthesisUtterance();
			TTX.msg.rate = 0.9;
			TTX.msg.lang = "ja-JP"; 
			// TTX.msg.lang = "en-US";
			TTX.voices = (await TTX.getVoices()).filter(el =>{
				// if(el.lang == TTX.msg.lang){
				// 	console.log(el.name)
				// }
				return el.lang == TTX.msg.lang;
			});

			resolve();
		});
	}

	static getVoices() {
		return new Promise((resolve, reject) => {
			let timer = setInterval(() => {
				if(window.speechSynthesis.getVoices().length !== 0) {
					resolve(window.speechSynthesis.getVoices());
					clearInterval(timer);
				}
			}, 10);
		})
	}

	static speak(text, index){
		// 0 Alex, 1 Fred, 2 Samantha, 女生, 3, 女生
		return new Promise(async (resolve, reject) => {
			text = text.replace(/~/g, " - ").replace(/〜/g, " - ")
			
			let arr = text.split("\n");
			for(let i = 0; i < arr.length; i++) {
				if(arr.length > 1) {
					if(arr[i].indexOf("___") > -1) {
						break;
					}
					index = arr[i].indexOf("W: ") > -1 
						? 2 : 
						(arr[i].indexOf("Q: ") > -1
							? 4: 0);
					arr[i] = arr[i].replace("M: ", " ").replace("W: ", " ").replace("Q: ", " ")
					await _speak(arr[i], index);
					await waiting(1)
				} else {
					await _speak(arr[i], index);
				}
			}
			resolve();
		});

		function _speak(text, index) {
			return new Promise((resolve, reject) => {
				TTX.stop();
				TTX.msg.voice = TTX.voices[typeof index == "undefined" ? 0 : index];
				TTX.msg.onstart = function (e) {
					// console.log("onstart")
				}

				TTX.msg.onend = function (e) {
					// console.log("onend")
					resolve();
				}
				TTX.msg.text = text;
				window.speechSynthesis.speak(TTX.msg);
			});
		}

		function waiting(sec) {
			return new Promise((resolve, reject) => {
				idWait = setTimeout(resolve, sec * 1000);
			});
		}
	}
	static stop() {
		clearTimeout(idSpeak)
		window.speechSynthesis.cancel();
	}
}