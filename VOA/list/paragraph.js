Vue.component('dlg-paragraph', { 
	template:  `<modal title="段落" v-model="v" id="paragraph"
			:width="310"
			@on-ok="onOK" @on-cancel="onCancel"
			@on-visible-change="onVisibleChange"
		>

		<div v-for="(item, index) in paragraph2" :key="index"
			@click.stop='onClick(index)'
			:style="{
				display: 'inline-block', 
				'text-align': 'center', 
				width: '50px',
				padding: '10px 0px', margin: '2px', 
				border: '1px solid #c5c5c5',
				'border-radius': '5px',
				color: item == true ? 'white' : 'black',
				background: item == true ? '#c01921' : 'white'
			}">
			<div >{{index + 1}}</div>
		</div>

	</modal>`,
	props: {
		visible: Boolean,
		paragraph: Array,
		block: Array
	},
	data() {
		return {
			v: false,
			paragraph2: [],
			block2: []
		};
	},
	created(){
	},
	async mounted () {
	},
	destroyed() {
  },
	methods: {
		onOK(){
			this.v = false;
			let b = this.block2.length != this.block.lengt ||
			  (this.block2.length == this.block.length && this.block2.length == 2 &&
				(this.block2[0] != this.block[0] || this.block2[1] != this.block[1]))
				? this.block2 : null;
			this.$emit("close", b);
		},
		onCancel(){
			this.v = false;
			this.$emit("close");
		}, 
		onClick(index) {
			console.log("onClick: " + index)
			if(this.block2.length == 0) {
				this.block2 = [index, index];
			} else if(this.block2[0] <= index && this.block2[1] >= index) {
				this.block2 = [];
			} else {
				let start = this.block2[0] > index ? index : this.block2[0];
				let end = this.block2[1] < index ? index : this.block2[1];
				this.block2 = [start, end];
			}
			this.change();
			// console.log(this.block2)
		},
		onVisibleChange(v){
			if(v == true) {
				this.change();
			}
		},
		change(){
			this.paragraph2.forEach((el, index) => {
				this.$set(this.paragraph2, index, 
					(this.block2.length == 2 && index >= this.block2[0] && index <= this.block2[1])
					? true : false)
			});
		}
	},
	computed: {
	},
	watch: {
		visible(value) {
			if(value) this.v = true;
		},
		paragraph(value) {
			this.paragraph2 = [];
			value.forEach((el, index) => {
				this.paragraph2.push(false)
				this.$set(this.paragraph2, index, false);
			});
			this.change();
		},
		block(value) {
			this.block2 = [];
			value.forEach((el, index) => {
				this.block2.push(el);
				this.$set(this.block2, index, el);
			});
			this.change();
		},
	}
});