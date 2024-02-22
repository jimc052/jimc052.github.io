Vue.component('vm-canvas', { 
	template:  `
		<canvas ref="canvas" :width="size" :height="size" style="background: white"></canvas>
  `,
	props: {
		size: {
			type: Number,
			// require: true, 
			default: 72 
		},
		char: {
			type: String,
			default: ""
		},
		font: {
			type: String,
			default: "楷體-繁"
		},
	},
	data() {
		return {
		};
	},
	created(){
	},
	async mounted () {
		this.canvas = this.$refs["canvas"];
		this.ctx = this.canvas.getContext('2d');

		let lineWidth = 10, color = "black";
		let width = this.canvas.width, height = this.canvas.height;
		if (window.devicePixelRatio) {
			this.canvas.style.width = width + "px";
			this.canvas.style.height = height + "px";
			this.canvas.height = height * window.devicePixelRatio;
			this.canvas.width = width * window.devicePixelRatio;
			this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		}
		// mouse
		let getMousePos =(canvas, evt) => {
			var rect = this.canvas.getBoundingClientRect();
			return {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			};
		}

		let mouseMove = (evt) => {
			this.ctx.strokeStyle = color;
			var mousePos = getMousePos(this.canvas, evt);
			this.ctx.lineCap = "round";
			this.ctx.lineWidth = lineWidth;
			this.ctx.lineJoin="round";
			this.ctx.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒 
			this.ctx.shadowColor = 'black';// 邊緣顏色
			this.ctx.lineTo(mousePos.x, mousePos.y);
			this.ctx.stroke();
		}

		this.canvas.addEventListener('mousedown', (evt) => {
			var mousePos = getMousePos(this.canvas, evt);
			this.ctx.beginPath();
			this.ctx.moveTo(mousePos.x, mousePos.y);
			evt.preventDefault();
			this.canvas.addEventListener('mousemove', mouseMove, false);
		});

		this.canvas.addEventListener('mouseup', () => {
			this.canvas.removeEventListener('mousemove', mouseMove, false);
		}, false);

		// touch
		let getTouchPos = (canvas, evt) => {
			var rect = this.canvas.getBoundingClientRect();
			return {
				x: evt.touches[0].clientX - rect.left,
				y: evt.touches[0].clientY - rect.top
			};
		}

		let touchMove = (evt) => {
			this.ctx.strokeStyle = color;
			// console.log("touchmove")
			var touchPos = getTouchPos(canvas, evt);
			// console.log(touchPos.x, touchPos.y)
			
			this.ctx.lineWidth = lineWidth;
			this.ctx.lineCap = "round"; // 繪制圓形的結束線帽
			this.ctx.lineJoin="round"; // 兩條線條交匯時，建立圓形邊角
			this.ctx.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒 
			this.ctx.shadowColor = 'black'; // 邊緣顏色
			this.ctx.lineTo(touchPos.x, touchPos.y);
			this.ctx.stroke();
		}

		this.canvas.addEventListener('touchstart', (evt) => {
			// console.log('touchstart')
			// console.log(evt)
			var touchPos = getTouchPos(canvas, evt);
			this.ctx.beginPath(touchPos.x, touchPos.y);
			this.ctx.moveTo(touchPos.x, touchPos.y);
			evt.preventDefault();
			this.canvas.addEventListener('touchmove', touchMove, false);
		});

		this.canvas.addEventListener('touchend', () => {
			// console.log("touchend")
			this.canvas.removeEventListener('touchmove', touchMove, false);
		}, false);

		this.drawBackground();
		// this.render();
	},
	destroyed() {
  },
	methods: {
		render() {
			// letter.style.fontSize = Math.floor(this.size * 0.9) + "px";
			// letter.style.top = "-5px";
			// letter.style.fontFamily = this.font; // "メイリオ";
			// letter.style.color = "#c4c4c4";
			this.ctx.strokeStyle = "red";
			this.ctx.textAlign = "center";
			this.ctx.font = `${Math.floor(this.size * 0.8)}px ${this.font}`;
			this.ctx.strokeText(this.char, this.canvas.width/2, this.canvas.height * 0.75);
		},
		clear() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},
		drawBackground() {
			let height = this.canvas.height, width = this.canvas.width;
			this.ctx.lineWidth = 2;
			// this.ctx.strokeStyle = "red";
			this.ctx.strokeStyle = '#DCDCDC';
			let drawGrid = () => { // 新九宮格
				let j = 4;
				let x = width / j + 1;
				for (let i = 0; i < j + 1; i++) {
					this.ctx.beginPath();
					
					this.ctx.moveTo(x * (i + 1), 0);
					this.ctx.lineTo(x * (i + 1), height);
					this.ctx.stroke();
				}
				let y = height / j + 1;
				for (let i = 0; i < j + 1; i++) {
					this.ctx.beginPath();
					this.ctx.moveTo(0, y * (i + 1));
					this.ctx.lineTo(width, y * (i + 1));
					this.ctx.stroke();
				}				
			}
			drawGrid();
		},
	},
	watch: {
		size(value) {
			// console.log(value)
		},
		char(value) {
			this.clear();
			// console.log(value)
		},
		font(vale) {
			this.render();
		}
	},
});
