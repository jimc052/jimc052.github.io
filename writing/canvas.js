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

		let lineWidth = this.size == 72 ? 1 : 5, color = "black";
		let width = this.canvas.width, height = this.canvas.height;
		if (window.devicePixelRatio) {
			// this.canvas.style.width = width + "px";
			// this.canvas.style.height = height + "px";
			// this.canvas.height = height * window.devicePixelRatio;
			// this.canvas.width = width * window.devicePixelRatio;
			// this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		}
		// mouse
		let getMousePos =(canvas, evt) => {
			let rect = this.canvas.getBoundingClientRect();
			return {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			};
		}

		let mouseMove = (evt) => {
			this.ctx.strokeStyle = color;
			let mousePos = getMousePos(this.canvas, evt);
			this.ctx.lineCap = "round";
			this.ctx.lineWidth = lineWidth;
			this.ctx.lineJoin="round";
			this.ctx.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒 
			this.ctx.shadowColor = 'black';// 邊緣顏色
			this.ctx.lineTo(mousePos.x, mousePos.y);
			this.ctx.stroke();
		}

		this.canvas.addEventListener('mousedown', (evt) => {
			let mousePos = getMousePos(this.canvas, evt);
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
			let rect = this.canvas.getBoundingClientRect();
			return {
				x: evt.touches[0].clientX - rect.left,
				y: evt.touches[0].clientY - rect.top
			};
		}

		let touchMove = (evt) => {
			this.ctx.strokeStyle = color;
			// console.log("touchmove")
			let touchPos = getTouchPos(canvas, evt);
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
			let touchPos = getTouchPos(canvas, evt);
			this.ctx.beginPath(touchPos.x, touchPos.y);
			this.ctx.moveTo(touchPos.x, touchPos.y);
			evt.preventDefault();
			this.canvas.addEventListener('touchmove', touchMove, false);
		});

		this.canvas.addEventListener('touchend', () => {
			// console.log("touchend")
			this.canvas.removeEventListener('touchmove', touchMove, false);
		}, false);

		// this.drawBackground();
		this.render();
	},
	destroyed() {
  },
	methods: {
		render() {
			this.drawBackground();

			if(typeof this.char == "string" && this.char.length > 0) {
				this.ctx.strokeStyle = "#c4c4c4";
				this.ctx.textAlign = "center";
				this.ctx.font = `${Math.floor(this.size * 0.8)}px ${this.font}`;
				// this.ctx.fillText(this.char, this.canvas.width / 2, this.canvas.height * 0.75);
				this.ctx.strokeText(this.char, this.canvas.width / 2, this.canvas.height * 0.75);
			}
		},
		clear() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.render();
		},
		drawBackground() {
			let height = this.canvas.height, width = this.canvas.width;
			this.ctx.lineWidth = 2;
			// this.ctx.strokeStyle = '#DCDCDC';
			this.ctx.strokeStyle = 'red';

			let drawGrid1 = () => { // 九宮格
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

			let drawGrid2 = () => { // 新九宮格
				let j = 4;
				let x = width / j + 1;
				for (let i = 0; i < j + 1; i++) {
					if(i == 0)
					  x = width * 0.15;
					else if(i == 1)
					  x = width * 0.5;
					else if(i == 2)
					  x = width * 0.85;
					this.ctx.beginPath();
					// this.ctx.moveTo(x * (i + 1), 0);
					// this.ctx.lineTo(x * (i + 1), height);
					this.ctx.moveTo(x, 0);
					this.ctx.lineTo(x, height);
					this.ctx.stroke();
				}
				let y = height / j + 1;
				for (let i = 0; i < j + 1; i++) {

					if(i == 0)
					  y = height * 0.15;
					else if(i == 1)
					  y = height * 0.5;
					else if(i == 2)
					  y = height * 0.85;

					this.ctx.beginPath();
					this.ctx.moveTo(0, y);
					this.ctx.lineTo(width, y);
					// this.ctx.moveTo(0, y * (i + 1));
					// this.ctx.lineTo(width, y * (i + 1));
					this.ctx.stroke();
				}				
			}

			let drawGridRice = () => { // 米
				this.ctx.lineWidth = 1;
				this.ctx.beginPath();
				this.ctx.moveTo(0, 0);
				this.ctx.lineTo(width, height);
				this.ctx.stroke();

				this.ctx.beginPath();
				this.ctx.moveTo(width, 0);
				this.ctx.lineTo(0, height);
				this.ctx.stroke();

				this.ctx.beginPath();
				this.ctx.moveTo(0, height / 2);
				this.ctx.lineTo(width, height / 2);
				this.ctx.stroke();
			}

			let drawBorder = () => { // 畫框
				this.ctx.lineWidth = 2;
				this.ctx.strokeStyle = 'red';
				// 上
				this.ctx.beginPath();
				this.ctx.moveTo(0, 0);
				this.ctx.lineTo(width, 0);
				this.ctx.stroke();

				// 左
				this.ctx.beginPath();
				this.ctx.moveTo(0, 0);
				this.ctx.lineTo(0, height);
				this.ctx.stroke();

				// 下
				this.ctx.beginPath();
				this.ctx.moveTo(0, height);
				this.ctx.lineTo(width, height);
				this.ctx.stroke();				

				// 右
				this.ctx.beginPath();
				this.ctx.moveTo(width, 0);
				this.ctx.lineTo(width, height);
				this.ctx.stroke();
			}
			// drawGrid1();
			drawGridRice();
			drawBorder();
		},
	},
	watch: {
		size(value) {
			// console.log(value)
		},
		char(value) {
			this.render();
			// this.clear();
			// console.log(value)
		},
		font(vale) {
			this.render();
		}
	},
});
