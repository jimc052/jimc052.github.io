Vue.component('vue-item', { 
  template:  `<div style="display: inline-block">
      <canvas :id="barcode"></canvas>
      <div class="text">{{(index + 1) + ": " + item.text}}</div>
    </div>
  `,
	props: {
		item:  Object,
    index: Number
	},
	data() {
		return {
      type: "",
      barcode: "_0",
      json: {}
		};
	},
	created(){
	},
	async mounted () {
    this.barcode = "_" + this.index;
    setTimeout(() => {
      if(typeof this.item == "object" && typeof this.item.value != "undefined") {
        this.render();
      }    
    }, 200);
	},
	destroyed() {
  },
	methods: {
    render() {
      JsBarcode("#" + this.barcode, this.item.value, {
        height: 60,
        width: 1,
        // textMargin: 0,
        // displayValue: false,
        // fontSize: 40,
        // background: "#4b8b7f",
        // lineColor: "#ffffff",
        // margin: 40,
        // marginLeft: 80
      });
    }
  },
  computed: {
  },
	watch: {
    item(value) {
      this.render();
    }, 
	}
});
/*



	// https://github.com/lindell/JsBarcode
	JsBarcode("#barcode1", "Hi!", {
  fontSize: 40,
  background: "#4b8b7f",
  lineColor: "#ffffff",
  margin: 40,
  marginLeft: 80
});

JsBarcode("#barcode2", "Hi!", {
  textAlign: "left",
  textPosition: "top",
  font: "cursive",
  fontOptions: "bold",
  fontSize: 40,
  textMargin: 15,
  text: "Special"
});

JsBarcode("#barcode3", "1234", {
  format: "pharmacode",
  displayValue: false,
  height: 50,
  width: 6
});

*/