Vue.component('yt-document', { 
	template:  `
    <modal v-model="visible" class-name="vertical-center-modal"
        :title="title"
        fullscreen style="overflow: hidden;" id="dlgDocument">
      <div id="divDocument" v-html="html" style="width: 100%; height: 100%; user-select: text !important;" />
      <div slot="footer">
        <Button @click="copy"  type="success">Copy</Button>
				<Button @click="close">關閉</Button>
      </div>
    </modal>
  `,
	props: {
		menu: {
			type: Array,
		},
    title: {
      type: String,
      default: "本文"
    }
	},
	data() {
		return {
      html: "",
      visible: false
		};
	},
	created(){
	},
	mounted () {
		// let header = document.querySelector("#dlgDocument .ivu-modal-header");
		// if(header != null) header.parentNode.removeChild(header);

		// let close = document.querySelector("#dlgDocument .ivu-modal-close");
		// if(close != null) close.parentNode.removeChild(close);
	},
	destroyed() {
  },
	methods: {
    close() {
			this.$emit('on-close');
		},
    copy() {
      var content = document.getElementById('divDocument').innerHTML;
      navigator.clipboard.writeText(content)
      .then(() => {
          alert("Text copied to clipboard...")
      }).catch(err => {
          console.log('Something went wrong', err);
      })
    }
	},
	computed: {
	},
	watch: {
		menu(value) {
      this.html = "";
      if(value.length == 0) {
        this.visible = false;
      } else {
        this.visible = true;
        for(let i = 0; i < value.length; i++) {
          let row = value[i];
          if(Array.isArray(row.topic) ){
            this.html += (this.html.length > 0 ? "<br />" : "") +
              `<h3 style="page-break-after:always; user-select: text !important;">${row.title}</h3>`;

            let topics = row.topic;
            for(let j = 0; j < topics.length; j++) {
              let topic = topics[j];
              topic.question = topic.question.replace(/(?:\r\n|\r|\n)/g, '<br/>&nbsp;&nbsp;&nbsp;');
              this.html += `<div style="user-select: text !important;">${topic.question}</div>`;
            }
          }
        }
      }
    }
	}
});