Vue.component('yt-editor', { 
	template:  `
    <modal v-model="visible" class-name="vertical-center-modal" 
        fullscreen style="overflow: hidden;" id="dlgEdit">
      <Tabs type="card" id="tabs" value="原稿">
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
          v-model="children" />
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
			children: "",
			height: 0,
			source: ""
		};
	},
	created(){
	},
	mounted () {
		let header = document.querySelector("#dlgEdit .ivu-modal-header");
		if(header != null) header.parentNode.removeChild(header);

		let close = document.querySelector("#dlgEdit .ivu-modal-close");
		if(close != null) close.parentNode.removeChild(close);
	},
	destroyed() {
  },
	methods: {
    close() {
			this.$emit('on-close');
		},
		update(){
			let json = JSON.parse(this.title);
			try {
				if(this.children.length > 0)
					json.children = JSON.parse(this.children);
				if(this.topic.length > 0)
					json.topic = JSON.parse(this.topic);
				this.$emit("update", json);
				this.close();
			} catch (e) {
				alert(e)
			}
			
		}	
	},
	computed: {
	},
	watch: {
		visible(value) {
			if(value == true) {
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

				this.children = "";
				if(Array.isArray(obj.children)) {
					let s = "", cols = ["start", "end"];
					for(let i = 0; i < obj.children.length; i++) {
						let s2 = "";
						let row = obj.children[i];
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
					this.children = "[\n" + s + "\n]";
					
					let minutes = document.getElementById("minutes");

					minutes.innerText = toTimes(obj.children[0].start) + " ~ " + 
						toTimes(obj.children[obj.children.length - 1].end);
					delete obj.children;
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
				if(this.children.length > 0) {
					this.source += `,\n  "children": `;
					this.children.split("\n").forEach((el, index) => {
						if(el.trim().length == 0) return;
						if(index == this.children.length - 1) 
							this.source += "  ";
						else if(index > 0)
							this.source += "    ";
						this.source += el + (index == this.children.length - 1 ? "" : "\n")
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

				link = document.getElementById("linkYouTube");
				link.href = `https://www.youtube.com/watch?v=${obj.id}`;
			} else {
				this.topic = "";
				this.title = "";
				this.children = "";
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