Vue.component('dlg-paragraph', { 
	template:  `<modal title="段落" v-model="v" id="paragraph"
			:width="310"
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
		<div slot="footer" style="display: flex; flex-direction: row; justify-content: flex-start;
			align-items: center;">
			<div style="flex: 1; text-align: left;">
				<Icon type="ios-arrow-back" size="28" 
					:color="iconColor1"
					style="cursor: pointer; padding: 3px 5px; border-radius: 5px; border: 1px solid #e6e6e6;"
					@click.native="moveTo(-1)"
				/>
				<Icon type="ios-arrow-forward" size="28" 
					:color="iconColor2"
					style="cursor: pointer; padding: 3px 5px; border-radius: 5px; border: 1px solid #e6e6e6;"
					@click.native="moveTo(1)"
				/>
			</div>
			<i-button v-if="block2.length == 2" @click="onClickAll">{{"取消"}}</i-button>
			<i-button @click="onCancel">關閉</i-button>
			<i-button type="primary" @click="onOK">確定</i-button>
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
		onClickAll(){
			if(this.block2.length == 0) {
				this.block2[0] = 0;
				this.block2[1] = this.paragraph2.length - 1;
			} else {
				this.block2 = [];
			}
			this.change();
		},
		moveTo(index){
			if(index == -1 && this.iconEable(0)) {
				this.block2 = [
					this.block2[0] + index,
					this.block2[1] + index
				];
				this.change();
			} else if(index == 1 && this.iconEable(1)) {
				this.block2 = [
					this.block2[0] + index,
					this.block2[1] + index
				];
				this.change();
			}
		},
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
			if(this.block2.length == 0) {
				this.block2 = [index, index];
			} else if(this.block2[0] != this.block2[1] && this.block2[0] == index) {
				this.block2[0]++;
			} else if(this.block2[0] != this.block2[1] && this.block2[1] == index) {
				this.block2[1]--;
			} else if(this.block2[0] <= index && this.block2[1] >= index) {
				this.block2 = [];
			} else {
				let start = this.block2[0] > index ? index : this.block2[0];
				let end = this.block2[1] < index ? index : this.block2[1];
				this.block2 = [start, end];
			}
			this.change();
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
		},
		iconEable(index){
			if(index == 0)
				return this.block2.length == 2 && this.block2[0] > 0 ? true : false;
			else 
				return this.block2.length == 2 && this.block2[1] < this.paragraph2.length - 1 ? true : false;
		}
	},
	computed: {
		iconColor1() {
			return this.iconEable(0) ? 'black' : '#e6e6e6';
		}, 
		iconColor2() {
			return this.iconEable(1) ?  'black' : '#e6e6e6';
		}
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
			if(this.v)this.change();
		},
		block(value) {
			this.block2 = [];
			value.forEach((el, index) => {
				this.block2.push(el);
				this.$set(this.block2, index, el);
			});
			if(this.v) this.change();
		},
	}
});