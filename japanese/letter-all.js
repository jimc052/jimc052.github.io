Vue.component('letter-all', { 
	template:  `<div id="frame" style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start;">
		<div id="header" style="display: flex; flex-direction: row; margin: 5px; z-index: 10;">
			<RadioGroup  v-model="index" type="button" style="" @on-change="onChangeIndex">
				<Radio label="0">清音</Radio>
				<Radio label="1">濁音</Radio>
			</RadioGroup>

			<div style="width: 60px;"></div>

			<RadioGroup  v-model="word" type="button" @on-change="onChangeWord">
				<Radio label="平">平假</Radio>
				<Radio label="片" v-if="index == 0">片假</Radio>
			</RadioGroup>
		</div>
		<div style="flex: 1; overflow: auto; width: 100%; ">
			<div v-for="(item1, index1) in datas[index]" :key="index1" style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;"
				:style="{'margin-top': index1 > 0 ? '10px' : '' }"
			>
				<div v-for="(item2, index2) in datas[index][index1]" :key="index2" :style="{'margin-left': index2 > 0 ? '10px' : '' }">
					<vm-canvas ref="canvas" v-if="size > 0" style="margin-top: 0px;" :size="size" 
						:char="row > -1 && datas[index][index1][index2] != null ? datas[index][index1][index2][word] : '' " 
						:style="{width: size + 'px'}"
					>
					</vm-canvas>
				</div>
			</div>
		</div>
  </div>`,
	props: {
	},
	data() {
		return {
			size: 0,
			index: "0",
			word: "平",
			row: 0,
			col: 0,
			question: 0,
			seconds: 10,
			marks: {
				5: '5',
				10: '10',
				15: '15',
				20: '30',
				25: '25',
				30: '30',
			},
			datas: this.$japanese(),
			
		};
	},
	created(){
	},
	async mounted () {
		this.size = 160;
		
	},
	destroyed() {
  },
	methods: {
		onChangeIndex() {
			let o = document.activeElement;
			o.blur();
			if(this.index != "0") {
				this.word = "平"
			}
			this.row = 0;
			this.col = 0;
		},
		onChangeWord() {
			let o = document.activeElement;
			o.blur();
		},
	},
	watch: {
	},
});