Vue.component('list', { 
	template:  `<div class="page" id="list">
		<header-bar title="定時定點">
			<Select slot="right" v-model="area" filterable @on-change="onChangeOption" style="width: 100px; margin-right: 10px;">
				<Option v-for="item in areas" :value="item" :key="item">{{ item }}</Option>
			</Select>
		</header-bar>
		<div ref="frame" style="flex: 1; background-color: red;">
			<Table width="100%" :height="height" border :columns="columns" :data="datas"></Table>
		</div>
	</div>`,
	props: {
	},
	data() {
		return {
			columns: [
				{title: '行政區', key: 'area', fixed: 'left', width: 100},
				{ title: '里別', key: 'village', fixed: 'left', width: 100},
				{ title: '清運方式', key: 'task_type', fixed: 'left', width: 120},
				{ title: '車牌', key: 'car_licence', fixed: 'left', width: 120},
				{ title: 'caption', key: 'caption'},
			],
			datas: [],
			area: "",
			areas: [],
			height: 0
		};
	},
	created(){
	},
	async mounted () {
		this.onResize();
		this.broadcast.$on('onResize', this.onResize);
		this.storage = this.$storage("trashCar-list");
		this.api();
	},
	destroyed() {
		this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
		onChangeOption(){
			vm.loading();
			setTimeout(() => {
				this.filter();
			}, 600);
		},
		onResize(){
			let viewer = this.$refs["frame"];
			this.height = viewer.clientHeight;
			// let scrollTop = viewer.scrollTop, clientHeight = viewer.clientHeight;
		},
		filter(){
			if(this.area.length > 0) {
				let data = this.storage.datas.filter((item, index)=>{
					return item.area == this.area && item.task_type == "定點";
				});
				console.log(data[0])
					// // data.sort((a, b) => {
					// // 	a = a.car_licence;
					// // 	b = b.car_licence;
					// // 	if(a > b)
					// // 		return 1;
					// // 	else if(a < b)
					// // 		return -1;
					// // 	else
					// // 		return 0;
					// // });
					// // console.log(JSON.stringify(data))
					// console.log(data)
					// this.datas = data;
					// for(let i = 0; i < 10; i++) {
					// 	this.$set(this.datas, i, data[i])
					// }
					this.datas = data;
				} else {
					this.datas = [];
				}
				vm.loading(false);
		},
		api(){ // 定時定點垃圾收運地點
			vm.loading();
			fetch('https://api.kcg.gov.tw/api/service/Get/1adb56ea-ee44-4bc2-b5ee-e236690e3f3c')
			.then(function(response) {
				return response.json();
			})
			.then((result) => {
				console.log(result)
				let s1 = "";
				result.data.forEach(item=>{
					// return item.area == "楠梓區"
					if(item.area != s1){
						this.areas.push(item.area)
						s1 = item.area;
					}
				});
				this.storage = Object.assign(this.storage, {areas: this.areas, datas: result.data});
				// this.$storage("trashCar-list", this.storage);
				this.filter();
			});
		},
	},
	watch: {
	}
});
/*
https://www.iviewui.com/components/table
*/