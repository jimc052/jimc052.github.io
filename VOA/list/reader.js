Vue.component('reader', { 
	template:  `<modal v-model="modal" class-name="vertical-center-modal" 
		  id="reader"  class="page" 
		  :fullscreen="true" :closable="false" :footer-hide="mode == 'edit'"
		  style="overflow: hidden;"
		>
		<!-- header -->
		<header-bar :title="title" slot="header" icon="md-arrow-back" @goBack="onPopState"
		>
			<Dropdown slot="right" @on-click="onClickMore($event)" style="margin-right: 10px"
				:trigger="$isSmallScreen() ? 'click' : 'hover'"
			>
				<Icon type="md-more" size="28" color="white" style="cursor: pointer; margin-left: 10px;"></Icon>
				<DropdownMenu slot="list" v-if="audio && audio.setting">
					<DropdownItem name="自動播放">
						<Icon type="md-checkmark" size="16" :style="{color: audio.setting.autoPlay == true ? '' : '#e5e5e5'}"></Icon>
						自動播放
					</DropdownItem>
					<DropdownItem name="中文" v-if="isChinese()" divided>
						<Icon type="md-checkmark" size="16" :style="{color: audio.setting.chinese == true ? '' : '#e5e5e5'}"></Icon>
						中文
					</DropdownItem>				
					<dropdown placement="right-start" v-if="! $isSmallScreen()" divided>
						<dropdown-item>字體 <icon type="ios-arrow-forward"></icon></dropdown-item>
						<dropdown-menu slot="list">
								<dropdown-item name="字1.6" :selected="audio.setting.zoom == 1.6">大</dropdown-item>
								<dropdown-item name="字1.2" :selected="audio.setting.zoom == 1.2">正常</dropdown-item>
						</dropdown-menu>
					</dropdown>
					<dropdown placement="right-start" :divide="$isSmallScreen()">
						<dropdown-item>速率<icon type="ios-arrow-forward"></icon></dropdown-item>
						<dropdown-menu slot="list">
								<dropdown-item name="速0.9" :selected="audio.setting.rate == 0.9">慢</dropdown-item>
								<dropdown-item name="速1" :selected="audio.setting.rate == 1">正常</dropdown-item>
								<dropdown-item name="速1.2" :selected="audio.setting.rate == 1.2">快</dropdown-item>
						</dropdown-menu>
					</dropdown>

					<dropdown placement="right-start">
						<dropdown-item>重複播放<icon type="ios-arrow-forward"></icon></dropdown-item>
						<dropdown-menu slot="list" v-for="(item, index) in options.repeat" :key="index">
								<dropdown-item :name="'重複' + item" :selected="audio.setting.repeat == item">
								{{item == 0 ? "關閉" : item + "次"}}
								</dropdown-item>
						</dropdown-menu>
					</dropdown>
					<DropdownItem name="中斷" v-if="!$isSmallScreen() && audio.setting.repeat > 0">
						<Icon type="md-checkmark" size="16" 
							:style="{color: audio.setting.repeat > 0 && audio.setting.interrupt == true ? '' : '#e5e5e5'}"></Icon>
						重複中斷
					</DropdownItem>
					<dropdown placement="right-start" v-if="audio.setting.repeat > 0">
						<dropdown-item>重複間距<icon type="ios-arrow-forward"></icon></dropdown-item>
						<dropdown-menu slot="list" v-for="(item, index) in options.interval" :key="index">
								<dropdown-item :name="'間距' + item" :selected="audio.setting.interval == item">
								{{(item > 0 ? item : item * -1) + (item > 0 ? "秒" : "倍") }}
								</dropdown-item>
						</dropdown-menu>
					</dropdown>
					<DropdownItem name="段落" v-if="audio.setting.repeat > 0">
						段落
					</DropdownItem>		
					<DropdownItem name="生字" divided v-if="displayVocabulary == false && vocabulary.length > 0" divided>
						生字清單
					</DropdownItem>
					<DropdownItem name="關於" divided>
						關於
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</header-bar>

		<!-- body -->
		<textarea v-if="mode=='edit'" ref="textarea"
			style="height: 100%; width: 100%; font-size: 18px;"
		>{{source.html}}</textarea>

		<div id="readerFrame" v-else 
			style="height: 100%; overflow-y: auto; display: flex; flex-direction: row;" 
			@scroll.natvie="onScroll"
		>
			<div id="renderMarker" v-if="repeat > 0" 
				style="width: 20px; padding: 8px 0px; overflow-y: hidden; 
					overflow-x: visible; position: relative;">
				<div v-for="(item, index) in bubbles" :key="index"
					:style="{position: 'absolute', top: item.top + 'px', height: item.height + 'px',}"
				>
					<div class='speech-bubble' :id="'bubble' + index" @click="onClickBubble($event, index)">
						{{index + 1}}
					</div>
				</div>
			</div>
			<div id="context" v-html="html" @contextmenu="$easycm($event,$root,1)"
				:style="{flex: 1,  
					padding: repeat == 0 ? '8px' : '8px 4px 8px 2px'}"
			>
			</div>
			<div id="board" v-if="repeat > 1 && state != 'stop'" style="bottom: 0px">{{repeatTimes + "/" + repeat}}</div>
		</div>
		<easy-cm :list="cmList" :tag="1" @ecmcb="onMenuClick" :underline="true" :arrow="true" :itemHeight="34" :itemWidth="180"></easy-cm>
		
		<!-- footer -->
		<div v-show="duration > 0 && mode == '' " slot="footer" style="display: flex; flex-direction: row; align-items: center; ">
			<div style="display: flex; flex-direction: row; align-items: center; ">
				<Icon v-if="state == 'pause' || state == 'stop'" type="md-play" 
					size="20" color="white" class="button" @click.native="audio.play()" />
				<Icon v-else type="md-pause" size="20" color="white" class="button" @click.native="audio.pause()" />
				<Icon type="md-square" size="20" color="red" class="button" @click.native="audio.stop()" />
				<Icon v-if="repeat > 0 && block.length > 0" type="md-skip-backward" size="20" color="white" 
					class="button" :class="{disable: block[0] == 0}"
					@click.native="moveBlock(block[0] == 0 ? null : -1)" />
				<Icon v-if="repeat > 0 && block.length > 0" type="md-skip-forward" size="20" color="white" 
					class="button" :class="{disable: block[1] == audio.LRCs.length - 1}"
					@click.native="moveBlock(block[1] == audio.LRCs.length - 1 ? null : 1)" />
			</div>

			<div v-if="repeat == 0" style="margin: 0px 10px 0px 5px; font-size: 20px;">
				<div style="font-weight: 500;">{{convertTime(currentTime)}}</div>
				<div style="font-weight: 500;">{{convertTime(duration)}}</div>
			</div>
			
			<Slider v-model="currentTime" :tip-format="format" 
				v-if="repeat == 0"
				:max=duration @on-change="onSlideChange" style="flex: 1; margin-right: 10px;"
				:marks="marks" />

			<div v-else style="flex: 1; text-align: center;">{{msg}}</div>

			<Dropdown v-if="state != 'stop'" :trigger="$isSmallScreen() ? 'click' : 'hover'">
				<a href="javascript:void(0)"  style="padding: 10px 10px; display: inline-block;">
					{{convertTime((audio.setting.sleep * 60) - passTime)}}
					<Icon type="ios-arrow-down"></Icon>
				</a>
				<dropdown-menu slot="list" placement="left-start">
					<dropdown-item v-for="(item, index) in options.limits" :key="index"
						:selected="item == audio.setting.sleep"
						@click.native="onClickSleep(item)"
					>
					{{item + " 分"}}
					</dropdown-item>
        </dropdown-menu>
  		</Dropdown>
		</div>
		<dlg-vocabulary :visible="displayVocabulary" :data="vocabulary" 
			@close="displayVocabulary = false" @update="updateVocabulary"/>
	
		<dlg-paragraph :visible="displayParagraph"
			:paragraph="audio == null ? [] : audio.LRCs"
			:block="audio == null ? [] : audio.block"
			@close="onParagraphOK" @on-cancel="displayParagraph = false"
		/>
	</modal>`,
	props: {
		source: Object,
		total: Number
	},
	data() {
		return {
			modal: true,
			title: "",
			audio: null,
			state: "stop",
			duration: 0,
			currentTime: 0,
			passTime: 0,
			cmList: [],
			html: "",
			msg: "",
			marks: {},
			repeat: 0, // 主要是作為在 reader 判斷用
			repeatTimes: 1,
			bubbles: [],
			block: [],
			vocabulary: "",
			displayVocabulary: false,
			displayParagraph: false,
			mode: "",
			options: {
				limits: [10, 15, 20, 30, 45, 60], // 睡眠
				repeat: [0, 1, 2, 3, 5, 10, 20],
				interval: [3, 5, 10, -1, -1.5, -2, 2.5, -3] // 重複間距
			}
		};
	},
	created(){
	},
	async mounted () {
		let context = document.querySelector("#context");
		if(context != null) context.style.visibility = "hidden";
		this.html = this.source.html + "<div style='display: none;'>" + (new Date()) + "</div>";
		this.title = this.source.title;
		this.initial();
		if(this.$isAdmin()){
			this.options.limits = [1, 3, 5].concat(this.options.limits);
		}
		this.broadcast.$on('onResize', this.onResize);
		if(this.$isFlutter()) {
			this.broadcast.$on('onFlutter', this.onFlutter);
		}
	},
	destroyed() {
		this.audio.src = "";
		this.audio.canPlay = false;
		this.audio.stop();
		this.audio = null;
		clearInterval(this.finalCountID);
		this.$Notice.destroy();
		window.removeEventListener('keydown', this.onKeydown, false);
		window.removeEventListener("popstate", this.onPopState);
		this.broadcast.$off('onResize', this.onResize);
		if(this.$isFlutter()) {
			let obj = {state: "close"};
			Flutter.postMessage(JSON.stringify(obj));
			console.log("Flutter.postMessage: " + JSON.stringify(obj))
			this.broadcast.$off('onFlutter', this.onFlutter);
		}
  },
	methods: {
		moveBlock(index){
			if(index == null) return;
			this.onParagraphOK([this.block[0] + index, this.block[1] + index])
		},
		onFlutter(arg){
			console.log("onFlutter: " + arg)
			if(arg == "unplugged") { // 耳機，已拔
				this.audio.pause();
			} else if(arg == "action.TOGGLE") { //
				if(this.state == "play")
					this.audio.pause();
				else 
					this.audio.play();
			} else if(arg == "action.STOP") { //
				this.audio.stop();
			}
		},
		onParagraphOK(block){
			if(Array.isArray(block)) {
				this.block = block;

				let arr = document.querySelectorAll("#renderMarker .speech-bubble");
				arr.forEach((item, index)=>{
					if(block.length == 2 && index >= block[0] && index <= block[1])
						item.classList.add("active");
					else 
					item.classList.remove("active");
				});
				this.audio.block = block;	
				
				if(block.length == 2 && (this.audio.paragraph < block[0] || this.audio.paragraph > block[1])){
					this.audio.assignParagraph(this.audio.block[0], true);
				}
				this.saveBlock();
			}
			this.displayParagraph = false;
		},
		onClickMore(item){
			// console.log(item)
			if(typeof item == "undefined") return;
			item += "";
			if(item == "自動播放")
				this.audio.setting.autoPlay = !this.audio.setting.autoPlay;
			else if(item == "中文") {
				this.audio.setting.chinese = !this.audio.setting.chinese;
			} else if(item == "生字"){
				this.displayVocabulary = true;
				return;
			// } else if(item == "設定"){
			} else if(item == "關於"){
				vm.showMessage(
					this.source.title, 
					this.source.report + "：" + this.source.key, 
					"異動日期：" + new Date(this.source.modifyDate).toString()
				)
				return;
			} else if(item.indexOf("字") == 0){
				this.audio.setting.zoom = parseFloat(item.replace("字", ""))
				document.getElementById("readerFrame").style.zoom = this.audio.setting.zoom;
			} else if(item.indexOf("速") == 0){
				let rate = parseFloat(item.replace("速", ""))
				this.audio.setting = Object.assign(this.audio.setting, 	{rate});
			} else if(item.indexOf("間距") == 0){
				let interval = parseFloat(item.replace("間距", ""))
				this.audio.setting = Object.assign(this.audio.setting, 	{interval});
			} else if(item.indexOf("中斷") == 0){ // 
				let interrupt = ! this.audio.setting.interrupt;
				this.audio.setting = Object.assign(this.audio.setting, 	{interrupt});
			} else if(item.indexOf("段落") == 0){ //
				this.displayParagraph = true;
			} else if(item.indexOf("重複") == 0){
				let repeat = parseFloat(item.replace("重複", ""))
				let update = this.audio.setting.repeat == 0 || repeat == 0 ? true : false;
				this.audio.setting = Object.assign(this.audio.setting, {repeat: repeat});
				if(repeat == 0) {
					this.audio.setting.interrupt = false;
				}

				this.audio.block = this.audio.setting.repeat == 0 ? [] : this.block;
				if(update == true) {
					this.html = this.source.html + "<div style='display: none;'>" + (new Date()) + "</div>";
					this.audio.audio.pause();
					clearInterval(this.audio.timeID);
					this.audio.repeat = 0;
					setTimeout(() => {
						this.retrieve(true);
					}, 300);
				}
				this.repeat = this.audio.setting.repeat;
			}
			this.buildMenu();
			window.localStorage["VOA-Reader"] = JSON.stringify(this.audio.setting);
		},
		buildMenu(){
			let arr = [], children = [];
			arr.push({
				text: '自動播放',
				icon: "" + (this.audio.setting.autoPlay == true ? "ivu-icon-md-checkmark ivu-icon" : "")
			});

			if(this.isChinese() == true) {
				arr.push({
					text: '中文',
					icon: "" + (this.audio.setting.chinese == true ? "ivu-icon-md-checkmark ivu-icon" : "")
				});
				this.changeChinese();
				setTimeout(()=>{
					this.renderBubble();
				}, 300);
			}

			children = [{text: "大", value: 1.6}, {text: "正常", value: 1.2}]; //, {text: "小", value: 1}
			children.forEach(item=>{
				if(this.audio.setting.zoom == item.value)
					item.icon = "ivu-icon-md-checkmark ivu-icon";
			})
			arr.push({text: '字體',children: children});

			children = [{text: "慢", value: 0.9}, {text: "正常", value: 1}, {text: "快", value: 1.2}];
			let label = "";
			children.forEach(item=>{
				if(this.audio.setting.rate == item.value) {
					label = " - " + item.text;
					item.icon = "ivu-icon-md-checkmark ivu-icon";
				}
			})
			arr.push({text: '速率' + label, children: children});

			children = [];
			this.options.repeat.forEach(item =>{
				children.push({
					text: item == 0 ? "關閉" : item + " 次", 
					value: item,
					icon: this.audio.setting.repeat == item ? "ivu-icon-md-checkmark ivu-icon" : ""
				});
			}) 
			arr.push({text: '重複播放 - ' + (this.audio.setting.repeat > 0 ? this.audio.setting.repeat + "次" : "關閉"), children: children});
			if(this.audio.setting.repeat > 1 && this.state == "play") 
				this.displayVocabulary = false;

			if(this.audio.setting.repeat > 0) {
				arr.push({text: '重複中斷', icon: this.audio.setting.interrupt == true ? "ivu-icon-md-checkmark ivu-icon" : ""});
				
				children = [];
	
			this.options.interval.forEach(item =>{
					children.push({
						text: Math.abs(item) + (item > 0 ? " 秒" : " 倍"), 
						value: item,
						icon: this.audio.setting.interval == item ? "ivu-icon-md-checkmark ivu-icon" : ""
					});
				}) 
				arr.push({text: '重複間距 - ' + 
				Math.abs(this.audio.setting.interval) + (this.audio.setting.interval > 0 ? "秒" : "倍"), 
					children: children
				});
			}

			this.cmList = this.$isSmallScreen() ? [] : arr;
		},
		onMenuClick(e){
			// https://vuejsexamples.com/a-simple-and-easy-to-use-context-menu-with-vue/
			if(this.cmList[e[0]].text == "自動播放") {
				this.audio.setting.autoPlay = !this.audio.setting.autoPlay;
			} else if(this.cmList[e[0]].text.indexOf("中文") > -1) {
					this.audio.setting.chinese = !this.audio.setting.chinese;
			} else if(this.cmList[e[0]].text == "字體") {
				this.audio.setting.zoom = this.cmList[e[0]].children[e[1]].value;
				document.getElementById("readerFrame").style.zoom = this.audio.setting.zoom;
				this.renderBubble();
			} else if(this.cmList[e[0]].text.indexOf("速率") > -1) {
				this.audio.setting = Object.assign(this.audio.setting, {rate: this.cmList[e[0]].children[e[1]].value});
			} else  if(this.cmList[e[0]].text.indexOf("重複播放") > -1) {
				let update = this.audio.setting.repeat == 0 || this.cmList[e[0]].children[e[1]].value == 0 ? true : false;
				this.audio.setting = Object.assign(this.audio.setting, {repeat: this.cmList[e[0]].children[e[1]].value});
				if(this.cmList[e[0]].children[e[1]].value == 0) {
					this.audio.setting.interrupt = false;
				}

				this.audio.block = this.audio.setting.repeat == 0 ? [] : this.block;
				if(update == true) {
					this.html = this.source.html + "<div style='display: none;'>" + (new Date()) + "</div>";
					this.audio.audio.pause();
					clearInterval(this.audio.timeID);
					this.audio.repeat = 0;
					setTimeout(() => {
						this.retrieve(true);
					}, 300);
				}
				this.repeat = this.audio.setting.repeat;
			} else if(this.cmList[e[0]].text == "重複中斷") {
				this.audio.setting = Object.assign(this.audio.setting, {interrupt: ! this.audio.setting.interrupt});
			} else if(this.cmList[e[0]].text.indexOf("重複間距") > -1) {
				this.audio.setting = Object.assign(this.audio.setting, {interval: this.cmList[e[0]].children[e[1]].value});
			}

			window.localStorage["VOA-Reader"] = JSON.stringify(this.audio.setting);
			this.buildMenu();
		},
		async getHistory(){
			try {
				let snapshot1 = await FireStore.db.collection("users").doc(FireStore.uid())
					.collection("history").doc(this.source.key)
					.get();
				return snapshot1.data();
				
			} catch(e) {
				// console.log(e)
				// vm.showMessage(typeof e == "object" ? JSON.stringify(e) : e);
			}
		},
		async setHistory(arg){
			let ref = FireStore.db.collection("users").doc(FireStore.uid())
				.collection("history").doc(this.source.key);
			let obj = {
				modifyDate: (new Date()).toString("yyyymmddThhMM"),
				vocabulary: this.vocabulary,
				report: this.source.report,
				block: this.audio.block.length == 2 ? [this.audio.block[0], this.audio.block[1]] : []
			}

			try {
				let x = await ref.set(obj,{merge: true});
				if(arg == "vocabulary") {
					this.$emit("onUpdate", "vocabulary",  this.vocabulary);
					// this.vocabulary
				}
				// this.$Notice.success({
				// 	title: "生字已上傳",
				// });
			} catch(e) {
				console.log(e)
				throw e;
			}
		},
		updateVocabulary(rows){
			rows = rows.filter(word => typeof word == "string" && word.length > 0);
			if(rows.length > 0)
				this.vocabulary = rows.join("\n");
			else 
				this.vocabulary = ""
			this.setHistory("vocabulary");
		},
		onClickBubble(e, index){
			let self = this;
			// console.log(e)
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? e.metaKey : e.ctrlKey;
			let sk = e.shiftKey, code = e.keyCode;

			if(pk == false && sk == false) {
				let arr = document.querySelectorAll("#renderMarker .active");
				if(arr.length == 0 && e.target.classList.contains("active") == false){
					clearBubble();
					if(this.audio.paragraph != index)
						this.audio.assignParagraph(index, true);					
				}
			} else if(pk == true && sk == true) {
			}	else {
				let start = -1, end = -1;
				let current = parseInt(e.target.id.replace("bubble", ""));
				if(pk == true && sk == false) {
					let active = e.target.classList.contains("active");
					clearBubble();
					if(active == false) {
						e.target.classList.add("active");
						this.audio.block = [index, index];						
					} else {
						this.audio.block = [];
					}
				} else if(sk == true && pk == false) {
					let arr = document.querySelectorAll("#renderMarker .active");
					for (let i = 0; i < arr.length; ++i) {
						let item = arr[i];
						let el = parseInt(item.id.replace("bubble", ""), 10);
						if(start == -1 || el < start)
							start = el;
						if(end == -1 || el > end)
							end = el;
					}
					if(start == -1) return;

					if(current < start) 
						start = current;
					else if(current > end) 
						end = current;
					else if(current > start) 
						start = current;
					arr = document.querySelectorAll("#renderMarker .speech-bubble");
					arr.forEach((item, index)=>{
						if(index >= start && index <= end)
							item.classList.add("active");
						else 
						item.classList.remove("active");
					});
					this.audio.block = [start, end];	
				} else {
					return
				}
				if(this.audio.paragraph < this.audio.block[0] || this.audio.paragraph > this.audio.block[1]){
					this.audio.assignParagraph(this.audio.block[0], true);
				}
				this.saveBlock();
			}
			
			function clearBubble() {
				let arr = document.querySelectorAll("#renderMarker .active");
				arr.forEach(item=>{
					item.classList.remove("active");
				});
				self.audio.block = [];
				return arr.length;
			}	
		},
		saveBlock(){
			if(FireStore.login == true)
				this.setHistory()
			else{
					let s = window.localStorage["VOA-Blocks-" + self.source.report];
					let arr = (typeof s == "string" && s.length > 0) ? JSON.parse(s) : [];
					for(let i = 0; i < arr.length; i++){
						if(arr[i].key == self.source.key) {
							arr.splice(i, 1);
							break;
						}
					}
					arr.unshift({key: self.source.key, block: self.audio.block});
					for(let i = arr.length - 1; i >= 0; i--){
						if(arr[i].block.length == 0)
							arr.splice(i, 1);
					}
	
					for(let i = arr.length - 1; i >= 10; i--){
						arr.splice(i, 1);
					}
					if(arr.length > 0)
						window.localStorage["VOA-Blocks-" + self.source.report] = JSON.stringify(arr);
					else
						delete window.localStorage["VOA-Blocks-" + self.source.report];
			}
		},
		onResize(){
			clearTimeout(this.resizeId);
			this.resizeId = setTimeout(()=>{
				this.renderBubble();
			}, 100);
		},
		async initial(){
			let self = this;
			let setting = {
				autoPlay: false,
				zoom: 1.2,
				rate: 1,
				repeat: 0,
				interval: 5,
				interrupt: false,
				sleep: 30,
				chinese: true
			}

			let s = window.localStorage["VOA-Reader"];
			if(typeof s == "string" && s.length > 0) 
				setting = Object.assign(setting, JSON.parse(s));
			this.repeat = setting.repeat;

			if(FireStore.login == true) {
				let data = await this.getHistory();
				// console.log(data);
				if(data && typeof data.vocabulary == "string") {
					this.vocabulary = data.vocabulary;
				}
				//setting.repeat <= 1 &&
				if(this.vocabulary.length > 0 && setting.autoPlay == false && !this.$isSmallScreen()) 
					this.displayVocabulary = true;

				if(data && Array.isArray(data.block)) {
					this.block = data.block;
				}
			} else {
				s = window.localStorage["VOA-Blocks-" + this.source.report];
				let arr = (typeof s == "string" && s.length > 0) ? JSON.parse(s) : [];
				this.block = [];
				if(Array.isArray(arr)) {
					arr.forEach(item=>{
						if(item.key == this.source.key) {
							this.block = item.block;
						}
					});				
				}
			}

			this.audio = new Player({block: this.repeat == 0 ? [] : this.block});
			this.audio.setting = setting;
			this.audio.state = "stop";
			this.url = await FireStore.downloadFileURL("VOA/" + this.source.report + "/" + this.source.key + ".mp3");
			this.audio.src = this.url;
			document.getElementById("readerFrame").style.zoom = this.audio.setting.zoom;
			window.addEventListener('keydown', this.onKeydown, false);
			// window.addEventListener('resize', this.onResize, false);
			window.addEventListener("popstate", this.onPopState);
	
			self.audio.onStateChange = (e, v1, v2) => {
				// console.log(e)
				if(this.modal == false) return;
				if(e == "durationChange") {
					this.duration = v1;
					this.retrieve();
				} else if(e == "canPlay") {
				
				} else if(e == "timeUpdate") {
					this.currentTime = v1;
					// console.log(this.currentTime)
				} else if(e == "sectionChange"){
					this.repeatTimes = 1;
					let arr = document.querySelectorAll(".english span.active");
					arr.forEach(item=>{
						item.classList.remove("active");
					})
					if(typeof v2 == "undefined") { // 通知要從頭開始
						this.currentTime = this.audio.currentTime ;
						v2 = 0;
						this.$Notice.info({
							title: '請稍候!!',
						});
					}

					let el = document.querySelector("#l" + v1 + "_" + v2);
					if(el != null)
						el.classList.add("active");						
					this.scrollTo(document.querySelector("#p" + v1));
				} else if(e == "play" || e == "stop" || e == "pause" || e == "interrupt") {
					// console.log(e)
					let state = this.state;
					
					if(state == "interrupt") { // 
						this.$Notice.close("interrupt");
					} else if(e == "interrupt") {
						this.$Notice.info({
							title: '請按空白鍵再聽一次，或按方向鍵',
							duration: 0,
							name: "interrupt"
						});
					} else if(e == "play") {
						this.finalCount(e);
					} else if(e == "stop") {
						this.finalCount(e);
						this.currentTime = this.audio.currentTime;
						let context = document.querySelector("#context");
						if(context == null) return;
						context.scrollTop = 0;
						let el = document.querySelector(".english span.active");
						if(el != null) {
							el.classList.remove("active");
						}
					}
					this.state = e;
					
					if(this.$isFlutter() && (e == "play" || e == "stop" || e == "pause")) {
						let obj = {state: e, title: this.source.title, report: this.source.report,
							index: this.source.index, total: this.source.total};
						Flutter.postMessage(JSON.stringify(obj));
						// console.log("Flutter.postMessage: " + JSON.stringify(obj))
					}
				} else if(e == "repeat"){
					// console.log("repeat: " + v1)
					this.repeatTimes = v1 + 1;
				}
			}
			this.buildMenu();
		},
		scrollTo(el) {
			if(el == null) return;
			let offsetTop = el.offsetTop;
			let offsetBottom = offsetTop + el.clientHeight;

			let viewer = document.querySelector("#readerFrame");
			let scrollTop = viewer.scrollTop, clientHeight = viewer.clientHeight;

			if(offsetTop >= scrollTop && offsetBottom < scrollTop + clientHeight){
			} else {
				viewer.scrollTop = offsetTop - 60;
			}
		},
		onClickSleep(e) {
			this.audio.setting.sleep = e;
			window.localStorage["VOA-Reader"] = JSON.stringify(this.audio.setting);
			this.finalCount(this.state)
		},
		finalCount(state){
			this.passTime = 0;
			if(typeof this.finalCountID != "undefined") {
				clearInterval(this.finalCountID);
				delete this.finalCountID;
			} 
			let start = (new Date()).getTime();
			if(state != "stop") {
				this.finalCountID = setInterval(() => {
					let now = (new Date()).getTime() - start;
					this.passTime = Math.ceil(now / (1000));

					if((this.audio.setting.sleep * 60) - this.passTime <= 0) {
						this.audio.stop(true);
					}
					// console.log("finalCount: " + now)
				}, 500);
			}
		},
		onKeydown(event){
			if(this.audio.canPlay == false) return;
			let self = this;
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			let ak = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			let sk = event.shiftKey, code = event.keyCode;
			// console.log("key: " + code + "/" + pk)
			// console.log(o.tagName + ": " + o.contentEditable)
			if(o.tagName == "INPUT" || o.tagName == "TEXTAREA"){
				if(o.tagName == "TEXTAREA" && pk == true && code == 83 && this.mode == "edit"){// 存檔
					let html = this.$refs["textarea"].value;
					this.$emit("onUpdate", "html", html);
					this.onPopState();
				} else
					return;
			} else if(pk == true && code == 77 && FireStore.login == true){ // m, 加入筆記
				let ss = window.getSelection().toString().trim();
				if(("\n" + this.vocabulary + "\n").indexOf("\n" + ss + "\n") == -1) {
					// console.log(window.getSelection())
					this.vocabulary += (this.vocabulary.length > 0 ? "\n" : "") + ss;
					this.setHistory("vocabulary")
				}
			} else if(pk == true && code == 69 && this.$isAdmin() == true){ // 編輯
				if(this.mode == "edit") {
					refresh();
				} else {
					this.mode = "edit";
					this.audio.pause();
					this.displayVocabulary = false;
				}				
			} else if(code == 27){ //
				this.displayVocabulary = false;
			// } else if(this.displayVocabulary == true) {
			// 	return;
			} else if(pk && sk && code == 86 && FireStore.login == true){ // Cmd ＋ shift + V, 單字清單, 還沒寫
				this.displayVocabulary = true;
			} else if(code == 32){ //空格鍵，interrupt
				if(this.state == "interrupt" || this.audio.state == "pendding") 
					this.audio.continue();
			} else if(code == 37 || code == 39 || code == 38 || code == 40) { // l, r, u, d
				let arr = document.querySelectorAll(".english span.active");
				if(code == 37 || code == 39) {
					if(arr.length == 0)
						this.audio.gotoLRC("first");
					else if(pk == true)
						this.audio.gotoLRC(code == 37 ? "first" : "end")
					else
						this.audio.gotoLRC(code == 37 ? -1 : 1)
				}	else 
					if(arr.length == 0)
						this.audio.gotoParagraph("first");
					else if(pk == true)
						this.audio.gotoParagraph(code == 38 ? "first" : "end")
					else
						this.audio.gotoParagraph(code == 38 ? -1 : 1)
			} else {
				return;
			}

			event.preventDefault();
      event.stopImmediatePropagation();
			event.stopPropagation();
			
			function refresh() {
				self.mode = "";
				setTimeout(() => {
					document.getElementById("readerFrame").style.zoom = self.audio.setting.zoom;
					self.retrieve(true);
				}, 600);
			}
		},
		isChinese() {
			return this.source && this.source.html.indexOf("<div class='chinese'>") > -1;
		},
		onSlideChange(e){
			this.audio.currentTime = e;
		},
		changeChinese(){
			let arr = document.querySelectorAll(".chinese");
			arr.forEach((item)=>{
				item.style.display = 
					this.audio.setting.chinese == true ? "block" : "none";
			});
		},
		format(start) {
			if(start == 0 || isNaN(start))
					return "00:00";
				else {
					let s = Math.floor(start / 60);
					let m = Math.floor(start - (s * 60));
					if(m == 60){
						m = 0;
						s++;
					}
					return s.leftPadding(2, '0') + ":" + m.leftPadding(2, '0').substr(0,2);
				}
		},
		onPopState(e){
			this.$emit("onClose");
			
			if(typeof e == "undefined") {
				history.back();
			}
			this.$destroy();
		},
		convertTime(start){
			if(start == 0 || isNaN(start))
				return "00:00";
			else {
				let s = Math.floor(start / 60);
				let m = Math.floor(start - (s * 60));
				if(m == 60){
					m = 0;
					s++;
				}
				return s.leftPadding(2, '0') + ":" + m.leftPadding(2, '0').substr(0,2);
			}
		},
		retrieve(again){
			let lrcs = []; this.marks = {};
			let context = document.querySelector("#context");
			if(context != null) context.style.visibility = "hidden";

			let arr1 = document.querySelectorAll(".chinese");
			this.changeChinese();

			arr1 = document.querySelectorAll(".english");
			if(this.audio.setting.repeat > 0 && arr1.length > 0) {
				let i = arr1.length - 1;
				while(i >= 0) {
					if(arr1[i].parentNode.getAttribute("ignore") != null) {
						arr1[i].parentNode.parentNode.removeChild(arr1[i].parentNode);
					} else if(arr1[i].getAttribute("ignore") != null) {
						arr1[i].parentNode.parentNode.removeChild(arr1[i].parentNode);
					} else if(arr1[i].innerHTML.indexOf("ignore") > -1) {
						let arr2 = arr1[i].querySelectorAll("span");
						let j = arr2.length - 1;
						while(j >= 0) {
							if(arr2[j].getAttribute("ignore") != null) {
								arr2[j].parentNode.removeChild(arr2[j]);
							}
							j--;
						}
					}
					i--;
				}
				arr1 = document.querySelectorAll(".english");
			}

			let arr = document.querySelectorAll(".english span");
			let dealine = 0.5;
			for(let i = 0; i < arr.length; i++) {
				let start = arr[i].getAttribute("start");
				let end = arr[i].getAttribute("end");
				if(start != 0 && i > 0) {
					if(arr[i - 1].getAttribute("end") == null)
						arr[i - 1].setAttribute("end", start - dealine);
				}
			
				if(i == 0 && start == null){
					arr[i].setAttribute("start", 0);
				} else if(i == arr.length - 1 && (end == null || end >= this.duration)){
					arr[i].setAttribute("end", this.duration - dealine);
				}
			}

			arr1.forEach((item1, index1)=>{
				let arr2 = item1.querySelectorAll("span");
				let arr3 = [];
				arr2.forEach((item2, index2)=>{
					let start = item2.getAttribute("start");
					let end = item2.getAttribute("end");
					if(isNaN(start) || start == null || isNaN(end) || end == null) {
						if(item2.innerHTML.lastIndexOf("<strong") == -1){
							vm.showMessage("下列位置沒有 lrc ", "block: " + index1 + ", lrc: " + index2 )
							console.log(item1)
						}
					} else {
						item2.id = "l" + lrcs.length + "_" + arr3.length;
						arr3.push({start: parseFloat(start),  end: parseFloat(end)})
					}
				});
	
				if(arr3.length > 0) {
					item1.id = "p" + lrcs.length;
					lrcs.push(arr3);
					let start = arr3[0].start;
					let rate = Math.floor(start);
					if(lrcs.length > 1 && !this.$isSmallScreen()) {
						this.marks[rate] = lrcs.length + "";
					}
				}
			});
			this.audio.LRCs = lrcs;
			let start = this.audio.setting.repeat > 0 && this.block.length > 0 ? this.block[0] : 0;
			if(this.audio.setting.repeat > 0) {
				if(lrcs.length > 0 && lrcs[start].length > 0) {
					if(!isNaN(lrcs[start][0].start)) {
						this.audio.currentRange = null; //lrcs[start][0];
						this.audio.currentTime = lrcs[start][0].start;
					}
				}
			} else {
				this.audio.currentRange = null;
				this.audio.currentTime = 0;
			}
			this.currentTime = this.audio.currentTime;
			if(typeof again == "boolean" && this.state == "play") {
				this.audio.audio.play();
				this.audio.timing();
			}

			this.renderBubble();
			if(this.audio.setting.repeat > 0 && this.block.length > 0)
				this.scrollTo(document.querySelector("#p" + this.block[0]));
			setTimeout(()=>{
				if(context != null) context.style.visibility = "visible";
			}, 100);
		}, 
		onScroll(e){
			if(this.repeat == 0) return;

			let readerFrame = document.getElementById("readerFrame");
			let board = document.getElementById("board");
			if(board != null) {
				if(readerFrame.scrollTop > 100){
					board.style.top = "0px";
					board.style.removeProperty("bottom")
				} else {
					board.style.bottom = "0px";
					board.style.removeProperty("top")
				}
				// console.log(readerFrame.scrollTop, 
				// 	"top: " + board.style.top + ", bottom: " + board.style.bottom)
			}
		},
		renderBubble(){
			if(this.repeat == 0) return;
			this.bubbles = [];

			let arr = document.querySelectorAll(".p");
			let top = 7;
			arr.forEach((item, index)=>{
				this.bubbles.push({
					top: top,
					height: item.getBoundingClientRect().height + (index > 0 ? 14 : 0)
				});
				top += item.getBoundingClientRect().height + 14;
			});
			let context = document.querySelector("#context");
			let el = document.querySelector("#renderMarker");
			if(el != null) el.style.height = top + "px";
			setTimeout(()=>{
				if(this.block.length > 0) {
					arr = document.querySelectorAll("#renderMarker .speech-bubble");
					arr.forEach((item, index)=>{
						if(index >= this.block[0] && index <= this.block[1])
							item.classList.add("active");
					});				
				}				
			}, 300);
			setTimeout(()=>{
				this.onScroll();
			}, 1000);
		}
	},
	computed: {
		position: {
			get: function () {
				let i = typeof this.audio == "object" ? (this.currentTime / this.duration) * 100 : 0;
				// console.log(i + ": " + this.currentTime + "/" + this.duration)
				return i;
			},
			set: function(index) {
				console.log("position: " + index)
			}
		}
	},
	watch: {
		repeat(value) {
			if(value > 1 && this.state == "play") {
				setTimeout(() => {
					this.onScroll()
				}, 300);
			}
		},
		state(value) {
			if(value == "play" && this.repeat > 1) {
				setTimeout(() => {
					this.onScroll()
				}, 300);
			}
		}
	}
});