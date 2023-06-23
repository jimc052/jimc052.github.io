Vue.component('dlg-list', { 
	template:  `<modal v-model="visible" id="list" :footer-hide="true" :width="width" :closable="false"" 
			:draggable="true" :mask-closable="false" 
			style=""			
		>
		<div slot="header" 
				style="display: flex; flex-direction: row; align-items: center; padding: 10px 12px; background-color: rgb(70, 160, 240)">
			<div style="flex: 1; color: white; font-size: 20px;">{{"清單：" + (typeof editdata.id == "string" && editdata.id.length > 0 ? editdata.id : "" )}}</div>
			<Icon type="md-add" size="22" @click.native="addRow" 
				v-if="cursor == -1"
				style="cursor: pointer; color: white; margin-right: 10px;" />
			<Icon :type="dirty == false ? 'md-close' : 'md-checkmark'" size="22" 
				v-if="cursor == -1"
				@click.native="close" style="cursor: pointer; color: white;" />
		</div>
		<div :style="{height: height + 'px', overflow: 'hidden', border: '1px solid rgb(70, 160, 240)', background: '#eee'}">
			<div style="height: 100%; overflow-y: auto; " id="listFrame">
				<div style="flex: 1; padding: 5px;">
					<i-input element-id="editTitle" size="large" v-model="title" style="flex: 1;" placeholder="title" />
				</div>
				<div style="flex: 1; padding: 0px 5px 5px 5px;">
					<i-input v-if="typeof editdata.id == 'string' &&  editdata.id.length == 0" size="large"
						element-id="editID" v-model="id" style="flex: 1; "  placeholder="id"/>
				</div>

				<div v-for="(item, index) in rows" :key="index" 
					style="display: flex; flex-direction: row; justify-content: center; align-items: center;
						padding: 5px 5px; min-height: 44px;	background: white;
					"
					class="list"
				>
					<div v-if="cursor == index" style="" :class="display" :id="'list-row-' + index">
						<div>
							<i-input v-if="display == 'col3'" size="large" element-id="editName" v-model="name" style="flex: 1; style='height: 100%;' " />
							<div v-else>{{index + 1}}</div>
						</div>
						<div>
							<i-input size="large" element-id="editStart" v-model="start" style="flex: 1; style='height: 100%;' " />
						</div>
						<div>
							<i-input size="large" element-id="editEnd" v-model="end" style="flex: 1; style='height: 100%;' " />
						</div>
					</div>
					<div v-else style="" @click="play(index); cursor = -1; " :class="display">
						<div v-if="display == 'col3'">{{item.title}}</div>
						<div v-else>{{index + 1}}</div>
						<div>{{item.start}}</div>
						<div>{{item.end}}</div>
					</div>
					<Icon v-if="cursor == index" type="md-headset" size="18" 
						@click.native="play(index);" 
						style="cursor: pointer; margin-left: 6px;" />
					<Icon v-else type="md-create" size="18" 
						@click.native="cursor = index; name = item.title; start = item.start; end = item.end" 
						style="cursor: pointer; margin-left: 6px;" />
					<Icon :type="cursor == index ? 'md-checkmark' : 'md-trash'" size="18"
						@click.native="del(index)" 
						style="cursor: pointer; margin-left: 6px;" />
				</div>
			</div>
		</div>
	</modal>`,
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		display: {
			type: String,
			default: "col2" // col3
		} ,
		editdata: {
			type: Object,
			default() {
				return {
					id: "",
					title: "",
					position: []
				}
			}
		} ,
	},
	data() {
		return {
      title: "", 
      id: "",
			rows: [],
			cursor: -1,
			name: "",
			start: "",
			end: "",
			width: 0,
			height: 0,
			dirty: false,
			mode: "new"
		};
	},
	created(){
	},
	async mounted () {
		// console.log(this.editdata)
		this.width =  350;
		this.height = 400;
		let el = document.querySelector("#list .ivu-modal");
		el.style.margin = "0px";
		setTimeout(()=>{
			el = document.querySelector("#list .ivu-modal-content-drag");
			el.style.left = (document.body.clientWidth - (this.width + 20) + 
				(15)) + "px";
			el.style.top = (document.body.clientHeight - (this.height + 150)) + "px";
			// console.log("clientHeight: " + document.body.clientHeight)
		}, 600)
		this.broadcast.$on('onResize', this.onResize);
	},
	destroyed() {
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		isNumber(s) {
			if(("" + s).length == 0) return false;
			let exp = /[0-9]/;
			let arr = ("" + s).split(".");
			for(let x = 0; x < arr.length; x++) {
				let str = arr[x];
				for(let i = 0; i < str.length; i++) {
					let chr = str.substr(i, 1);
					let b = exp.test(chr);
					if(b == false) {
						return false;
					}
				}
			}
			return true;
		},
		onKeydown(event) {
			let o = document.activeElement;
			let pk = navigator.userAgent.indexOf('Macintosh') > -1 ? event.metaKey : event.ctrlKey;
			let ck = navigator.userAgent.indexOf('Macintosh') > -1  ? event.ctrlKey : event.altKey;
			let ok = navigator.userAgent.indexOf('Macintosh') > -1  ? event.altKey : false;
			let sk = event.shiftKey, code = event.keyCode;
			let id = event.target.id;
			// console.log("key: " + code + ", pk: " + pk + ", cntrl: " + ck + ", option: " + ok);

			// console.log(String.fromCharCode(code) + ": " + (/\d/.test(String.fromCharCode(code))))
			if(o.tagName == "INPUT" && this.visible == true){
				let b = true;
				if(pk && code == 82) {
					b = false;
				} else if(code == 13) { // enter
					if(id == "editName") {
						if(o.value.trim().length > 0) {
							if(o.value.trim() != this.rows[this.cursor].title) {
								this.rows[this.cursor].title = o.value.trim();
								this.dirty = true;
							}
							document.getElementById("editStart").focus();
						}
					} else if(id == "editStart" || id == "editEnd") {
						let editStart = document.getElementById("editStart").value.trim();
						if(editStart.length > 0 && this.isNumber(editStart)) {
							if(this.rows[this.cursor].start != parseFloat(editStart)) {
								this.rows[this.cursor].start = parseFloat(editStart);
								this.dirty = true;
							}
						}
						let editEnd = document.getElementById("editEnd").value.trim();
						if(editEnd.length > 0 && this.isNumber(editEnd)) {
							if(this.rows[this.cursor].end != parseFloat(editEnd)) {
								this.rows[this.cursor].end = parseFloat(editEnd);
								this.dirty = true;
							}
						}
						if(o.value.trim().length == 0 || !this.isNumber(o.value.trim()))
							return false;
						else if(id == "editStart" )
							document.getElementById("editEnd").focus();
						else
							this.reset();
					}
				} else if((id == "editStart" || id == "editEnd") && ok && (code == 37 || code == 39)) {
					if(!this.isNumber(document.getElementById(id).value)) return;

					let x = (code == 37 ? -0.5 : 0.5) + toNumber(document.getElementById(id).value);
					let start = 0, end = 0;
					if(id == "editStart") {
						this.start = x;
						start = x;
						end = x + 5;
					} 						
					else { 
						start = this.isNumber(document.getElementById("editStart").value) 
							? toNumber(document.getElementById("editStart").value) : x - 3;
						end = x;
						this.end = x;
						start = end - start > 3 ? end - 3 : start;
					}
					Youtube.play({end: end, start: start})
				} else if((id == "editStart" || id == "editEnd") && ok && code == 80) { // p
					if(!this.isNumber(document.getElementById(id).value)) return;
					let x = toNumber(document.getElementById(id).value);
					let start = x + (id == "editStart" ? 0 : -10);
					let end = x + (id == "editStart" ? 10 : 0);
					// console.log(start + "; " + end)
					Youtube.play({end: end, start: start});
				} else if((id == "editStart" || id == "editEnd") && pk) {
					// document.getElementById(id).value = player.getCurrentTime().toFixed(2);
					if(id == "editStart") {
						let x = player.getCurrentTime() + 0.2;
						this.start = x.toFixed(2);
						Youtube.play({end: x + 5, start: x});
					} else 
						this.end = player.getCurrentTime().toFixed(2)
				} else if(code == 27) {
					this.reset();
				// } else if ((id == "editStart" || id == "editEnd") && code > 47 && code < 58) {
				// 	e.preventDefault();
				// 	return false;
				} else {
					b = false;
				}
				if(b == true) {
					event.preventDefault();
					event.stopImmediatePropagation();
					event.stopPropagation();				
				}
			}

			function toNumber(num) {
				return parseFloat(parseFloat(num).toFixed(2));
			}
		},
		reset(){
			this.name = ""; this.start = ""; this.end = "";
			this.cursor = -1;
		},
		addRow(){
			this.rows.push({})
			this.cursor = this.rows.length - 1;
			this.name = ""; this.start = ""; this.end = "";
			setTimeout(() => {
				let el = document.getElementById("list-row-" + this.cursor);
				if(el != null)
					el.scrollIntoView();
			}, 300);
		},
		update(){
			let bTitle = this.title.trim().length > 0 && this.title != this.editdata.title;
			let bID = this.id.trim().length > 0 && this.id != this.editdata.id;
			let position = [];
			if(this.dirty == true) {
				this.rows.forEach(item=>{
					let bChange = (this.display == "col3" && item.title.trim().length > 0) || this.display == "col2" 
						? true : false;
					if(bChange == true && ("" + item.start).trim().length > 0 && ("" + item.end).trim().length > 0) {
						let json = {
							start: parseFloat(item.start), 
							end: parseFloat(item.end)
						}
						if(this.display == "col3") {
							json.title = item.title;
						}
						position.push(json)
					}
				})
			} else if(bTitle == true || bID == true) {
				position = this.rows;
			}
			if(bTitle == true || bID == true || position.length > 0) {
				let json = Object.assign(this.editdata, {title: this.title, id: this.id, position})
				this.$emit("update", json);
			}
		},
		close(){
			this.update();
			this.reset();
			this.$emit("close");
		},
		del(index){
			if(this.cursor == -1) {
				this.rows.splice(index, 1);
				this.dirty = true;
				this.reset();
			} else {
				let name = this.name, start = this.start, end = this.end;
				let cursor = this.cursor;
				this.reset();

				if(((this.display == "col3" && name.trim().length > 0) || this.display == "col2") && this.isNumber(start) && this.isNumber(end)) {
					let bChange = this.display == "col3" && (this.rows[cursor].title == name) ? false : true;
					if(bChange == false && this.rows[cursor].start == start && this.rows[cursor].end == end) return;

					if(parseFloat(start) >= parseFloat(end)) return;
					if(this.display == "col3") this.rows[cursor].title = name;
					this.rows[cursor].start = parseFloat(start); 
					this.rows[cursor].end = parseFloat(end);
					this.dirty = true;
				}
			}
		},
		play(index){
			let start = 0, end = 0;
			if(this.cursor == index) {
				start = document.getElementById("editStart").value;
				end = document.getElementById("editEnd").value;
			} else {
				start = this.rows[index].start;
				end = this.rows[index].end;
			}
			// console.log({end, start})
			Youtube.play({end, start});
		},
		onResize(){
			clearTimeout(this.resizeId);
			this.resizeId = setTimeout(()=>{
				let el = document.querySelector("#list .ivu-modal-content-drag");
				if(el == null) 
					return;
				let left = el.style.left.replace("px", "");
				if(left > document.body.clientWidth - (this.width + 20))
					el.style.left = (document.body.clientWidth - (this.width + 20)) + "px";
				let top = el.style.top.replace("px", "");
				if(top > document.body.clientHeight - (this.height + 150))
					el.style.top = (document.body.clientHeight - (this.height + 150)) + "px";
			}, 300);
		},
		onFocus(){
			// if(this.cursor >= 0) {
			// 	setTimeout(() => {
			// 		this.cursor = -1; 
			// 		this.name = "";
			// 	}, 600);
			// }
		},
		onChange(e) {
			this.dirty = true;
		}
	},
	computed: {	
	},
	watch: {
		editdata(value) {
			this.mode = value.id.length == 0 ? "new" : "edit";
			this.title = value.title;
			this.id = value.id;
			this.rows = [];
			if(Array.isArray(value.position)){
				value.position.forEach(el => {
					this.rows.push(Object.assign({}, el))
				});
			}
			this.dirty = false;
			setTimeout(() => {
				let el = document.getElementById("editTitle");
				el.focus();
			}, 700);
		},
		cursor(value) {
			if(value > -1) {
				setTimeout(() => {
					let el;
					if(this.display == "col3") {
						el = document.getElementById("editName");
						el.focus();
						el.addEventListener('keydown', this.onKeydown, false);
						el.addEventListener('blur', this.onFocus, false);
						el.addEventListener('change', this.onChange, false);
					}

					el = document.getElementById("editStart");
					el.addEventListener('keydown', this.onKeydown, false);
					el.addEventListener('blur', this.onFocus, false);
					el.addEventListener('change', this.onChange, false);
					if(this.display == "col2") el.focus();

					el = document.getElementById("editEnd");
					el.addEventListener('keydown', this.onKeydown, false);
					el.addEventListener('blur', this.onFocus, false);
					el.addEventListener('change', this.onChange, false);
				}, 300);
			} else {
				let el;
				if(this.display == "col3") {
					el = document.getElementById("editName");
					el.removeEventListener('keydown', this.onKeydown, false);
					el.removeEventListener('keydown', this.onFocus, false);
					el.removeEventListener('change', this.onChange, false);
				}
				el = document.getElementById("editStart");
				el.removeEventListener('keydown', this.onKeydown, false);
				el.removeEventListener('keydown', this.onFocus, false);
				el.removeEventListener('change', this.onChange, false);

				el = document.getElementById("editEnd");
				el.removeEventListener('keydown', this.onKeydown, false);
				el.removeEventListener('keydown', this.onFocus, false);
				el.removeEventListener('change', this.onChange, false);
			}
		},
	}
});