Vue.component('header-bar', { 
	template: `<div :style="{background: '#2d8cf0', 
				'display': 'flex', 'flex-direction': 'row', 'justify-content': 'flex-start',
				'align-items': 'center',
				height: '50px',
				}">
			<Icon :type="icon" size="28" color="white" @click.native="onClickIcon" 
				style="cursor: pointer; margin-left: 10px;"></Icon>
			<div :style="{flex: 1, color: 'white', 
					'font-size': '20px', 
					'margin': '0px 10px', 
					'user-select': 'text !important',
					'padding': '5px 0px'
				}" 
				class="text-overflow">{{title}}</div>
			<slot name="right"></slot>
		</div>`
	,
	props: {
		title: String,
		icon: {
			type: String,
			default: 'md-menu',
			require: true
		},
	},
	data() {
		return {
		};
	},
	created(){
	},
	mounted(){
		
	},
	destroyed(){
  },
	methods: {
		onClickIcon() {
			if(this.icon == "md-menu")
				vm.showDrawer();
			else
				this.$emit("goBack")
		}
	}
});
