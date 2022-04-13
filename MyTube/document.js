Vue.component('yt-document', { 
	template:  `
    <modal v-model="visible" class-name="vertical-center-modal"
        :title="title"
        fullscreen style="overflow: hidden;" id="dlgDocument">
      <div id="divDocument" v-html="html" style="width: 100%; height: 100%; user-select: text !important;" />
      <div slot="footer">
        <a id="linkMP3" href="https://docs.google.com/document/d/1DYSFuPRX7RnqAGBtVv1tKQ6bFLUBmcOerrRPpfTw1e8/edit#" 
          target="_blank" style="margin: 0px 10px;">Google Document</a>
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
      let id = "divDocument";
      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(id));
        range.select().createTextRange();
        document.execCommand("copy");
      } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(id));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        alert("Text has been copied, now paste in the text-area")
      }
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
              `<h3 style="font-size: 22px;  user-select: text !important;">${row.title}</h3>`;

            let topics = row.topic;
            for(let j = 0; j < topics.length; j++) {
              let topic = topics[j];

              let question = topic.question;
              let _index = question.indexOf(". ");
              if(_index > -1 && _index < 4)
                question = question.substr(_index + 2)
              question = question.replace(/(?:\r\n|\r|\n)/g, '<br/>');
              
              this.html += `<div style="font-size: 20px; user-select: text !important; display: flex; flex-direction: row;">`
                + `<span style="color: grey; font-size: 20px; user-select: text !important;">${(j + 1) + '.&nbsp;'}</span>` 
                + `<span style="font-size: 20px; user-select: text !important; flex: 1; ">${question}</span>`
                + `</div>`;
            }
          }
        }
      }
    }
	}
});