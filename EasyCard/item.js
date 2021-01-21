Vue.component('vue-item', { 
  template:  `<div class="rows" :class="{req: type == 'REQ'}" @click="onClick">
    <div v-if="type == 'REQ'">
      {{item.time.substr(11, 12) + " " + type +
        "：" + getT0300 +
        (json.T0300 == "881999" || json.T0300 == "900099" ? "" : "，序號：" + json.T1100) +
        (json.T0300 == "881999" || json.T0300 == "900099" ? "" : "，金額：" + json.T0400)
      }}
    </div>
    <div v-else>
      <div>{{item.time.substr(11, 12) + " " + type }}</div>
      <div :style="{color: json.result == 'OK' ? 'black' : 'red'}">
        {{"結果：" + json.result}}
      </div>
      <div v-if="typeof json.T0409 == 'string' && json.T0409.length > 0" style="color: green; font-weight: 700;">
        {{"儲值金：" + json.T0409 }}
      </div>
    </div>
	</div>`,
	props: {
		item: {
		},
	},
	data() {
		return {
      type: "",
      json: {}
		};
	},
	created(){
		
	},
	async mounted () {
    let errorTimes = 0;

    // console.log()
    this.type = this.item.data.indexOf('TM REQ') > -1 ? "REQ" : "RES";
    let T3900 = retrieve(this.item.data, "T3900"), 
      T3901 = retrieve(this.item.data, "T3901"), 
      T3902 = retrieve(this.item.data, "T3902"), 
      T3903 = retrieve(this.item.data, "T3903"), 
      T3904 = retrieve(this.item.data, "T3904")

    this.json = {
      T0300: retrieve(this.item.data, "T0300", "" ), // 交易別
      cardNo: retrieve(this.item.data, "T0200", "*****" ), // 卡號
      cardType: retrieve(this.item.data, "T0213", "*****" ), // 卡別, 聯名卡....
      cardBank: retrieve(this.item.data, "T4803", "*****" ), // 銀行
      T0400: retrieve(this.item.data, "T0400" ), // 扣款金額
      T0410: retrieve(this.item.data, "T0410" ), // 餘額
      T0409: retrieve(this.item.data, "T0409" ), // 目前沒用到，悠遊卡自動加值金額
      T0415: retrieve(this.item.data, "T0415" ), // 目前沒用到，悠遊卡交易前餘額
      T0416: retrieve(this.item.data, "T0416" ), // 目前沒用到，悠遊卡自動加值預設金額
      T1100: retrieve(this.item.data, "T1100" ),
      T1101: retrieve(this.item.data, "T1101"),
      T3900, 
      T3901, 
      T3902, 
      T3903, 
      T3904
    }
    if(typeof this.json.T0400 == "string" && this.json.T0400.length > 2)
      this.json.T0400 = this.json.T0400.substr(0, this.json.T0400.length - 2)
    if(typeof this.json.T0409 == "string" && this.json.T0409.length > 2)
      this.json.T0409 = this.json.T0409.substr(0, this.json.T0409.length - 2)
    if(this.type == "RES") {
      if(T3901 == "0" || T3900 == "FF54"){
        this.json.result = "OK";
      } else if(T3900 == "6304" || T3900 == "6305" || T3900 == "FF57"){// 
        this.json.result = "未登入";
      } else if(T3900 == "FF53"){
        this.json.result = "尚有交易未上傳, 正在重試系統結帳!!\n請等待完成後、再結帳付款!!!";
      } else {
        this.json.result = errorHandle(T3900, T3901, T3902, T3903, T3904);
      }
    }
    // console.log(this.json)

    function retrieve(s, tag, defaulValue){
      //defaulValue = (typeof == "string" ? defaulValue : null);
      if(typeof s == "undefined") return "*****";
      var s1 = "<" + tag + ">", s2 = "</" + tag + ">";
      var i1 = s.indexOf(s1);
      var x = s.substr( i1 + s1.length);
      var i2 = x.indexOf(s2);
      x = x.substr(0, i2);
      return i1 == -1 || i2 == -1 ? defaulValue : "" + x;
    }
    
    function errorHandle(T3900, T3901, T3902, T3903, T3904){
      let errMsg = {
        T3900: {
          /*"03": "悠遊卡帳戶尚未開通",
          "04": "卡片有誤，鎖卡",
          "05": "卡片損毀",
          "13": "金額有誤",
          "14": "卡號有誤",
          "19": "交易重覆",
          "51": "額度不足",
          "61": "超過金額上限",
          "98": "加值成功、但扣款失敗",
          */
        },
        T3901: {
           "-123": "餘額不足",
           "-125": "請重試",
              "-130": "票卡已退卡",
              "-131": "卡別錯誤",
              "-132": "票卡異常，請洽悠遊卡客服：412-8880，手機及金馬地區請加(02)",
              "-133": "票卡異常，請洽悠遊卡客服：412-8880，手機及金馬地區請加(02)",
              "-134": "未開卡之票卡"
              /*, 
          "-103": "系統參數設定有誤",
          "-104": "ICERAPI.REQ 格式有誤",
          "-109": "ICERAPI.REQ 格式有誤",
          "-110": "悠遊卡主機連線失敗",
          "-111": "悠遊卡主機連線失敗",
          "-117": "請先結帳",
          "-120": "悠遊卡主機連線失敗",
          "-121": "悠遊卡主機連線失敗",
          "-123": "餘額不足",
          "-125": "請重試", 
          "-130": "查無卡片",
          "-131": "卡別有誤",
          "-132": "黑名單，需鎖卡",
          "-133": "黑名單，已鎖卡",
          "-18": "傳輸資料有誤，長度不符"
          */
        },
        T3902: {
          "13": "請確認交易金額"
          /*
          "04": "鎖卡",
          "05": "卡片驗證有誤",
          "19": "交易重覆",
          "51": "額度不足",
          "54": "卡片過期",
          "61": "超過金額上限",
          "65": "超過加值次數",
          "76": "查無原始交易，無法取消、退貨。"
          */
        },
        T3903: {
        },
        T3904: {
              "6088": "線路不良／Time Out，請進行Retry",
              //"61XX": "票卡異常，請洽悠遊卡客服：412-8880，手機及金馬地區請加(02)",
              "6406": "請洽悠遊卡客服：412-8880，手機及金馬地區請加(02)",
              "6409": "請洽悠遊卡客服：412-8880，手機及金馬地區請加(02)",
              "640A": "請洽悠遊卡客服：412-8880，手機及金馬地區請加(02)",
              "640E": "請洽悠遊卡客服：412-8880，手機及金馬地區請加(02)",
              "6419": "請洽悠遊卡客服：412-8880，手機及金馬地區請加(02)",
              "6201": "找不到卡片，請重新操作",
              "6202": "讀卡失敗，請重新操作",
              "6203": "寫卡失敗，請重新操作",
              "6204": "多張卡，請重新操作",                        
              "6401": "確認是否為上一筆交易之卡片",  
              "6402": "確認交易金額及餘額",   
              "6403": "餘額不足請加值",
              "6404": "請確認交易卡片是否為目標交易卡片",
              "640C": "累計小額扣款(購貨)金額超出日限額",
              "640D": "單次小額扣款(購貨)金額超出次限額",
              "6410": "該卡不適用於此交易",
              "6411": "該卡不適用於此交易",
              "6412": "該卡不適用於此交易",
              "6413": "該卡不適用於此交易",
              "6414": "該卡不適用於此交易",
              "6417": "該卡不適用於此交易",
              "6416": "自動加值功能已開啟,不需再次開啟",
              "6418": "票卡於此通路限制使用",
        },
        Fixed: {
          "01": "票卡異常，請洽悠遊卡客服：412-8880，手機及金馬地區請加(02)",
          "02": "請與發卡銀行確認",
          "03": "請門市人員叫修"
        }
      }
      var msg = "";
      if(T3901 == "-101" && T3900 == "06"){
        msg = "code: T3901(T3900)(T3903)\nerror: ";
        if(T3903 == "04")
          msg += errMsg.Fixed["01"];
        else if("'057', 'C0'".indexOf("'" + T3903 + "'") > -1)
          msg += errMsg.Fixed["02"];
        else
          msg +=  errMsg.Fixed["03"];
      } else if(parseInt(T3901, 10) <= -1 && parseInt(T3901, 10) >= -11){
        if(errorTimes == 0){
          setTimeout(execQP1000, 500);
          errorTimes++;
          return;
        } else 
          msg = "code: T3901\nerror: " + errMsg.Fixed["03"]; //"Comport 連線有誤，請檢查線路重新啟用。";
      } else if(T3901 == "-101"){
        msg = "code: T3901(T3900)\nerror: ";
        if("'04', '54'".indexOf("'" + T3900 + "'") > -1)
          msg += errMsg.Fixed["01"];
        else if("'41', '51', '57'".indexOf("'" + T3900 + "'") > -1)
          msg += errMsg.Fixed["02"];
        else
          msg += errMsg.Fixed["03"];
      } else if(T3901 == "-102"){
        msg = "code: T3901(T3900)(T3903)\nerror: ";
        if("04" == T3903)
          msg += errMsg.Fixed["01"];
        else if("'057', 'C0'".indexOf("'" + T3903 + "'") > -1)
          msg += errMsg.Fixed["02"];
        else
          msg += errMsg.Fixed["03"];
      } else if(T3901 == "-119"){
        console.log("T3904: " + T3904)
        if(typeof T3904 == "undefined" || T3904 == "6201") {
          console.log("...............................")
        }
        msg = "code: T3901(T3904)\nerror: ";
        var code = "'6101', '6102', '6103', '6104', '6105', '6106', '6107', " +
          "'6108', '6109', '610A', '610B', '610C', '610D', ' 610E', '610F', " +
          "'6111', '6406', '6409', '640A', '640E', '6419'";
        if(typeof T3904 == "string" && code.indexOf("'" + T3904 + "'") > -1)
          msg += errMsg.Fixed["01"];
        else if(typeof T3904 == "string" && typeof errMsg.T3904[T3904] == "string")
          msg += errMsg.T3904[T3904];
        else
          msg += errMsg.Fixed["03"];
      } else if(T3901.length > 0){
        msg = "code: T3901\nerror: ";
        if(T3901 == "-132" && T3904.length > 0)
          msg = msg.replace("T3901", "T3901(T3904)");
        if(typeof errMsg.T3901[T3901] == "string")
          msg += errMsg.T3901[T3901];
        else
          msg +=  errMsg.Fixed["03"];
      } else if(T3900.length > 0){
        msg = "code: T3900\nerror: ";
        if("'04', '54'".indexOf("'" + T3900 + "'") > -1)
          msg += errMsg.Fixed["01"];
        else if("'41', '51', '57'".indexOf("'" + T3900 + "'") > -1)
          msg += errMsg.Fixed["02"];
        else
          msg +=  errMsg.Fixed["03"];
      } else if(T3902.length > 0){
        msg = "code: T3902\nerror: ";
        if(typeof errMsg.T3902[T3902] == "string")
          msg += errMsg.T3902[T3902];
        else if("'04', '54', 'N3'".indexOf("'" + T3902 + "'") > -1)
          msg += errMsg.Fixed["01"];
        else if("'65', '51', '57'".indexOf("'" + T3902 + "'") > -1)
          msg += errMsg.Fixed["02"];
        else
          msg +=  errMsg.Fixed["03"];
      } else if(T3903.length > 0){
        msg = "code: T3903\nerror: ";
        if("'04'".indexOf("'" + T3903 + "'") > -1)
          msg += errMsg.Fixed["01"];
        else if("'C0'".indexOf("'" + T3903 + "'") > -1)
          msg += errMsg.Fixed["02"];
        else
          msg +=  errMsg.Fixed["03"];
      } else if(T3904.length > 0){
        msg = "code: T3904\nerror: ";
        if(typeof errMsg.T3904[T3904] == "string")
          msg += errMsg.T3904[T3904];
        else if(T3904.indexOf("61") == 0)
          msg += errMsg.Fixed["01"];
        else
          msg += errMsg.Fixed["03"];
      } else
        msg =  errMsg.Fixed["03"];
      msg = msg.replace("T3900", T3900);
      msg = msg.replace("T3901", T3901);
      msg = msg.replace("T3902", T3902);
      msg = msg.replace("T3903", T3903);
      msg = msg.replace("T3904", T3904);
      return msg;	
    }
	},
	destroyed() {
  },
	methods: {
		onClick(){
      // alert(this.item.data)
      this.$Modal.confirm({
        title: "電文",
        width: document.body.clientWidth - 100,
        render: (h) => {
          return h(
            "textarea",
            {
              attrs: {
                id: "clipboard",
                style:
                  "height: " +
                  (document.body.clientHeight - 300) +
                  "px; width: 100%; padding: 5px; font-size: 16px; font-weight: 700;",
                readonly: true,
              },
              props: {
                // read
              },
              on: {
                blur: (event) => {
                  this.value = event.target.value;
                },
                paste: (event) => {
                  // console.log(event)
                },
              },
            },
            this.item.data
          );
        },
        onOk: () => {},
      });
    }
  },
  computed: {
    getT0300(){
      if(this.json.T0300 == "881999")
        return "登入";
      else if(this.json.T0300 == "606100")
        return "結帳扣款";
      else if(this.json.T0300 == "620061")
        return "退貨";
      else if(this.json.T0300 == "900099")
        return "清帳";
      return this.json.T0300
    }
  },
	watch: {
	}
});
/*
https://www.iviewui.com/components/table
*/