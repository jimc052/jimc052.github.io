Vue.component('new-item', { 
	template:  `<modal v-model="modal" class-name="vertical-center-modal" id="newItem"
		 :title="title">
		<div v-if="modal">
			<div>{{"report: " + json.report}}</div>
			<div>{{"key: " + json.key}}</div>
			<div>{{"date: " + json.date}}</div>
			<div>{{"mp3: " + mp3}}</div>
		</div>
		<div slot="footer">
			<i-button @click="onCancel">取消</i-button>
			<i-button type="primary" @click="onSave">確定</i-button>
		</div>
	</modal>`,
	props: ["json"],
	data() {
		return {
			modal: false,
			title: "",
			base64: "",
			mp3: "",
			count: 0
		};
	},
	created(){
	},
	mounted () {
		this.count = 0;
	},
	destroyed() {
		let el = document.querySelector("#newItem .ivu-modal-content");
		el.removeEventListener('dragenter', this.onDragEnter,false);
		el.removeEventListener('dragleave', this.onDragLeave,false);
		el.removeEventListener('dragover', this.onDragOver,false);
		el.removeEventListener('drop', this.onDrop,false);
  },
	methods: {
		onDragEnter(e){
			e.preventDefault();
			let el = document.querySelector(".ivu-modal-content");
			el.classList.add("drag")
			this.count++;
		},
		onDragLeave(e){
			e.preventDefault();
			this.count--;
			if(this.count == 0) {
				let el = document.querySelector(".ivu-modal-content");
				el.classList.remove("drag")
			}
		},
		onDragOver(e){
			e.preventDefault();
		},
		onDrop(e){
			this.count = 0;
			let self = this;
			e.preventDefault();
		  if (e.dataTransfer.items) {
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
          if (e.dataTransfer.items[i].kind === 'file') {
						var file = e.dataTransfer.items[i].getAsFile();
						self.mp3 = file.name;
						let reader = new FileReader();
						reader.onload = function (event) {
							self.base64 = event.target.result;
						};
						reader.readAsDataURL(file);  
          }
        }
			}
			let el = document.querySelector(".ivu-modal-content");
			el.classList.remove("drag")
		},
		async onSave(){
			let json = {
				key: this.json.key,
				title: this.json.title,
				report: this.json.report,
				date: this.json.date,
				html: this.json.html
			};
			try {
				await FireStore.update(json)
				if(this.base64.length > 0)
					await FireStore.uploadString("VOA/" + this.json.report + "/" + this.json.key + ".mp3", this.base64)
				this.$emit("onClose", json);		
				this.base64 = "";			
			} catch(e) {
				console.log(e)
			}
		},
		onCancel() {
			this.$emit("onClose")
		}
	},
	watch: {
		json(value) {
			this.modal = value == null ? false : true;
			let el = document.querySelector("#newItem .ivu-modal-content");
			if(value != null) {
				this.title = value.title;
				el.addEventListener('dragenter', this.onDragEnter,false);
				el.addEventListener('dragleave', this.onDragLeave,false);
				el.addEventListener('dragover', this.onDragOver,false);
				el.addEventListener('drop', this.onDrop,false);
			} else {
				el.removeEventListener('dragenter', this.onDragEnter,false);
				el.removeEventListener('dragleave', this.onDragLeave,false);
				el.removeEventListener('dragover', this.onDragOver,false);
				el.removeEventListener('drop', this.onDrop,false);
			}
			this.count = 0;
			this.base64 = "";
			this.mp3 = "";
		}
	}
});