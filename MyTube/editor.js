Vue.component('yt-editor', { 
	template:  `
    <modal v-model="visible" class-name="vertical-center-modal" 
        fullscreen style="overflow: hidden;" id="dlgEdit">
      <Tabs type="card" id="tabs" value="原稿" @on-click="onChangeTabPane">
        <TabPane :closable="false" label="基本資料" :style="{height: height + 'px'}"  name="0">
          <textarea style="width: 100%; height: calc(100% - 25px); font-size: 18px; padding: 10px;"
          v-model="title" />
        </TabPane>

				<TabPane :closable="false" label="題目" :style="{height: height + 'px'}" name="1">
          <textarea style="width: 100%; height: calc(100% - 25px); font-size: 18px; padding: 10px;"
          v-model="topic" />
        </TabPane>

				<TabPane :closable="false" label="位置" :style="{height: height + 'px'}"  name="2">
          <textarea style="width: 100%; height: calc(100% - 25px); font-size: 18px; padding: 10px;"
          v-model="position" id="editor_position" />
        </TabPane>

				<TabPane :closable="false" label="原稿" :style="{height: height + 'px'}"  name="原稿">
          <textarea style="width: 100%; height: calc(100% - 25px); font-size: 18px; padding: 10px; background-color: #eee;"
          v-model="source" readonly />
        </TabPane>

				<div  slot="extra"  style="display: flex; flex-direction: row;">
					<div id="minutes" style="user-select: text;" />
					<a id="linkMP3" href="" target="_blank" style="margin: 0px 10px;">下載 MP3</a>
					<a id="linkYouTube" href="" target="_blank" style="margin-right: 10px;">
						<Icon type="logo-youtube" size="24"  />
					</a>
				</div>
				
      </Tabs>

      <div slot="header" style="height: 1px; bacground-color: red; overflow: hidden; visiblity: hidden;"></div>
      <div slot="footer">
				
				<Button @click="update" type="success">存檔</Button>
				<Button @click="close">關閉</Button>
      </div>
    </modal>
  `,
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		editdata: {
			type: Object,
		} ,
	},
	data() {
		return {
			title: "",
			topic: "",
			position: "",
			height: 0,
			source: "",
			isSecond: true,
		};
	},
	created(){
	},
	mounted () {
		let header = document.querySelector("#dlgEdit .ivu-modal-header");
		if(header != null) header.parentNode.removeChild(header);

		let close = document.querySelector("#dlgEdit .ivu-modal-close");
		if(close != null) close.parentNode.removeChild(close);
		window.addEventListener('keydown', this.onKeydown, false);
	},
	destroyed() {
		window.removeEventListener('keydown', this.onKeydown, false);
  },
	methods: {
		onChangeTabPane(e){
			if(e == 2){
				setTimeout(() => {
					document.querySelector("#editor_position").focus();	
				}, 300);
			}
		},
    close() {
			this.$emit('on-close');
		},
		update(){
			let json = JSON.parse(this.title);
			try {
				if(this.position.length > 0) {
					json.position = JSON.parse(this.position);
					for(let i = 0; i < json.position.length; i++) {
						json.position[i] = this.changeTimeFormat(json.position[i], true);
					}
				}
				if(this.topic.length > 0)
					json.topic = JSON.parse(this.topic);
				this.$emit("update", json);
				this.close();
			} catch (e) {
				alert(e)
			}
			
		},
		onKeydown(event){
			if(this.visible == false) return;
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			let sk = event.shiftKey, code = event.keyCode;
			let char = (event.keyCode >=48 && event.keyCode <=122) ? String.fromCharCode(event.keyCode).toUpperCase() : "";
			console.log(`metaKey: ${pk}, shiftKey: ${sk}, char: ${char}`)
			if(o.id == "editor_position") {
				if(pk && sk && char == "C") { // 切換秒數顯示格示
					this.isSecond = !this.isSecond;
					if(this.position.length > 0) {
						let position = JSON.parse(this.position), s = "";
						for(let i = 0; i < position.length; i++) {
							position[i] = this.changeTimeFormat(position[i], this.isSecond);
							s += (s.length > 0 ? ",\n" : "") + "  " + JSON.stringify(position[i])

						}
						this.position = "[\n" + s + "\n]"; 
					}
				} else if(pk && char == "I") { // 插入一列
					if(this.position.length == 0){
						this.position = `[\n  {"start": "", "end": ""}\n]`
					} else {
						let arr = this.position.split("\n");
						for(let i = arr.length - 1; i >=0; i++) {
							if(arr[i] == "]") {
								if(i > 0 && arr[i - 1].indexOf(`{`) > -1) {
									arr[i - 1] += ",";
								}
								arr.splice(i, 0, `{"start": "", "end": ""}`
								);
								break;
							}
						}
						this.position = arr.join("\n")					
					}
				} else {
					return;
				}
				// if(b == true) {
					event.preventDefault();
					event.stopImmediatePropagation();
					event.stopPropagation();				
				// }
			}
		},
		changeTimeFormat(row, isSecond) { // 切換秒數顯示格示
			if(isSecond == true) {
				if(typeof row.start == "string") {
					if(row.start.indexOf(":") > 0) {
						let arr = row.start.split(":");
						row.start = (parseInt(arr[0], 10) * 60) 
							+ parseInt(arr[1], 10);
					} else {
						row.start = parseInt(row.start, 10);
					}
				}
				if(typeof row.end == "string") {
					if(row.end.indexOf(":") > 0) {
						let arr = row.end.split(":");
						row.end = (parseInt(arr[0], 10) * 60) 
							+ parseInt(arr[1], 10);
					} else {
						row.end = parseInt(row.end, 10);
					}
				}				
			} else {
				if(typeof row.start == "number") {
					let i1 = Math.floor(row.start / 60)
					let i2 =row.start % 60;
					row.start = `${i1}:${i2}`
				}
				if(typeof row.end == "number") {
					let i1 = Math.floor(row.end / 60)
					let i2 =row.end % 60;
					row.end = `${i1}:${i2}`
				}
			}
			return row;
		}
	},
	computed: {
	},
	watch: {
		visible(value) {
			if(value == true) {
				console.log(`onKeyDown: \n
					1. 位置：
						1-1: metaKey + shiftKey + C => 切換秒數顯示格示
						1-2: metaKey + I => 插入一列
				`)
				this.isSecond = true;
				let obj = Object.assign({}, this.editdata);
				this.topic = "";
				if(Array.isArray(obj.topic)) {
					let s = "", cols = ["question", "answer", "option"];
					for(let i = 0; i < obj.topic.length; i++) {
						let s2 = "";
						let row = obj.topic[i];
						for(let j = 0; j < cols.length; j++) {
							let key = cols[j];
							if(key == "question") {
								row[key] = row[key].replace(/(?:\r\n|\r|\n)/g, '\\n')
								if(row[key].indexOf('"') > -1 && row[key].indexOf('\\"') == -1)
									row[key] = row[key].replace(/"/g, '\\"')
							}
							s2 += (s2.length > 0 ? ",\n" : "") + `  "${key}": ` 
								+ (typeof row[key] == "string" 
									? `"${row[key]}"` 
									: (Array.isArray(row[key]) 
										? JSON.stringify(row[key]) 
										: row[key]
										)
									) 
						}
						s += (s.length > 0 ? "  \n},{\n" : "") + s2 + "";
						// console.log(row["question"])
					}
					this.topic = "[{\n" + s + "\n}]";
					delete obj.topic;
				}

				this.position = "";
				if(Array.isArray(obj.position)) {
					let s = "", cols = ["start", "end"];
					for(let i = 0; i < obj.position.length; i++) {
						let s2 = "";
						let row = obj.position[i];
						for(let j = 0; j < cols.length; j++) {
							let key = cols[j];
							s2 += (s2.length > 0 ? ", " : "") + `"${key}": ` 
								+ (typeof row[key] == "string" 
									? `"${row[key]}"` 
									: (Array.isArray(row[key]) 
										? JSON.stringify(row[key]) 
										: row[key]
										)
									) 
						}
						s += (s.length > 0 ? ",\n" : "") + "{"+ s2 + "}";
					}
					this.position = "[\n" + s + "\n]";
					
					let minutes = document.getElementById("minutes");
					if(obj.position.length > 0) {
						minutes.innerText = toTimes(obj.position[0].start) + " ~ " + 
							toTimes(obj.position[obj.position.length - 1].end);
					}
					delete obj.position;
				}

				let s = "";
				for(let key in obj) {
					s += (s.length > 0 ? ",\n" : "") + `  "${key}": ` 
						+ (typeof obj[key] == "string" ? `"${obj[key]}"` : obj[key]) 
				}
				this.title = "{\n" + s + "\n}";
				this.source = "{\n" + s; 
				if(this.topic.length > 0) {
					this.source += `,\n  "topic": `;
					this.topic.split("\n").forEach((el, index) => {
						if(el.trim().length == 0) return;
						if(index == this.topic.length - 1) 
							this.source += "  ";
						else if(index > 0)
							this.source += "    ";
						this.source += el + (index == this.topic.length - 1 ? "" : "\n")
					})
				}
				if(this.position.length > 0) {
					this.source += `,\n  "position": `;
					this.position.split("\n").forEach((el, index) => {
						if(el.trim().length == 0) return;
						if(index == this.position.length - 1) 
							this.source += "  ";
						else if(index > 0)
							this.source += "    ";
						this.source += el + (index == this.position.length - 1 ? "" : "\n")
					})
				}
				this.source += "\n}";
				setTimeout(() => {
					let body = document.querySelector("#dlgEdit .ivu-modal-body");
					body.style.top = "0px";
					let h1 = body.clientHeight;
					let h2 = document.querySelector("#tabs .ivu-tabs-bar").clientHeight;
					this.height = (h1 - h2);
				}, 300);

				let link = document.getElementById("linkMP3");
				link.href = `https://www.yout.com/watch?v=${obj.id}`;
				console.log(link.href)

				link = document.getElementById("linkYouTube");
				link.href = `https://www.youtube.com/watch?v=${obj.id}`;
			} else {
				this.topic = "";
				this.title = "";
				this.position = "";
				this.source = "";
			}

			function toTimes(t) {
				let x = t + "";
				let arr = x.split(".");
				let ms = "00";
				if(arr.length == 2) {
					ms = (arr[1].length == 1 ? "0" : "") + arr[1];
					x = x.replace("." + arr[1]);
					t = parseInt(x, 10)
				}
				let s = (t % 60).toFixed(0);
				t = t - s;
				let m = (t / 60).toFixed(0);
				return (m < 10 ? '0' : '') + m + ":" + (s < 10 ? '0' : '') + s + ":" + ms;
			}
		}
	}
});