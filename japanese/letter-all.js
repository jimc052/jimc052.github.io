Vue.component('letter-all', { 
	template:  `<div id="frame-letter-all" style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start;">
		<div id="header" style="display: flex; flex-direction: row; margin: 5px; z-index: 10; align-items: center;">
			<RadioGroup  v-model="index" type="button" style="" @on-change="onChangeIndex">
				<Radio label="0">清音</Radio>
				<Radio label="1">濁音</Radio>
			</RadioGroup>

			<div style="width: 60px;"></div>

			<RadioGroup  v-model="word" type="button" @on-change="onChangeWord">
				<Radio label="平">平假</Radio>
				<Radio label="片">片假</Radio>
			</RadioGroup>

			<div style="width: 60px;"></div>

			<Select v-model="font" style="width:200px" @on-select="onSelect">
        <Option v-for="item in fonts" :value="item" :key="item">{{ item }}</Option>
    	</Select>

		</div>
		<div style="flex: 1; overflow: auto; width: 100%; ">
			<div v-for="(item1, index1) in datas[index]" :key="index1" style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;"
				:style="{'margin-top': index1 > 0 ? '10px' : '' }"
			>
				<div v-for="(item2, index2) in datas[index][index1]" :key="index2" :style="{'margin-left': index2 > 0 ? '10px' : '' }">
					<vm-canvas :ref="'canvas_' + index1 + '_' + index2 " 
						v-if="size > 0" style="margin-top: 0px;" :size="size" 
						:char="row > -1 && datas[index][index1][index2] != null ? datas[index][index1][index2][word] : '' " 
						:mp3="row > -1 && datas[index][index1][index2] != null ? datas[index][index1][index2]['mp3'] : '' " 
						:style="{width: size + 'px'}"
						:font="font"
					>
					</vm-canvas>
				</div>
			</div>
		</div>

		<i-button icon="md-refresh" type="primary" shape="circle" circle 
			@click.native="onClickClear()" size="large"
			style="position: absolute; bottom: 10px; right: 10px;"
		/>
  </div>`,
	props: {
	},
	data() {
		return {
			size: 180,
			index: "0",
			word: "平",
			row: 0,
			col: 0,
			datas: this.$japanese(),
			font: typeof localStorage["japanese-font"] == "string" ? localStorage["japanese-font"] : "メイリオ", 
			fonts: ["メイリオ", "Hiragino Kaku Gothic Pro", "Osaka", ]
			// "ヒラギノ角ゴ Pro W3", "Meiryo", "ＭＳ Ｐゴシック", "MS PGothic", "sans-serif"
		};
	},
	created(){
	},
	async mounted () {
		// setTimeout(() => {
		// 	this.onClickClear()
		// }, 600);
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
		onClickClear() {
			for(let key in this.$refs) {
				this.$refs[key][0].render()
			}
		},
		onSelect(e) {
			this.font = e.label;
			localStorage["japanese-font"] = this.font;
		}
	},
	watch: {
	},
});