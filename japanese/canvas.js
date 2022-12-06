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
			default: 300 
		},
		char: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
		};
	},
	created(){
	},
	async mounted () {
		if(this.char.length > 0) {
			this.drawGrid();
			this.render();			
		} else {
			["background", "canvas", "letter"].forEach(el =>{
				let ref = this.$refs[el];
				if(ref != null) ref.style.display = "none";
			});
		}
	},
	destroyed() {
  },
	methods: {
		render() {
			let canvas = this.$refs["canvas"];
			let letter = this.$refs["letter"];
			let ctx = canvas.getContext('2d');
			let lineWidth = 10, color = "black";
			// letter.style.cursor = "pointer";

			// canvas.style.width = this.size + "px";
			// canvas.style.height = this.size + "px";
			
			// letter.style.width = this.size + "px";
			// letter.style.height = this.size + "px";
			// letter.style.marginTop = (this.size * -1) + "px";
			letter.style.fontSize = (this.size - 20) + "px";
			letter.style.fontFamily = "メイリオ";
			letter.style.color = "#c4c4c4";
			
			let width = canvas.width, height = canvas.height;
			if (window.devicePixelRatio) {
				canvas.style.width = width + "px";
				canvas.style.height = height + "px";
				canvas.height = height * window.devicePixelRatio;
				canvas.width = width * window.devicePixelRatio;
				ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
			}

			// font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
			

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
		drawGrid() {
			let canvas = this.$refs["background"];
			let ctx = canvas.getContext('2d');
			let height = canvas.height, width = canvas.width;
			ctx.lineWidth = 2;

			ctx.strokeStyle = '#DCDCDC';
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
			// font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
		},
	},
	watch: {
		size(value) {
			// console.log(value)
		},
		char(value) {
			this.clear();
			// console.log(value)
		}
	},
});
