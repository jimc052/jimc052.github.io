/* */
Vue.component('vm-canvas', { 
	template:  `<div style="position: relative; z-index: 0;" :style="{width: size + 'px', height: size + 'px'}">
		<canvas ref="background" :width="size" :height="size" style="position: absolute;  z-index: 0; background: white;"></canvas>
		<div ref="letter" style="position: absolute; z-index: 0; top: 0px; background: transparent; display: flex; flex-direction: column; align-items: center; justify-content: center;"
		  :style="{width: size + 'px', height: size + 'px'}">
			{{char}}
		</div>
		<canvas ref="canvas" :width="size" :height="size" style="position: absolute;  z-index: 100; background: transparent;"></canvas>
  </div>`,
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
		this.drawBackground();
		this.render();			
	},
	destroyed() {
  },
	methods: {
		render() {
			let canvas = this.$refs["canvas"];
			let ctx = canvas.getContext('2d');
			let lineWidth = 10, color = "black";

			// let letter = this.$refs["letter"];
			// letter.style.fontSize = Math.floor(this.size * 0.9) + "px";
			// letter.style.top = "-5px";
			// letter.style.fontFamily = this.font; // "メイリオ";
			// letter.style.color = "#c4c4c4";
			
			let width = canvas.width, height = canvas.height;
			if (window.devicePixelRatio) {
				canvas.style.width = width + "px";
				canvas.style.height = height + "px";
				canvas.height = height * window.devicePixelRatio;
				canvas.width = width * window.devicePixelRatio;
				ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
			}
			// mouse
			function getMousePos(canvas, evt) {
				var rect = canvas.getBoundingClientRect();
				return {
					x: evt.clientX - rect.left,
					y: evt.clientY - rect.top
				};
			}

			function mouseMove(evt) {
				ctx.strokeStyle = color;
				var mousePos = getMousePos(canvas, evt);
				ctx.lineCap = "round";
				ctx.lineWidth = lineWidth;
				ctx.lineJoin="round";
				ctx.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒 
				ctx.shadowColor = 'black';// 邊緣顏色
				ctx.lineTo(mousePos.x, mousePos.y);
				ctx.stroke();
			}

			canvas.addEventListener('mousedown', function(evt) {
				var mousePos = getMousePos(canvas, evt);
				ctx.beginPath();
				ctx.moveTo(mousePos.x, mousePos.y);
				evt.preventDefault();
				canvas.addEventListener('mousemove', mouseMove, false);
			});

			canvas.addEventListener('mouseup', function() {
				canvas.removeEventListener('mousemove', mouseMove, false);
			}, false);

			// touch
			function getTouchPos(canvas, evt) {
				var rect = canvas.getBoundingClientRect();
				return {
					x: evt.touches[0].clientX - rect.left,
					y: evt.touches[0].clientY - rect.top
				};
			}

			function touchMove(evt) {
				ctx.strokeStyle = color;
				// console.log("touchmove")
				var touchPos = getTouchPos(canvas, evt);
				// console.log(touchPos.x, touchPos.y)
				
				ctx.lineWidth = lineWidth;
				ctx.lineCap = "round"; // 繪制圓形的結束線帽
				ctx.lineJoin="round"; // 兩條線條交匯時，建立圓形邊角
				ctx.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒 
				ctx.shadowColor = 'black'; // 邊緣顏色
				ctx.lineTo(touchPos.x, touchPos.y);
				ctx.stroke();
			}

			canvas.addEventListener('touchstart', function(evt) {
				// console.log('touchstart')
				// console.log(evt)
				var touchPos = getTouchPos(canvas, evt);
				ctx.beginPath(touchPos.x, touchPos.y);
				ctx.moveTo(touchPos.x, touchPos.y);
				evt.preventDefault();
				canvas.addEventListener('touchmove', touchMove, false);
			});

			canvas.addEventListener('touchend', function() {
				// console.log("touchend")
				canvas.removeEventListener('touchmove', touchMove, false);
			}, false);
		},
		clear() {
			let canvas = this.$refs["canvas"];
			let ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		},
		drawBackground() {
			let canvas = this.$refs["background"];
			let ctx = canvas.getContext('2d');
			let height = canvas.height, width = canvas.width;
			ctx.lineWidth = 2;

			ctx.strokeStyle = "red";
			ctx.textAlign = "center";
			ctx.font = `${Math.floor(this.size * 0.8)}px ${this.font}`;
			ctx.strokeText(this.char + "a", canvas.width/2, canvas.height * 0.75);

			ctx.strokeStyle = '#DCDCDC';
			let drawGrid = () => { // 新九宮格
				let j = 4;
				let x = width / j + 1;
				for (let i = 0; i < j + 1; i++) {
					ctx.beginPath();
					
					ctx.moveTo(x * (i + 1), 0);
					ctx.lineTo(x * (i + 1), height);
					ctx.stroke();
				}
				let y = height / j + 1;
				for (let i = 0; i < j + 1; i++) {
					ctx.beginPath();
					ctx.moveTo(0, y * (i + 1));
					ctx.lineTo(width, y * (i + 1));
					ctx.stroke();
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
			console.log(value)
		},
		font(vale) {
			this.render();
		}
	},
});
