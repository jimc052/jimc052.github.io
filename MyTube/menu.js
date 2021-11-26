// https://www.iviewui.com/components/menu  
Vue.component('my-menu', { 
	template:  `
    <div id='frameMenu' style="height: 100%; display: flex; flex-direction: column;"
        :style="{width: width + 'px'}">
      <div v-if="smallScreen" id="headerMenu" :style="{background: '#2d8cf0', 
        'display': 'flex', 'flex-direction': 'row', 'justify-content': 'flex-start',
        'align-items': 'center',
        height: '50px', 'padding-right': '5px'
        }">
        <Icon type="md-arrow-back" size="28" color="white" @click.native="onClickIcon" style="cursor: pointer; margin-left: 10px;"></Icon>
        
      </div>
      <i-menu id="xMenu" theme="light" :width="width" ref="menu" @on-select="onSelect" @on-open-change="onOpenChange" style="flex: 1" 
        :active-name="active" :open-names="[submenu]">
        <Submenu v-for="(list, key) in menu" :name="key" :key="key">
          <template slot="title">
            <div :id="key" class="submenu"><Icon type="md-folder" /> {{key}}</div>
          </template>
          <menu-item v-for="(item, index) in list" :name="key + '-' + index" :id="key + '-' + index" :key="index">
              {{item.title}}
          </menu-item>
        </Submenu>
      </i-menu>
      <div style="" id="version">
        2021-11-25 09:00
      </div>
    </div>
  `,
	props: {
	},
	data() {
		return {
      smallScreen: true, 
      width: "310",
      active: "0",
      submenu: "",
      menu: {
        "ALCPT": [
          // {
          //   "key": "XefQhSI-8Qw",
          //   "title": "ALCPT Form 1",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "G8FrZraw13o",
          //   "title": "ALCPT Form 2",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "dKR22Hxizrs",
          //   "title": "ALCPT Form 3",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "UgoQyR3mDJg",
          //   "title": "ALCPT Form 4",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "BXX1G1tyZro",
          //   "title": "ALCPT Form 6",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "gt0Xqzlsu_0",
          //   "title": "ALCPT Form 7",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "5GKw0ZJvKug",
          //   "title": "ALCPT Form 8",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "SoP8Z4shX8A",
          //   "title": "ALCPT Form 9",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "e1_2a0AD9OU",
          //   "title": "ALCPT Form 10",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "E-UK_QeKN7A",
          //   "title": "ALCPT Form 11",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "M1epp0iTEIc",
          //   "title": "ALCPT Form 13",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "40h5szKdF1U",
          //   "title": "ALCPT Form 14",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "zeSAsWOOKaU",
          //   "title": "ALCPT Form 15",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "9S1yw4pdSJE",
          //   "title": "ALCPT Form 16",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "tFVnL3aPBuI",
          //   "title": "ALCPT Form 17",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "emohFo5DaCA",
          //   "title": "ALCPT Form 18",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "2CUSsVkjxhw",
          //   "title": "ALCPT Form 19",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "yW3X2AUZ_Sk",
          //   "title": "ALCPT Form 20",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "FtgjzK5pHS0",
          //   "title": "ALCPT Form 21",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "H7I9lKZ2Ee0",
          //   "title": "ALCPT Form 22",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "jxRhow2UgNM",
          //   "title": "ALCPT Form 23",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "DXtcEvG6rWs",
          //   "title": "ALCPT Form 24",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "uq0_lGVsLlM",
          //   "title": "ALCPT Form 25",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "8fIq0u-SKSk",
          //   "title": "ALCPT Form 26",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "6TD_TmBgaTk",
          //   "title": "ALCPT Form 27",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "WQPcaZDldFI",
          //   "title": "ALCPT Form 28",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "Xq_RJA-FooY",
          //   "title": "ALCPT Form 29",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "xi2pdIj-uPw",
          //   "title": "ALCPT Form 30",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "5vv5mWMppUE",
          //   "title": "ALCPT Form 31",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "UF_gW7MCp30",
          //   "title": "ALCPT Form 32",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "R8Qws_ZWdf8",
          //   "title": "ALCPT Form 33",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "Z_oRVspFCoY",
          //   "title": "ALCPT Form 34",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "FEtJ5fVMRUY",
          //   "title": "ALCPT Form 35",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "tiCrmsxjkBo",
          //   "title": "ALCPT Form 36",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "m0C2oCFw_D0",
          //   "title": "ALCPT Form 37",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "R8loKRHDZTo",
          //   "title": "ALCPT Form 38",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "c6pAhApCdVQ",
          //   "title": "ALCPT Form 39",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          // {
          //   "key": "g4b8KEskdjM",
          //   "title": "ALCPT Form 40",
          //   "author": "ALCPT",
          //   "date": "2021/11/19 08:00:00"
          // },
          {
            "key": "cjIAZ3XP3Is",
            "title": "ALCPT Form 41",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "22yOv3IRqvw",
            "title": "ALCPT Form 42",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "-pWQl496Gh8",
            "title": "ALCPT Form 43",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "nUtU5Klvg-I",
            "title": "ALCPT Form 44",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "6z2Ca1nXWV4",
            "title": "ALCPT Form 45",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "wlCxzGWIYaY",
            "title": "ALCPT Form 46",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "uxW4t5QwkSI",
            "title": "ALCPT Form 47",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "SHZXdsF4Mk8",
            "title": "ALCPT Form 48",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "FZyFjEGT5ys",
            "title": "ALCPT Form 49",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "7ZhfDBkD2vU",
            "title": "ALCPT Form 50",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "LMbJCAAQETI",
            "title": "ALCPT Form 51",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "wwyvPRSmrq0",
            "title": "ALCPT Form 52",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "-9rDFY2i7po",
            "title": "ALCPT Form 53",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "arjftnJcZaE",
            "title": "ALCPT Form 54",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "s2M2dqAbTLA",
            "title": "ALCPT Form 55",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "J3X-GZsHPSc",
            "title": "ALCPT Form 56",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "ZH1gbTnvwqY",
            "title": "ALCPT Form 57",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "4Ua-lgPV7mo",
            "title": "ALCPT Form 58",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "k4dTgK9uA9k",
            "title": "ALCPT Form 59",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "urwiq6QScK4",
            "title": "ALCPT Form 60",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "Vgg_PGEQxv0",
            "title": "ALCPT Form 64",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "fTq5t1LTLf0",
            "title": "ALCPT Form 65",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "L7yeIeWymq8",
            "title": "ALCPT Form 67",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "PyxOjTKPl00",
            "title": "ALCPT Form 68",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "QOX6wQnQp8I",
            "title": "ALCPT Form 69",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "bjYsK06i_vg",
            "title": "ALCPT Form 70",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "CTjNWpsv4a4",
            "title": "ALCPT Form 71",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "MJ1d67-F3y8",
            "title": "ALCPT Form 72",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "zL9WH6YT4Pc",
            "title": "ALCPT Form 73",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "jkf3h0tlSj4",
            "title": "ALCPT Form 74",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "Um19MO19LWE",
            "title": "ALCPT Form 75",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "xORUPkA7EPs",
            "title": "ALCPT Form 76",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "qofqP6vX8Mw",
            "title": "ALCPT Form 77",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "chKZKqZUT-I",
            "title": "ALCPT Form 78",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "tPVnR3vkN5g",
            "title": "ALCPT Form 79",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "g5PFQLQ7hoA",
            "title": "ALCPT Form 80 with ANSWERS Reading",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "9XTQITphs4I",
            "title": "ALCPT Form 81",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "hVjHW5dogjM",
            "title": "ALCPT Form 82",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "QrcUFYTNcZg",
            "title": "ALCPT Form 83",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "FZWXVGqWJqk",
            "title": "ALCPT Form 84",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "9LDi6YXqRWA",
            "title": "ALCPT Form 85",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "KxhdxRPZkjQ",
            "title": "ALCPT Form 86",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "mtkV7gHT1fc",
            "title": "ALCPT Form 87",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "gkXM1ucGAM8",
            "title": "ALCPT Form 88",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "66OW2aHr2EE",
            "title": "ALCPT Form 89",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "JIlz0YxgBXs",
            "title": "ALCPT Form 90",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "n0hzvB_hCK4",
            "title": "ALCPT Form 91",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "ZUSa03dSKMk",
            "title": "ALCPT Form 92",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "bR1rJJBHCKk",
            "title": "ALCPT Form 93",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "8zJTvR3jtYI",
            "title": "ALCPT Form 94",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "FVBSQInuP6s",
            "title": "ALCPT Form 95",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "HwFpbUZS4Ew",
            "title": "ALCPT Form 96",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "UXWr_JEw4Cc",
            "title": "ALCPT Form 97",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "pW2YgF3fH4k",
            "title": "ALCPT Form 98",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "Xy4-2O0Yqog",
            "title": "ALCPT Form 99",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "3Hscb0tARAk",
            "title": "ALCPT Form 100",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "d5XBy87fWKA",
            "title": "Book 5 Quiz A ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "6WUAaAMDfLs",
            "title": "Book 7 Quiz C ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "0r1QEJYvR_Q",
            "title": "Book 8 Quiz C with ANSWERS ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "--31skLWrhQ",
            "title": "Book 9 Quiz B ALCPT",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "0FhZu-uP0sw",
            "title": "Book 13 Quiz B ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "WLl1aVka-t4",
            "title": "Book 14 Quiz C ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "tNpt0GHkGik",
            "title": "Book 15 Quiz B ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "5j5-EsOvh7E",
            "title": "Book 15 Quiz C ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "1t6FTrJ7ij8",
            "title": "Book 18 Quiz B - Listening ALCPT",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "iMfCuMtjbsI",
            "title": "Book 18 Quiz C ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "hNYgdIsW2gE",
            "title": "Book 19 Quiz C ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "UAu5-fE_IsA",
            "title": "Book 21 Quiz B ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "3FI8MRrfHJc",
            "title": "Book 22 Quiz C ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "FDcxOIs074Q",
            "title": "Book 24 Quiz B with ANSWERS in the End ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "-TmA02PWWrs",
            "title": "Book 27 Quiz B ",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          },
          {
            "key": "vnLFpKn4vsc",
            "title": "Book 28 Quiz C ALCPT",
            "author": "ALCPT",
            "date": "2021/11/19 08:00:00"
          }
        ],
        "知心英文": [
          {
            "key": "0i0TKAe0KvQ",
            "title": "100個重要英文短句（初級篇）",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "2O_4kk5U-7U",
            "title": "15個英語萬用句型",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "_pl0TyRRzHo",
            "title": "300個英語常用短句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "_e_efxI5BcM",
            "title": "30個英文問句萬用句型",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "zr2aev0RB2I",
            "title": "40分鐘改變英文耳聽力",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "Xhqs2EhTyT4",
            "title": "超實用的初級英語句子",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "q0KGDvwdDzs",
            "title": "正確用英語打電話接電話",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "1dr--2kaNQQ",
            "title": "僅有3個初級單詞的英文口說短句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "b69iHv0x5dc",
            "title": "光聽就出效果！實用基礎英文99句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "eNPnKI1F9II",
            "title": "在家裡說的超常用英語80句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "vkGwKRCToZI",
            "title": "英語萬用句型23個",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "4eMwNhtsf8s",
            "title": "英美生活中常用199句英文",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "k6Il4oueSo0",
            "title": "100句英文問答",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "0ZXOoLDICtw",
            "title": "1小時英語聽力磨練",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "guPvt02BSis",
            "title": "英語聽力練習180句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "eguwmuwbCiY",
            "title": "帶take的英文慣用語16個",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "IhAJASIwJmQ",
            "title": "有效英語聽力",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "hcEdzGHO3Mk",
            "title": "提高英語口說90句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "gujSdtvH-eU",
            "title": "生活英語口語200句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "CbqIl_b_RW0",
            "title": "日常溝通190句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "L0DE5KkBJXo",
            "title": "20個常用英語動詞片語",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "zm8GabWAyF0",
            "title": "常用英語口語190",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "kyI-KB2zEPY",
            "title": "百搭英文句型17個",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "ildcNarakUE",
            "title": "睡前英語聽力150句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "RIspU7aPrkk",
            "title": "18個重要英文句型",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "CDXNE-5QFoM",
            "title": "反覆練習的英文聽力材料200句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "wunTdqjTxwQ",
            "title": "高頻英語表達149句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "Kd55yRJnnIQ",
            "title": "萬能口語句型15個",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "mzx2QJHlMQQ",
            "title": "耳朵越聽越敏銳 - 隨時隨地聽英文，改變你的聽力理解",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "dUdXJwFTxGM",
            "title": "耳朵逐漸清晰：超有效的英語聽力練習｜絕佳英文聽力素材100句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "rAxKVc5CBJw",
            "title": "聽清英語 練耳朵聽力｜重點反覆訓練，改變聽力現狀",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "E44NNbhmOdw",
            "title": "25個高頻萬能英文句型",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "MVoIjLTvxEk",
            "title": "身邊實用135句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "Bhg8jXma7G0",
            "title": "英美劇中最常說的100句英文口說短句",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "QNQw5GchW2w",
            "title": "英語每日一聽，逐漸清晰 邊聽邊讀邊模仿｜聽清老外說的常用英文",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "0ra21D3jfbY",
            "title": "英語聽力應該這樣練：聽懂每一句 | 非常高效的英語聽說訓練",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "rQavyUH7df8",
            "title": "17個口語萬能句型",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "o1CRBfyquDg",
            "title": "邊睡邊記：超實用英語泛聽訓練150｜躺着把英文學會",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "r-RLsAOxU54",
            "title": "重點英文片語 學懂了對英語會話很有用！(帶多個使用例句/音標)",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "SuMFKTmpFd4",
            "title": "20個高頻實用英文片語/詞組",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "84OHgZYqvYI",
            "title": "高效磨耳朵英語聽力 - 加速提高你的英文聽力敏銳度",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "FYkAP5X7z4Q",
            "title": "高效養成習慣 - 每天英語訓練，穩步提升英聽和口說",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          },
          {
            "key": "EVtScJlupwU",
            "title": "鲜活英文口语 用英语表达每天的生活｜初级英文口说强效训练",
            "author": "知心英文",
            "date": "2021/11/15 07:30:00"
          }
        ],
        "多彩英文": [
          {
            "key": "hp_6kEG5xaE",
            "title": "進階英語聽說提升91句 - 突破現有英文水平，挑戰更進階的難度",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "lz9zKTu0SmI",
            "title": "練一問一答 記英文表達 96句日常使用的英語問句和回答",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uht-pP8KBUM",
            "title": "穩定進步訓練 - 實用英語聽聽說說80句｜英文能力持續再提高",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fPIWSXSzeV4",
            "title": "每天都用的萬用英語口語句型，加速進步說英文！（初級/中級口語聽力必備）",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "bHhacrKcb0U",
            "title": "原來要這樣用：17個高頻英語詞組/片語｜看生活例句，理解並靈活運用",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ORbE0EONHx0",
            "title": "【逐步習慣】從初級到中級英語練習 88句常見英文表達",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "t_bi_9Am71s",
            "title": "常用英文動詞片語真好用！學懂動詞固定搭配 抓住句子重點",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "KLIcO8G6tVI",
            "title": "懂簡單英語詞彙和基礎語法就會說的99句英語短句",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LApTLS1Ep9M",
            "title": "學一句抵十句 告別啞巴英語 說話用英語萬能句型（生活常用句式20個）",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9mIWsAUhIcY",
            "title": "重點英語加強練習74句 提升英文實力｜日常生活要用到的英文",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "VFHtlDlCI8k",
            "title": "80個英語口語問句和答覆 練習對話學英文表達思維 讓你與外國人輕鬆溝通！",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "dsgp-cuiMh4",
            "title": "每日一練，學會流利表達英語 - 英語菜鳥也能變身大神",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TDDGezjeqUE",
            "title": "必背英文口語句型19個 每一個都超好用 自信說出完整英語句子",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "pNjXLXEU_6k",
            "title": "英語從積累到進階：練中級英語聽說 90個提升表達力和理解力的生活英文",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "XqyGP54U4II",
            "title": "馬上開口說英文：只有3-4個單詞的英語短句100個｜零基礎英語口語",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "pLnlb8fz3mw",
            "title": "【磨英語聽力】與生活息息相關的常見英文表達｜簡單高效學懂聽懂必備英語",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "aNCM0W2FrjI",
            "title": "容易記憶的英語對話一問一答 用英文也能對答自如｜英語問句與回答",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5-c3aE7oB_4",
            "title": "由淺入深練習生活英語聽與說76句 - 打好紮實的英語基礎",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rJFqEEb3n_4",
            "title": "33個高頻英文慣用語俚語 - 原來老外說的是這個意思 | 英語口語更像母語者",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Ki-5WW9ZibI",
            "title": "學完直接用：簡單又實用的生活英語｜提高英語口語（初級篇87句）",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Ook9z1o-ugw",
            "title": "【特別好用】英語萬能句型23個 提高英文口語的高效祕訣｜耳朵迅速抓住關鍵意思",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "X1XspDRMB5E",
            "title": "中級英語聽說訓練 - 突破現狀，水平更上一層樓！",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sULCmtfLkyI",
            "title": "學到這些英文副詞片語很有用：外國人都誇你英語說得好！（英語表達更生動和準確）",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "jMqDFiUIb0Q",
            "title": "這些英語英美人士都在用 英文進步如此輕鬆 | 日常英語練習",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iffc2n7Gs3E",
            "title": "最常用100個英語問句 - 涵蓋生活的方方面面，學會了夠用一生",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "RoRhPCO5KVo",
            "title": "遊刃有餘掌握老外常用英語 輕鬆基礎英文練習75句｜英語精選表達",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2PF47ptk-jY",
            "title": "掌握英文句子的核心：重要動詞片語 - 幫助你快速把握句子的關鍵意思！",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "a1IBItNi0QY",
            "title": "生活高頻英文必學必會: 從英美日常生活的常用表達學起！",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "p1Sb36SiJ4g",
            "title": "重要英文表達75句 隨時可用隨時可練｜生活英文每天積累",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YE2vDZL5aIE",
            "title": "改變你的英語口語！萬能英語句型一個不能少｜顯著改善說英語磕磕碰碰",
            "author": "多彩英文",
            "date": "2021/11/16 11:30:00"
          }
        ], 
        "雪薇英文": [
          {
            "key": "QfUhYDHrGtg",
            "title": "公職考試 | 高頻出題單字 EP1！",
            "author": "雪薇英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "wFe27C9aptU",
            "title": "公職考試 | 高頻出題單字 EP2！",
            "author": "雪薇英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9vjUPUEK_4M",
            "title": "國營英文必考！英文文法(1) | Despite vs. Although",
            "author": "雪薇英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "C3n5lyOo6H8",
            "title": "國營英文必考！英文文法(2) | 分詞構句",
            "author": "雪薇英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Gl0d0NzLw7A",
            "title": "只要50句 | 生活會話句(男聲篇) ",
            "author": "雪薇英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "14cx0j_1t5w",
            "title": "只要50句 | 生活會話句(男聲篇) ",
            "author": "雪薇英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uqPwrW0rgjs",
            "title": "只要50句 | 生活會話句(女聲篇) ",
            "author": "雪薇英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6n0rjYDvsxU",
            "title": "放感情講英文(喜悅篇)",
            "author": "雪薇英文",
            "date": "2021/11/16 11:30:00"
          }
        ], 
        "Ozma英文": [
          {
            "key": "9yBhW55kn24",
            "title": "地圖、方向、地點、位置 - 聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "et00WOUB0PM",
            "title": "1 hr of English Listening Practice (Longer expressions) ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sqmdsyn0lEo",
            "title": "1 hr of English Listening Practice:: HD audio ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gzHfvJlu_W4",
            "title": "1 hr. Easy and useful expressions :: daily short expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0XPq1BVYCxg",
            "title": "1 hr.English listening comprehension(short expressions)",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "100L5GU8wdA",
            "title": "1 or 2 words express what you want to say ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "G8VO7ECNZtw",
            "title": "1 小時外師助你練英文聽力(簡/繁) ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Y59nOCRSXLo",
            "title": "1 小時英文口說練習::簡/繁:: 外師高清發音帶你說的一口流俐英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "kLIQzSkRl-8",
            "title": "100  Improve Your Listening Comprehension Skills ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GYFj2DBbuIk",
            "title": "100 Best for beginners:: Useful English short phrases ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "IlTFfX74VDk",
            "title": "100 Easy and Useful English expressions ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "85_sBaNLXJ8",
            "title": "100 English Listening:: Useful longer expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LNexkZUGaEE",
            "title": "100 English Longer expressions listening comprehension exercises",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "xZnxSYjYLo8",
            "title": "100 English Speaking Practice:: Longer expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "atADon3Hn28",
            "title": "100 English conversation speaking practice ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EzyAnyWQesU",
            "title": "100 English listening practice ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "K03ReIIOrvI",
            "title": "100 English listening practice ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cxIplenSp9M",
            "title": "100 English listening practice ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_3qnRTrJ8RI",
            "title": "100 English listening practice ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "QCbCyYU5HKc",
            "title": "100 English practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "q1tgh7FcX0o",
            "title": "100 English speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-d3JqhEU9Uk",
            "title": "100 Guide you to speak English fluently and confidently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mqKsjEAJ5tY",
            "title": "100 Guide you to speak English fluently and confidently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2FcuqK6Y-gc",
            "title": "100 Guide you to speak English fluently and confidently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OV8kEF8DO4w",
            "title": "100 Guide you to speak English fluently and confidently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "l4aliYCsKiY",
            "title": "100 High quality audio listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "r3pDSagc7UA",
            "title": "100 Important longer expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "kBd6ayEBQYI",
            "title": "100 Improve the fluency of your spoken English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4Xa_Jng1eXs",
            "title": "100 Improve your English listening comprehension skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_IvKN_NPRCI",
            "title": "100 Improve your English listening comprehension skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "87mYY9igM5s",
            "title": "100 Improve your English so easy::Learn English effectively",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2EEUYHAmrH4",
            "title": "100 Learn how to use phrases in sentences",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Z3P7W-yQwFU",
            "title": "100 Longer expressions:: Effectively",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fugz-oYpy_M",
            "title": "100 Longer useful English expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Annjk5LXLB0",
            "title": "100 Most Useful English Daily Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_s4jc9u1CPw",
            "title": "100 Most Useful English Daily Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "NlOarp__w1c",
            "title": "100 Must-Learn English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "DeOrnKOid28",
            "title": "100 Nützliche englische Ausdrücke",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4jhtA3N52LE",
            "title": "100 Nützliche englische Ausdrücke:: Englisch Hörübungen",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "vqKizW6OqVY",
            "title": "100 Nützliche englische Ausdrücke",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ryFHDA-JqHY",
            "title": "100 Practical English for everyday life",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5_swQBMqaFE",
            "title": "100 Praktische englische Ausdrücke",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Kki0K3DTHH0",
            "title": "100 Praktische englische Ausdrücke",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GX2woAtMhsk",
            "title": "100 Quickly Improve Your English Listening Skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "230TOfn2ygw",
            "title": "100 Speaking English Easily ::You will benefit a lot",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "1UY9g7JQ1j4",
            "title": "100 Speaking English fluently and confidently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "qkHI5xHBfIw",
            "title": "100 Super Useful English Longer Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "XT9x3X5YUZM",
            "title": "100 Useful English Conversations for Daily Life",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "AJPIi6OFUlE",
            "title": "100 Useful English Dialogue:: speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "D2f-Qhfs2Ck",
            "title": "100 Useful English Phrases",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cWzo3feRddo",
            "title": "100 Useful English Short Phrases",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rDzA8TGUI40",
            "title": "100 Useful English conversation:: long dialogue",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EIRJOwXIRDA",
            "title": "100 Useful English expressions (with examples)",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2viWoE3C2F0",
            "title": "100 Useful English expressions (with examples)::speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "oBO5EkyITfc",
            "title": "100 Useful English expressions (with examples)::speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ZvbypFBGvhU",
            "title": "100 Useful English expressions (with long examples)",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gMRK5QsquE4",
            "title": "100 Useful English expressions ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iCWIRwA8Op0",
            "title": "100 Useful English expressions ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OwK9s6c0xBk",
            "title": "100 Useful English expressions ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7wM7Z-mJ_P8",
            "title": "100 Useful English expressions:: With examples",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "VdCv1tWYKbs",
            "title": "100 Useful English listening practice ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "HUsIZD10Sts",
            "title": "100 Useful English listening practice::Easy and Useful",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5yqslh6TqNA",
            "title": "100 Useful English listening practice::Improve your English listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "RN9UI99l6AE",
            "title": "100 Useful English listening practice::Improve your English skill",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "enOimQ1QV8Q",
            "title": "100 Useful English listening practice::Improve your English skill",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "eWIzN4Hpudo",
            "title": "100 Useful English listening practice::Longer sentences::Useful expression",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "B-fTeA-fwG8",
            "title": "100 Useful English listening practice::Short phrases::Improve your English skill",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "p76-_Akbmnw",
            "title": "100 Useful English practice:: Speak English Fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "U4SHyOMT7Yk",
            "title": "100 Useful English short phrases listening practice::Improve your English skill",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "K7tJVmD0FV4",
            "title": "100 Useful English short phrases listening practice::Improve your English skill",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rHSoPm_gFIU",
            "title": "100 Useful English short phrases:: fluent your English speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8a87PCMzboQ",
            "title": "100 Useful English short phrases::Easy and Useful",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "079o3L0MT18",
            "title": "100 Useful expressions :: Effective way to learn English speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fD4k9BJUnCc",
            "title": "100 Useful expressions:: Guide you to speak English fluently and confidently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iysq2qSD0SU",
            "title": "100 Useful long English expressions ::English speaking  practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "xbinLICH2Ag",
            "title": "100 Useful long dialogue ::English conversation",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "66hQQCCSKi8",
            "title": "100 Useful longer English expressions:: speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cXkmxgzs17Q",
            "title": "100 Useful longer English sentences speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8oJ0zm0PzCs",
            "title": "100 VERY useful expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "A170YPpvdUE",
            "title": "100 längere englische Ausdrücke:: Praktische englische Ausdrücke",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "HgWXqKcvmuU",
            "title": "100 導讀帶你強化長句的口語表達力:: 生活中搞不懂的英文句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rfSGQEjOylY",
            "title": "100 應對英文生活妙招 :: 導讀帶你說好生活表達:: 有效的英文口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "e8e_FN095pA",
            "title": "100 打造完美英文口語:: 教會你表達不懂說的英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "vDYgoRWR4CI",
            "title": "100 打造完美英文口語:: 教會你表達不懂說的英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ima4CkOelYw",
            "title": "100 打開你學英文的腦袋:: 原來這些英文這樣說:: 英文聽力:: 生活超實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gOlYzhSlDfo",
            "title": "100 教會你聽懂「完美表達生活」的句子:: 有效的英文聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cw-RmLXBHeU",
            "title": "100 聽懂英文簡單達成:: 一次聽懂那些以前沒搞懂的生活用句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "u7D8ywtU_EU",
            "title": "100 英文中長句::助你「說出想說的完整長句」::高效口語學習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "j-QVHtpMVHk",
            "title": "100 英文中長句導讀:: 導讀教你想說不懂講的生活表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "1fPVK9oZNrA",
            "title": "100 英文口語生活篇:: 這些中長句你會希望早點學會的表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0J6v-ncp09Q",
            "title": "100 英文學習:: 高清導讀教會你以前搞不懂的表達說法:: 口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TJYazHZpulU",
            "title": "100 英文生活短句口語練習:: 讓你學會表達想說的話",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "qwtOr7-uLS4",
            "title": "100 英文生活短語篇:: 讓你流俐口語能力簡單達成！",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "aGQ11H1f0uU",
            "title": "100 英文短語運用生活篇::萬用句型::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uTz2eShbiZU",
            "title": "100 英文聽力練習:: 那些課本沒教你的生活英文:: 輕鬆教你聽懂",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "tGZFowEA9pQ",
            "title": "100 英美最常用形容詞運用::文法&amp;聽力一起練::事半功停學英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "E3i73jdEwXg",
            "title": "100 英美最常說的短句運用::萬用短句(含例句教學)::英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "C-wyKgS4YF8",
            "title": "100 英語の勉強:: リスニングスキルの向上:: 役に立つ表現",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "vpaCXNEb8jM",
            "title": "100 英語の耳を作る::クイズ感覚でリスニング力を鍛えよう::Let's start!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "DmgQMbtJ_ls",
            "title": "100 輕鬆教會你抓到英文重點字:: 短語生活篇聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Gz9e1sjIQQI",
            "title": "100 輕鬆讓你練的一口流俐英文口語:: 簡單上手生活短語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gV-CUsvfCGc",
            "title": "1000 Best English speaking practice for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "KzSoaiIkAk0",
            "title": "1000 Frases en inglés más usadas y comunes ::Aprender frases cortas en inglés",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8HHp7tpM79c",
            "title": "1000 MOST useful English expressions ::Daily English short phrases",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LZOJEc6xGiA",
            "title": "1000 Vocabulary for beginners:: Most used by native English speakers in everyday",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "nwLp-LYKBZo",
            "title": "1000必學英美最常用單詞::出現在英美生活中最高頻關鍵字::英文單字口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "yChTZQhJqII",
            "title": "100อบรมภาษาอังกฤษอย่างมีประสิทธิภาพ:: หนังสือเรียนไม่ได้สอนการแสดงออก",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "AozcWKSvrck",
            "title": "100一次弄懂這些想說不會說的生活英文::導讀念給聽::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "u_AYXtRfYOo",
            "title": "100中高級英文會話:: 英文聽力練習::Q&amp;A",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "03mFsc3tmmw",
            "title": "100初學也能輕鬆提升聽力:: 想說不會話的生活短句::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mhtzVP_cEG4",
            "title": "100助你「聽英文暢通無阻」::課本沒教的生活表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4BjCgo0jFCw",
            "title": "100助你突破英文聽力::聽懂地道的英文表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "BMoNkUnGnUw",
            "title": "100原來這些英文這樣說:: 生活篇:: 英文聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hLRMMuUa3RM",
            "title": "100原來這些英文這樣說:: 英文聽力訓練:: 生活中超實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "VCPu7S7JIcQ",
            "title": "100句破除你對英文的迷思::原來這句話這樣說::聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0b9q4dv5dSY",
            "title": "100句破除你對英文的迷思::教會你聽懂生活慣語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CsUcJoSn3Ls",
            "title": "100句英文生活短語::每天都會用::快速學好英文偷吃步::高效的聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TOgD7XfvsGo",
            "title": "100句英文聽力練習::你以為很難原來就這樣表達::學好英文Super easy",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sz6rQfP1eUI",
            "title": "100地道英文:: 生活篇::把生活中該學的一次學會",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "IhrApZ39PKk",
            "title": "100地道英文會話篇::高清發音::教會你聽懂英美人士對話Q&amp;A",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6C1_0oMyS40",
            "title": "100教你聽懂生活中不知怎麼說的英文::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-ZnFuoVDwWA",
            "title": "100教會你流俐說英文長句::短語造句(英文口語)練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gsAu4f64UEs",
            "title": "100生活中好用的英文描述::這句口語怎麼說？口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "w-9ELl8SXXg",
            "title": "100英文口語練習::讓口語更流俐並能完整表達句子",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GM7rvN-fXGE",
            "title": "100英文會話篇::情境生活問與答口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "17H01bVgM9U",
            "title": "100英文短句運用::從短句開始聽懂長句::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "KK_PKpx-3jg",
            "title": "100英文練習生活篇:: 高效率跟讀練好口語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8PEZKsN9qqA",
            "title": "100英文聽力教會你每天想說的英文表達:: 一次解開你多年的英文迷惑",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "azHGte5ZJDs",
            "title": "100英文聽力練習生活篇::生活中的這些句子這樣說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "t9cTqy_cQbU",
            "title": "100英文聽力訓練::初級進階最佳教材::生活中很實用的英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YgZvI1zbFyo",
            "title": "100英文聽力訓練::告別菜鳥的日子::原來這些英文這樣說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TbxQ92XigCE",
            "title": "100英文聽力訓練::聽懂生活用句超容易::生活中很實用的英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gRgSp1sZbaY",
            "title": "100英文聽力訓練::這些看似簡單卻不簡單的英文說法::原來這樣表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mJZUHgAuxW0",
            "title": "100英文萬用句型(含例句)::生活中慣用句俚語聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GWr4mEdoPww",
            "title": "100英文萬用句型::情境英文生活天天用的到::口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "lBoVq8RlnHo",
            "title": "100英文訓練::原來這些英文這樣說::明明很簡單卻不一定懂表達::聽力訓練::生活中很實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "KwNSSCBLyFg",
            "title": "100英文訓練::原來這些英文這樣說::明明很簡單卻不容易弄懂的英文::聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0LEjqzXIe5M",
            "title": "100英文訓練::原來這些英文這樣說::明明很簡單卻不容易弄懂的英文::聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "eG7znv-6yM4",
            "title": "100英文訓練::原來這些英文這樣說::明明很簡單卻不容易弄懂的英文::聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Qi-63q5cLcw",
            "title": "100英文訓練::原來這些英文這樣說::秒懂生活用語::聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "1x_01hQu3CM",
            "title": "100英文高效率聽力練習::中高級",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "blqtW4ncyKk",
            "title": "100英美劇常聽到的生活短句::快速學好英文聽力的練習::原來這些生活英文這樣說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "71bMk7KpfUU",
            "title": "100英美劇最常聽到句型::英文聽力訓練::輕鬆聽懂慣用語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "XsnbYc4mc1Q",
            "title": "100英美劇最常聽到短句::輕鬆聽懂生活慣語::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "b-Q_cWfd5mU",
            "title": "100英美劇最常聽到英文短句::輕鬆聽懂生活表達::英文聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YpSHLvMopfs",
            "title": "100英美最常用重點名詞運用::外師助你學造句::英文聽力文法一起練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "RnozGK2MaDk",
            "title": "100英美高頻詞運用:: 高效學單詞運用:: 英文文法 &amp; 口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "qpkV1J-JleU",
            "title": "100超短句英美劇常聽生活短句::初學者也能快速學好英文聽力的訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ZnSytIrbYM8",
            "title": "100進階口語英文長句練習::讓英文口說更上一層樓",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "zgyqCq2x3Sg",
            "title": "105 Must know airport English vocabulary for beginners:: Listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GXwxEKvwQfU",
            "title": "105句句精華::重要的英文動詞例句全集::把文法和聽力一起練了",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-HVS8OzT4qw",
            "title": "105機場&amp;飛機上重要關鍵重要單詞::英文菜鳥出國也簡單::瞬間搞定",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8ku0CGvLTBo",
            "title": "105機場飛機上重要必會用到英文單詞::聽懂重點字輕鬆就成\"行\"",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "o2aLm_nXRBQ",
            "title": "105英文學習有捷徑!!! 百搭開頭語::文法聽力一起練好",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7srz8d6l9c0",
            "title": "105英美最常用開頭語::倍速學好英語造句::英文文法&amp;口說一起提升！",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "zgeUBctzF5A",
            "title": "10分鐘生活實用英文::高效學習::生活用語/問意見/提建議::每日十分鐘累積成塔的英文實力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "kJcD5LTgJV0",
            "title": "10分鐘英文口語::表達問候/情感狀態/閒聊::每日十分鐘累積成塔的英文實力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "NRyAMFMfrFI",
            "title": "10分鐘英文聽力訓練p1::高效學習::生活用語/俚語/道地口語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Gb8cmow6D_A",
            "title": "10分鐘英文聽力訓練p2::高效學習::生活用語/俚語/道地口語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "paOZZXeK-_A",
            "title": "150 Most used vocabulary expressions for daily life:: English listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iKWAXcAH0Xg",
            "title": "150助你聽懂英美人士都在說什麼！最常用到慣用語俚諺語全集::英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "yFN0QC43JcU",
            "title": "17 句生活英文:: 教你聽懂一整天生活描述「早中晚」",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TbwDF1EvFSc",
            "title": "199 Useful daily English expressions:: English Speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "pbyy9kSeKdM",
            "title": "199 Useful daily English expressions:: English speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "SOJHUBIwYXY",
            "title": "199生活英文聽力:: 這些句子生活中很必要",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "PhWfbGgOBk4",
            "title": "1hr English Listening Practice with Native English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "e1lH2ohaae4",
            "title": "1hr. English Dialogue:: Practice listening with native English teachers  (HD audio )",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CW_b7OwRRDI",
            "title": "1hr英文會話聽力練習:: 不管哪個等級都好用:: 一問一答",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "BfQLdHfcF4w",
            "title": "1小時學好這些你必懂的英文:: 生活中實境「對話應用」::帶音標高清英文聽力::简/繁",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "p-CrCc7hYBk",
            "title": "1小時英語聽力練習 (簡/繁):: 高清發音:: 生活實用句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Oe6YipdJ-R8",
            "title": "200 Daily English:: Very useful expressions for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-ysU14CUtfY",
            "title": "200 English Speaking Practice for beginners ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4SJoCORYWB4",
            "title": "200 English Speaking Practice:: Useful Longer Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "51rRHLBTiLM",
            "title": "200 English Speaking Practice:: Useful Longer Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "zaqwt7RM0zM",
            "title": "200 Express yourself fluently in English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "X2WwEkHgPc8",
            "title": "200 High quality audio speaking practice:: useful long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "xVbinqusLPA",
            "title": "200 Super useful English expression:: speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0AUuFzTHcsg",
            "title": "200 Useful English Expressions:: Improve your English speaking skill",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "P3YIl11AqSE",
            "title": "200 Useful English Phrases:: Improve your English speaking skill ::easy and useful",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "W6UFcVCkC5k",
            "title": "200 Useful English expressions ::Improve your English speaking:: speaking fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "RlEmlBJ6KtY",
            "title": "200 Useful English practice ::Improve your English speaking:: speaking fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "vb_Zy86UFaQ",
            "title": "200 Useful English practice:: speaking fluently ::Improve your English speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4M5QIjt-DO0",
            "title": "200 Useful English practice:: speaking fluently:: Improve your English speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OWI6VkNU8Pc",
            "title": "200 Useful Expressions:: English Listening Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "XXYNhyJ8lTY",
            "title": "200原來這些生活英文這樣說:: 英美劇常聽生活短句::英文口語訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "83Nb6kkIL54",
            "title": "200句讓你朗朗上口::生活中開口說英文::跟著外師讀就OK",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3QiCpWkRHdE",
            "title": "200地道英文短句口語練習::破除英文記不住迷思",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8eqz5W6MoEQ",
            "title": "200生活中不可不會的好用表達::英文菜鳥從零到流俐開口說超容易",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "jRJjf5PEIHI",
            "title": "200英文口語練習::導讀教學說出完整長句::生活篇",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Y6naS2pciG4",
            "title": "200英文生活句::學好生活表達超簡單::口語訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5n_MyiOb8HA",
            "title": "200英文生活短句:: 那些簡單以前卻不知的表達:: 生活習習相關「原來這些英文這樣說」",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "DBmniEPem88",
            "title": "200英文短句口語練習::看似不簡單其實很容易",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ljT_0T-NKt4",
            "title": "200超實用生活英文短語:: 想說不知怎麼開口的英文練習:: 流俐你的英文口語表達::",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "wrtPl9hFd7I",
            "title": "200超實用生活英文短語::流俐你的英文口語表達::想說不知怎麼說的英文練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "aVSSVnH46Jw",
            "title": "200超實用生活英文短語::流俐你的英文口語表達::想說不知怎麼說的英文練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "q50OcdTQ1Ak",
            "title": "202 Phrases often used by native English speakers:: Useful daily expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-lK1vOi16zg",
            "title": "202 Useful airport /airline English expressions:: you would say and heard",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "m2Bw-LIl460",
            "title": "202 Useful daily expressions for beginners: Speaking English fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "FlgXooEvc3Q",
            "title": "202句機場口語練習::海關、廣播、 地勤、飛機上、緊急處理(全集)",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uWMo3eZ1X-A",
            "title": "202英文極短語::英語母語者常用的短句表達::英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Gqt-el-TgSg",
            "title": "202英美人士都在說什麼？?必備的生活英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6JIEaNrLMt8",
            "title": "202這些好用的生活表達::肯定用的到!! 英文口語跟讀練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OEpXzO1OyXU",
            "title": "204句重要的英文動詞表達::高效提升捷徑:: 文法和聽力一起練好",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9dSd3gL8wzA",
            "title": "20個萬用短句::含例句::讓你的英文表達更流俐::高效練聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "KZVpW5A-_IQ",
            "title": "22 Minutes of English Speaking  ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "wEi0eWxyhZw",
            "title": "28 Minutes of English Speaking Practice with Native English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "HnF5NqnNzkE",
            "title": "3 hrs.English listening comprehension :: Practice with  native English teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EjpufW20I1E",
            "title": "30 Minutes of English Speaking Practice with Native English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mZpKPV62osI",
            "title": "300 Improve your English speaking:: English dialogue for everyday use",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TYJZO9WppN4",
            "title": "300 Useful English expressions ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "B0FXKQRECAI",
            "title": "300 Useful English:: Speaking with Native English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "eqMTqVptd34",
            "title": "300 Useful daily English:: Help you speaking English fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uZfuN7e3sGM",
            "title": "300英文短句::跟著外師讀::助你零基礎輕鬆開口說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7O09ClCrsM4",
            "title": "300英文短句聽力::高師高清發音::秒速聽懂英文生活聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "nvroGFQOoVY",
            "title": "300英文訓練::原來這些英文這樣說::明明很簡單卻不容易弄懂的英文::聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "w6IrSmbFqik",
            "title": "30句英文居家生活片語含例句::學了天天可以用！！::高效練好你的英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hH76gEjKgx4",
            "title": "30句英文生活日常需求表達::各式尋求協助萬用句型::菜鳥必學::聽力敏感度訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7qpBvkuEidE",
            "title": "31 Minutes of English Speaking Practice :: Useful Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2BXME_BMfOQ",
            "title": "36 Useful English phrases with examples:: English Listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "PWsd153BH-w",
            "title": "36萬用英文句型！快速提升有捷徑！附長註解::英文文法和聽力一起練好",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "vJUKTNMsd4Q",
            "title": "3小時英文短句聽力:: 精選高頻生活用句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Qx5CpeQbuXk",
            "title": "40句必學旅行英文::旅館::飯店::青年旅舍都適用::你想問的你會聽到一次掌握",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "MlT6dsy1AQk",
            "title": "45分鐘英文長句聽力訓練::外師助你聽懂生活長句表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "BeZK-M9Gar8",
            "title": "46 Minutes of English Listening Practice for Intermediate:: Listening Comprehension",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uP1I_wjKtUc",
            "title": "48個道地英文諺語及例句::英語母語者最常用的諺語::高效的聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TnxskcgxH8Y",
            "title": "49句英文餐廳口語::自助旅行超上手::簡單易學",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "A08UJrlcVCw",
            "title": "50 Guide you to speak English fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "bHb5u-pQxqo",
            "title": "50 High quality audio listening practice:: useful long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "wwCQ9EjzZpM",
            "title": "50 Improve your English speaking skills:: useful expression practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gRIKTNqtbRU",
            "title": "50 Long expressions:: Improve the fluency of your spoken English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2ttiaa9Rf6Y",
            "title": "50 Minutes of English Listening Practice for Beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GAFQJ1NoUc4",
            "title": "50 Useful English listening practice::Longer expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "yAvofW89IRw",
            "title": "50 Useful daily English:: long expressions:: improve your English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "pYGyc9HtpoI",
            "title": "50 Useful long English expressions listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "r7k_G1gWLV4",
            "title": "50 Useful long expressions:: improve your English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CG-O0rDx8Ok",
            "title": "50 Useful longer English sentences speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "dKTzycJqyQE",
            "title": "50 導讀英文長句::教會你說好流俐生活中實用的英文句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "oFAuh1xRQNw",
            "title": "50 英文長句::流俐你的口語越說越長",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "11VAHOOtDVA",
            "title": "50 英文長句聽力::提升你聽力記憶的技能",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "oWJkHFd4wLc",
            "title": "50 英文長句聽力::教會你一直以來聽不懂的生活英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "dKGzfXPjOvQ",
            "title": "500 Englisch sprechen üben:: Täglich nützliche kurze Ausdrücke",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ynEW2YZ5-Tw",
            "title": "500 Most used by native English speakers:: Key words dictation practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "zByMcP_q-xY",
            "title": "500 Must know English vocabulary for beginners:: dictation practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ez3uKOciAeI",
            "title": "500 Useful Adverbs Prepositions Expressions:: English Grammar and Speaking Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ABx43C5z1gM",
            "title": "500 Useful English expressions ::Improve your English speaking:: fluently practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "QRqPPrApt6U",
            "title": "500個單詞力助你快速告別菜鳥等級:: 英文聽寫練習:: 就算聽不懂能也準確抓到關鍵字",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "xdniuDyV-iU",
            "title": "500個英美最重要的關鍵詞::英文聽寫練習::助你快速抓到句中關鍵單字",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "jwBiL6PBZUw",
            "title": "500英美高頻詞運用::動詞名詞形容詞副詞等:: 跟著讀學會英文造句超容易",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "eYwtSD7WKM0",
            "title": "500超實用生活短語::輕鬆聽懂英文誰都「行!」::高效練好英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "lsIbHVF6rvg",
            "title": "500超實用生活英文短語::流俐你的英文口語表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Br_LLjUxlzU",
            "title": "50原來這些生活英文這樣說:: 生活英文長句聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-8Ziq6KEIk4",
            "title": "50英文中長句聽力練習::原來這些英文這樣說::生活篇",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "bL4PXv05yrE",
            "title": "50英文生活長句篇::超實用生活英文長句::進階最好的練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "t8AmQAqjPGw",
            "title": "50英文聽力練習::中長句::生活篇::原來這些英文這樣說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mmcRhFryEX0",
            "title": "50英文長句導讀口說練習::讓你說的一口流俐英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9ypIOXhI0eE",
            "title": "50英文長句聽力練習::原來這些生活英文這樣說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OY2oS2_9lAM",
            "title": "50長句英文口說練習:: 讓英語母語者帶你說好長句口語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9FB0LzLD8_0",
            "title": "55 English expression of long sentences:: Listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0GXaDxxNJEw",
            "title": "55 English expressions (Longer to long)",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "U0uFpvc80Bs",
            "title": "55 Guide you to speak English fluently::  long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ZAkYIS01kDk",
            "title": "55 Guide you to speak English fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_NCNiyr8bbA",
            "title": "55 Guide you to speak English well",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "FwKOxYd0hU4",
            "title": "55 High quality audio listening practice:: useful long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "AjRRyk4HF2s",
            "title": "55 英文口語秒速進步練習::高清導讀::由中長句到長句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sXqAGMyOADE",
            "title": "55 英文由簡入深聽力練力練習::生活篇",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "N0_u01AYR8k",
            "title": "55句英文生活中最常使用的短句::每天都會用::必學必會的句子::聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "E5K46JOWwj8",
            "title": "55英文長句口說練習::讓你說的一口流俐英語導讀",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6Xx1FOkjQ_s",
            "title": "55英文長句聽力練習:: 高效學習提升你的聽力技能到中高級",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "k2_t3hVdhXw",
            "title": "55高清版教會你聽懂英文長句::聽力練習::中高級",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hqXOT8hmwEs",
            "title": "57 Minutes English Listening Comprehension  ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OefB2gMZ-FU",
            "title": "58 Minutes English Listening Comprehension Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "c27xZphmOAM",
            "title": "58 Minutes of English Listening Practice::  Useful daily English expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hbGUYpHX8EM",
            "title": "5個學習英文超高效方法::外加1個技巧彩蛋::總有一個對你有幫助",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YU1NCrN8hBo",
            "title": "60 Best way to learn English listening:: Useful long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TNGony_dZAw",
            "title": "60 Effective way to learn English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "IlyCLO1YG3o",
            "title": "60 Improve Your English-Speaking Skills:: Expand your vocabulary",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4d9hszanQbo",
            "title": "60 Useful Long Expressions:: English Listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3iA86h-bjcU",
            "title": "60 ประโยคยาวภาษาอังกฤษที่มีประโยชน์:: ฝึกการฟังภาษาอังกฤษ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9lUkALPWXcI",
            "title": "60句全美的日常短語::外國人每天都說::高效練聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "VScCQ5xxQf0",
            "title": "60地道的英文表達:: 助你「完整表達」說長句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6JTVn-thYhI",
            "title": "60英文長句即生活化又實用::助你把句子越說越長完整表達想說的",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "tq1wONzVEpE",
            "title": "60英文長句聽力:: 助你「突破瓶頸」聽懂長句::Effective way to learn English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fIQ1X4BQurg",
            "title": "60英文長句聽力練習:: 助你「提升記憶力」聽懂長句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CRpDY-a8h3o",
            "title": "60英文長句聽力練習:: 幫你助攻「突破瓶頸」聽懂長句誰都做的到",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4KFKnCbrxLY",
            "title": "60英文長句聽力練習::助你「聽懂搞不定的長句」",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3hKXmetqAAo",
            "title": "60英語リスニング練習:: 長い式:: 生活の中でよく耳にする言葉",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GnHSGk9tbV4",
            "title": "61高頻的萬用百搭句型::英文聽力和文法一起練好!!! 附註解!!! 學好英文很容易",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6LTxSpceOOA",
            "title": "66 Common Idiomatic Expressions:: English listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "s0Nd3u22LMk",
            "title": "66個道地英文諺語例句::英語母語者最常用的諺語::高效的聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OSzwCj1vF9M",
            "title": "66英文聽力練習::助你聽懂生活常用句::與生活習習相關「高頻率萬用句型」運用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "WXPsF3ohhNA",
            "title": "69 Useful short expressions with examples",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_OzVfdAsPik",
            "title": "69必備英文片語::句句精選::::英美生活最常用到",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2hD0Wsw1aF0",
            "title": "Actual Airline Announcements:: Flight Attendant Announcement",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "etjY9x_vVJQ",
            "title": "Airplane English:: Travel English ::English you'll need on the plane",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "vGkVPA4QMSQ",
            "title": "Airport /On board the aircraft expressions:: English listening comprehension",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "r1-je_2oo-A",
            "title": "Airport announcements / Customs questions and answers conversation practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "xVXhMb8v1TE",
            "title": "BEST way to learn english speaking:: Talk about household appliances",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "v54SPjlLb5k",
            "title": "Basic short phrases with examples:: Best for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "j5iL4cB06fE",
            "title": "Become Fluent in English 100  ::Effective way to learn English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "c2NknLIwRZ8",
            "title": "Best English conversation for beginners | good questions to ask and learn how to respond",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9w-eAUu55PU",
            "title": "Best Ways Describe Daily Routine:: how to speak English fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "o5LicvQqKR0",
            "title": "Best Ways To Encourage Someone:: how to speak English fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ZUmnYpN0IKI",
            "title": "Best Ways To Practice Long expressions:: speaking English fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "UPaUiahhk-g",
            "title": "Best way to learn English Speaking:: 60 Useful Expressions (Long)",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "n8RmAZulw_8",
            "title": "Better ways to say in English ::You will benefit for a lifetime",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "QvnJNSyHDk8",
            "title": "Better ways to say in English ::everyone should know!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "DHd3EvqAHR8",
            "title": "Daily English for intermediates:: English Listening Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "p70b-NY2-Cc",
            "title": "Daily English listening practice:: Useful longer expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fOYGCV6-YuI",
            "title": "Daily English phrases with useful example:: Grammar teaching guidance",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "KmCZyQYLyN0",
            "title": "Daily English:: Convenience Store Theme",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "j1ijqKwCYEk",
            "title": "Easy everyday expressions:: English listening comprehension",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "M1XUL7MXBs8",
            "title": "English Conversations for Daily Life",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fwqrP7nM_V4",
            "title": "English Dialogue ::Ways to say \"You Are Welcome\":: English Listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "tJD8Uc02Skc",
            "title": "English Dialogue:: Listening Practice:: 1hr. high quality audio",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "IIIw0xbT-aQ",
            "title": "English Listening Practice ::Ways to say \"Take it easy\"",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "RcqyNOAwdyU",
            "title": "English Listening Practice for Intermediate everyday use",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uFGQhpTSJaM",
            "title": "English Listening Practice:: Daily English expressions for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Sr8ok7ya91g",
            "title": "English Listening Practice ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "MzwDh7uhtcM",
            "title": "English Listening Practice:: useful long expression for intermediates",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iz-pbmriO20",
            "title": "English Listening:: Very useful expressions in daily life",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Qd9h-thXdoA",
            "title": "English Sentence Starters For Everyday Speaking:: with examples",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "SvxIsB2qzZo",
            "title": "English Speaking Practice for Beginners:: speaking fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YgcVPt7r9VE",
            "title": "English Speaking Practice for beginners to intermediates:: Useful Longer Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Vl4F4sMI2rI",
            "title": "English Speaking Practice with Native English Teachers :: for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uQgJJUasYvQ",
            "title": "English Speaking Practice:: Daily Conversations",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cwL7jJMALZg",
            "title": "English Speaking Practice:: Learn with Native English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6B2kNmI-Q4E",
            "title": "English Speaking Practice:: Most used verb expressions for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0WQeShd7-mM",
            "title": "English Speaking Practice:: Most used vocabulary expressions for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "W-q2BsAlNZA",
            "title": "English Speaking Practice:: Useful Longer Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "UKesd7W_lVA",
            "title": "English Speaking Practice:: Useful Longer Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "O8ivGeogCGM",
            "title": "English Speaking Practice:: ways to say \"Take it easy\"",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CKmiiNhx6MA",
            "title": "English Story Comprehension:: Picnic plan Theme",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "oJdcjRczMFs",
            "title": "English at airports and on planes ::Must know vocabulary for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ksRYCtufMik",
            "title": "English conversations for your daily life:: Speaking Practice with English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "jLGtqg2ernc",
            "title": "English dialogue:: 50 minutes listening practice:: Ways to say \"Sorry\" and \"Reply\"",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "DB8pJ80EiwA",
            "title": "English grammar and speaking practice:: With example sentences",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6TTYgIAgWiM",
            "title": "English high frequency short expressions dictation:: Strengthen key words listening:: for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "oxVc-MJCzY8",
            "title": "English listening comprehension ::Practice with Native English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "j2q6IPMXba4",
            "title": "English listening comprehension for beginners::1 hr. (short expressions)",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6op_u79_m18",
            "title": "English listening comprehension:: Short expression for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mqNPKMiNYUs",
            "title": "English listening for beginners:: 200 Quickly improve English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "MHekCaOxM2E",
            "title": "English listening for beginners:: Quickly improve English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uIaUVhEnyhQ",
            "title": "English listening for beginners:: Quickly improve English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "lkz291VBWMI",
            "title": "English listening practice for beginners everyday use",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mMTSnn0yI5M",
            "title": "English listening practice for beginners:: Improve English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "T0CEOabqzQU",
            "title": "English listening practice for beginners:: Improve English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fNIC7WiVYr4",
            "title": "English listening practice for beginners:: Short English expressions for everyday use",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ioXStOblvJY",
            "title": "English listening practice for everyday use:: Improve English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6jxx5RzQun0",
            "title": "English listening practice:: Most used vocabulary expressions for daily life",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Y46EtBpsJbs",
            "title": "English listening practice:: Useful Daily  English for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Nh7-imh3KNE",
            "title": "English long dialogues:: Native English speaker conversations",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0iIXAiKNoRE",
            "title": "English long expressions ::Speaking practice with Native English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "q1pEfAwK_Vo",
            "title": "English most used phrases and idioms expressions:: English speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "PLqLa5VAsXE",
            "title": "English sentences starters for everyday life",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "1LXX9q6ZM1k",
            "title": "English short phrases (with cue card):: speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6plWLTBvu9Y",
            "title": "English short phrases with examples:: speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "pz5nVg37fws",
            "title": "English speaking practice :: Greeting Dialogues",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "F3PgBDZvics",
            "title": "English speaking practice for beginners everyday use:: Short English Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OE2ny3U5WI8",
            "title": "English speaking practice for beginners:: Improve English speaking skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "KFKuRJ4nm1o",
            "title": "English speaking practice for intermediate learners:: Long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "12S9zaQ-ilA",
            "title": "English speaking practice ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CFyXtfvrAIU",
            "title": "English speaking practice:: Ways of English drama expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "lkfMB3k5suk",
            "title": "English speaking:: Speaking English fluently ::longer sentences practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3ru8ugv_1jE",
            "title": "English story comprehension:: Morning Routine Theme",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "e33jGCDM8co",
            "title": "English story comprehension:: What's in the fruit shop theme",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0ytnhq_heno",
            "title": "English useful  longer expressions 100:: speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "s43w52IWRGk",
            "title": "Great ways to learn English Listening :: 100 Useful expressions:: You'll wish to know earlier",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "xuPuY_qKlQw",
            "title": "Guide you to speak English fluently:: Daily routine expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YACyXMU4JX4",
            "title": "Guide you to speak English fluently:: Talking about houseworks",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4pe94gbvbgA",
            "title": "High frequency sentences in American TV series",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "u2VRWF2cK5g",
            "title": "How to talk about daily routine:: Speak English Fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ygbWXpgQ5C8",
            "title": "Improve English Speaking:: Longer Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Ooz0W94nkvg",
            "title": "Improve your English so easy::Learn English effectively",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "KkucmIAb5Ww",
            "title": "Improve your English speaking:: Daily English dialogue",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "pffL9Ssi4ms",
            "title": "Improve your English speaking:: English dialogue for everyday use",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2pndGhS5Jxk",
            "title": "Learn English Speaking Effectively:: Talking about various ways of cooking dishes",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "qbYUPwGbVfQ",
            "title": "Learn English speaking  with native English teachers:: 21 minutes practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "n16Pix28xdk",
            "title": "Learn to speak English with a native English teacher",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "E2HYMfuiG8o",
            "title": "Let's:: Useful English expressions ::  listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5TQvNlf_CDk",
            "title": "Long English expressions :: Good way to speak English extraordinary fluency",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ssm3ufZMhio",
            "title": "MOST used telephone English phrases| Improve your listening and speaking skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "k8-hqlWOcEs",
            "title": "MUST KNOW daily English:: Shopping At Supermarket:: Listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Dggmp8RHHfs",
            "title": "Most Used Phrases in English (with examples):: English Listening Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EomGhRT2Mv0",
            "title": "Most used English expressions:: Very Useful!! English listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "vewWGc1UMY4",
            "title": "Most used verb expressions:: English Listening Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "UnLq21yE93A",
            "title": "Must Know Useful Expressions in Supermarket:: English Speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "a0WajA7baNw",
            "title": "Must know daily English:: useful phrases and expressions in supermarket, grocery store, shopping",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "swDWhEbXBuA",
            "title": "Must know the English expression on the plane:: Airplane cabin English listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sjARwuCAhLo",
            "title": "Must-Learn speaking skills:: English long dialogue",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "FoiLf6LJigQ",
            "title": "Must-know English for Telephone Calls",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "KKFitmqmZtU",
            "title": "Native English speakers' expressions:: Improve your English listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3nHCfHDSLig",
            "title": "Practice English Speaking with Native English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "lJg8ADJqAlY",
            "title": "Practice English Speaking with Native English Teachers - Improve Speaking Skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rGH14WoE6Nc",
            "title": "Practice English listening with Native English Teachers:: for intermediates",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rFWl6xnxjw4",
            "title": "Practice English Listening with Native English Teachers:: Useful longer expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5_KUKjKAkAo",
            "title": "Practice English Speaking with Native English Teachers:: Useful daily expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "SpDgF1pg2Hc",
            "title": "Questions and replies:: Useful English dialogue:: Listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Io9Bq9F3eMg",
            "title": "Really helpful for speaking long sentences:: Long sentence speaking skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "wvZr_RoGSPI",
            "title": "Sentences you will hear in English dramas",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "y-4wIeAN50g",
            "title": "Shopping at the Grocery Store:: English listening :: Must know important daily English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "BrfKESivbeE",
            "title": "Short English Expression for Beginners ::English For Everyday Use",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7OnhHjvvqj8",
            "title": "Short English Expressions for Beginners ::English improved quickly",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "HWrGwNI_YpE",
            "title": "Short English Expressions for Beginners ::Speaking Fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "yg8wqbUUX5A",
            "title": "Short English Expressions for Beginners ::quickly improve",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Ryzr9HJ-zMc",
            "title": "Short English Expressions for Beginners:: for everyday use",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fwOfJ4rS-1o",
            "title": "Short English Expressions for Beginners::English listening::Improve your English quickly",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "lNGkssnIUkU",
            "title": "Short English Expressions:: Listening practice for beginners everyday use",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LWz-9ozL-00",
            "title": "Short English conversations| good questions to ask and how to reply | Daily English dialogues",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YTBmXdaFCO0",
            "title": "Short English story comprehension:: Amazing Zoo Theme",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iqMvQZ1KWo8",
            "title": "Short English story comprehension:: Shaving Theme",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TdE7A99xLKE",
            "title": "Short expressions that can be used every day ::with examples:: English Listening Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CGHmTqkvZPU",
            "title": "Slow speed ::Help you improve your long sentence listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hiWfUHfkSsM",
            "title": "Speaking English fluently Quickly :: 200 Easy and useful expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7frKDSnQlXo",
            "title": "Speaking English fluently:: Effectively improve communication skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-yfodxIR4hY",
            "title": "Spoken English: Supermarket ::Shopping at the Grocery Store",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "XRTIFeeS7f8",
            "title": "Spoken English:: At the convenience store:: English Listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Hnd-unOStY8",
            "title": "TOP 100 英美最常說的萬用短句::英文聽力練習::外國人掛嘴邊的那些話",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "faFN0vimyoE",
            "title": "TOP 400 You can use it every day:: useful English expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "szu5OtZlsUQ",
            "title": "Talking About Relaxation:: how to speak English fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6c8-ikxsu0o",
            "title": "Talking about all kinds of toilets ::Speak English Fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "edYXjw0o8jw",
            "title": "Talking about shopping in the supermarket:: English listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GofXS63py_M",
            "title": "Talking about the way to cook MEALS:: English listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "W6nW6D4amEQ",
            "title": "Telephone English:: How To Sound Professional On the phone",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ohIaZD7xCak",
            "title": "Telephone English:: Phrases for beginning a phone call",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OYY8HIs4SIU",
            "title": "Telephone English:: Speaking like a pro:: Speaking English fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "yUrtfDv6ou4",
            "title": "The Hottest Trending Topics:: talk about virus ::English Speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "WEBEKSrsaQo",
            "title": "These English phrases are really useful:: How to use phrases in sentences:: listening exercise",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4eduMEburyw",
            "title": "These expressions you'll wish to know earlier:: English listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "W2tpAkfBsHY",
            "title": "Top 100 MUST know useful expressions:: English listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Afwxpoe9Vw4",
            "title": "Top 100 The most useful English adjective expressions:: English Listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "DBCuZgcPJV4",
            "title": "Top 100 Useful Nouns Expressions:: English grammar and listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Q806_6HACqU",
            "title": "Top 100 short English expressions :: Must-Learn speaking skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CYuM65k2V9M",
            "title": "Top 100 英文必學必會短句片語:: 英美劇中最常說的英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Kt1eHujdBYs",
            "title": "Top 100 英美劇最常聽到短句::學好英文的捷徑:: 聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LasXV_jpyM4",
            "title": "Top 200 English listening for beginners:: Quickly improve English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GEHJfKvytac",
            "title": "Top 200 MUST know expressions :: English listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "zoVt9nwg8K0",
            "title": "Top 200 英文必學必會短句片語:: 你也可以輕鬆開口說英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "r_CHqEgg50M",
            "title": "Top 200 英美劇最常聽到短句::學好一生受用:: 英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6WDinBRK9To",
            "title": "Top 300 Useful English expressions for beginners:: English listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "E6E-jmW_mFc",
            "title": "Top 300生活中常用短句::輕鬆學好英語聽懂老外就靠這教材::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "is--rx_qNPI",
            "title": "Top 400 Useful expressions :: Learn the best ways to speak fluent English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "40nH-4O7Ba8",
            "title": "Top 400一生受用的生活短句:: 養成良好英文聽力的耳朵",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LRaE_AskZOY",
            "title": "Top 500 Easy and useful English :: You can use it every day",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6CUvC0uf1kw",
            "title": "Top 500 Effektive Art zu lernen Englisch:: Sie können es jeden Tag benutzen",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "pb5EjcViqgQ",
            "title": "Top 500 英語の聞き取り練習:: 簡単に英語で表現できるようになる",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EPtEkEN1jWQ",
            "title": "Top 500英語の基礎フレーズ:: 気軽に学べる:: 日常的に使える英語表現",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "M9DBeOm7AVM",
            "title": "Top100 Useful Adverbs Prepositions Expressions:: EnglishListening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ZbAk2CAd4Ws",
            "title": "Top100 useful English expressions::lIstening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4N119mtOu6I",
            "title": "Top100英美劇最常聽短句::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "L7rPxM8PEHU",
            "title": "Top200 MOST useful expressions:: speak English fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TxU1-36wxh0",
            "title": "Top200英美劇最常聽短句::英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "L5Pxrv9zg68",
            "title": "Top400句英文是你會希望早點學到的表達:: 你每天都可以用的到",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "NJmcpvRrvyw",
            "title": "Travel English At the airport /On board:: Useful  English expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "wchgtdZ3vlk",
            "title": "Travel English:: Airport and on the airplane:: You'll need it on your trip!!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "L6_sB4F_IEA",
            "title": "Travel English:: Must-know before travel!!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "odkSe0YhUlY",
            "title": "Travel English:: You'll need it on your trip:: English Listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "1JLoFHzS7Mw",
            "title": "Travel English::Airport Transportation Hotel::The English expression you need",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "FZnWs6DCs60",
            "title": "Trending topic: Talking about COVID-19::English Listening::  The textbook didn't teach you",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CTlQEDUe9nk",
            "title": "Useful Adjectives expressions ::English Listening Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iCq3eKPM37Y",
            "title": "Useful Can and Can't Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "NmnvEm4Uoh4",
            "title": "Useful Daily English Listening Practice:: Longer expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ea3VU9AjTNk",
            "title": "Useful Daily English:: Encourage others:: long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "UJZQMabL5Jk",
            "title": "Useful Daily English:: Home Appliances:: long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "A_ZP-jjON6o",
            "title": "Useful Daily English:: Talk About Releasing Tension:: long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "BsKDbx-se1g",
            "title": "Useful Daily English:: Talking About Daily Routine:: long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "m6vw_u7H8YA",
            "title": "Useful Daily English:: Talking About Houseworks:: long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5DFlQBjb_hI",
            "title": "Useful Daily English:: Types of toilets:: long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sFV87alFF_I",
            "title": "Useful Daily English::Talking About Daily Routine ::long expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "D6UzoHf1Q_E",
            "title": "Useful English Expression (with cue card)::speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cUJxCWvmR5s",
            "title": "Useful English Expressions Listening Practice:: Daily English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2xtWhi41p1o",
            "title": "Useful English Expressions for Beginners ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "i5Xzk2WckgQ",
            "title": "Useful English Expressions for Beginners:: with cue card ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rfbQHfrbyBA",
            "title": "Useful English Expressions:: Short Phrases for everyday use:: English Listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "wu7LCeqLmeQ",
            "title": "Useful English Expressions:: with cue card :: Ways to learn English easily :: listening exercise",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rt2sCDrJ5g0",
            "title": "Useful English Expressions:: with cue card ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "inEEMLU_1os",
            "title": "Useful English Listening Practice for beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_KRDhq8zRTs",
            "title": "Useful English Listening Practice:: Longer Expressions",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "y3_B00Xor2k",
            "title": "Useful English Speaking Practice for Beginners",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YXQMQpVX6rE",
            "title": "Useful English dialogue:: Questions and replies:: Listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "QKVUWuq8fTs",
            "title": "Useful English expressions ::1hr. English Listening practice with native English teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LCGfJ258LaU",
            "title": "Useful English expressions for daily life",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ehb7U2UXLRo",
            "title": "Useful English expressions!!! for your daily life ",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Mg3dDQy-6aM",
            "title": "Useful English listening practice::100 Short phrases::Improve your English skill",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EM6CTDSrlSk",
            "title": "Useful English phrases with examples :: English listening and grammar practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5TsD15RonhQ",
            "title": "Useful English phrases with examples::English Listening Comprehension",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9KT4HBpUJzI",
            "title": "Useful English short phrases (with cue card):: learn how to make sentences",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "RnYdyIlRQ8w",
            "title": "Useful English short phrases with examples :: Listening and Grammar practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Q97GI0kBxsc",
            "title": "Useful English short phrases with examples ::EnglishListening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_khmpaiPQrk",
            "title": "Useful Long Expressions:: Best way to learn English listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-TxvSRMrnug",
            "title": "Useful Phrases:: Longer Sentences:: 1 hr English Listening Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "w-O1PwOkl2s",
            "title": "Useful Short English Expressions for Beginners:: Everyday use",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Y1v1vSx94HE",
            "title": "Useful Travel English:: Emergency handling during travel!!!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gUmQ7t1ZlEo",
            "title": "Useful Travel English:: Emergency handling during travel::English Listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7urCf5PaKq8",
            "title": "Useful daily English :: long expression listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "AHPbXGFra70",
            "title": "Useful daily English expressions:: Learn to talk like a native English speaker",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iweP7de6BfU",
            "title": "Useful everyday English expressions ::English Speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fTxt8IxhWoQ",
            "title": "Useful everyday expressions ::Effectively improve your oral English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "leXaYmmaq_0",
            "title": "Useful idioms expressions(long):: Speaking English Fluently",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "z9Qa_5hYij8",
            "title": "Useful short expressions with examples:: Listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "RY71QTC_Yz4",
            "title": "Useful short expressions:: with cue card:: 1 hr English Listening Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "VwEuIM6xCfE",
            "title": "Useful short phrases with examples",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "T1qMJrWow18",
            "title": "Useful short phrases with examples::You can use it every day",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "dMOgS2bwE44",
            "title": "Various road conditions and situations:: English listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EiHQ5P9mF-k",
            "title": "Various road conditions and situations:: English speaking skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6fBquXuf458",
            "title": "Ways To Say \"Good\" and \"Bad\" Luck :: 12 minutes of English speaking practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3NGIEl1NVy0",
            "title": "Ways To Say \"How are you\" and \"Reply\" ::15 minutes of English listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "03ffUtDIeLw",
            "title": "Ways of English drama expressions:: Improve English listening skills",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8lXEqMoDpSM",
            "title": "Ways to Say Hurry Up :: Practice English Speaking with Native English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mpZWAbQUIzQ",
            "title": "Ways to say \"Sorry\" ::Practice with Native English Teachers",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "JPHiDbpjQOA",
            "title": "Ways to say Good Bye:: Practice Daily English with Native English Teachers:: English Speaking",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GtDhtYapI5E",
            "title": "Ways to say Hurry Up::\"Long\" English Expressions:: Listening practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Qkw5LtDw-44",
            "title": "Ways to say You Are Welcome:: English dialogue",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "V1BfmP8kF-M",
            "title": "Ways to say 「Good Bye」::English Dialogue:: Listening Practice",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "IuU6U-qbkGA",
            "title": "[中文字幕] 學好西班牙語聽力和口說表達技能| 超高效學習法| 初級",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "HT6_f2I5J6g",
            "title": "แบบฝึกหัดการพูดภาษาอังกฤษ:: เพื่อให้คุณสามารถพูดภาษาอังกฤษได้อย่างคล่องแคล่ว",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "foV7i2Y0C1w",
            "title": "【睡眠學習】美劇生活實用口語句( 1 )附音標 |睡著把英文學了 |舒眠學習版",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ZuWclCVJT9k",
            "title": "【睡眠學習】美劇生活實用口語句( 2 )附音標 |睡著把英文學了 |舒眠學習版",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_AFI2lA4qz0",
            "title": "【邊睡邊學】 美劇生活實用口語句| 附音標| 讓您說的一口流俐英文 |強效學習雙音版",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "u4hbjg8YGPs",
            "title": "よくある空港・飛行機のアナウンスと税関の問題と回答の練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "stZHr8Sfyxs",
            "title": "一定會用到的超市英語怎麼說::英文聽力:: 手推車 冷凍食品 熟食區",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gwlh4WNjsuc",
            "title": "一生必用到的英文「高頻率片語04」:: 不管你在哪個等級都好用::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "suS5icxeJAE",
            "title": "一生必用機場飛機上::實境用句英文表達方式::你想說的都在這",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9jaMO_Twnl0",
            "title": "一石二鳥學習捷徑「英文短片語」及「運用」::英文高清聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "A6M1vvYKSRA",
            "title": "不可不會的生活必要技能!!!:: 超市英文聽力::生活息息相關",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "C9VConU-lYA",
            "title": "不知如何表達的話聽聽外國怎麼說:: 英美生活常用的短表達:: 英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ID_Myc6YRH8",
            "title": "不管你英文在哪個等級，這些「片語句子」很好用:: 英文口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7kZhcNMFwTo",
            "title": "不要再只會說Byebye了::別人用別種方式說再見，你能聽懂嗎::英文再見各種口語說法",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fi1zLfLRcuI",
            "title": "來自英文部編輯彙整::英美劇學習筆記::六人行::絕望主婦等",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0y14nPhhPXs",
            "title": "倍速提升你的聽力:: 生活英文聽力中高級練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "XVIJFj5n61U",
            "title": "倍速進步的關鍵::英文一問一答聽力練習::生活必備會話",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "q18Kaglbv-c",
            "title": "全美生活70句實用短語::英文入門聽力寶典::親子教育系統",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "e-xpnR2WT08",
            "title": "冰雪奇緣精選筆記500句::慢速常速::看電影學英文::直接學精華",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5-Q8kGE4HbU",
            "title": "出國旅遊應急英文::句句重要!!! 從機場到旅程::從簡易處理到解決麻煩::聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "wQhwvdMVKko",
            "title": "初學英文造句:: 必學必會!!!::聽力文法一起練習:: 英美最常使用片語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0PY6FHqg2Zw",
            "title": "初心者のための英会話フレーズ100選::リスニング練習::生活編",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "T1dVNnCrgIo",
            "title": "初步突破英文長句::流俐表達口語:: 外師高清發音助你快速學好",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "HiW29XRYZuI",
            "title": "助你學會造句 :: 英美最常使用片語:: 舉一反三好輕鬆:: 高效提升英文實力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "zgLftJNGrfQ",
            "title": "助你快速開口說好英語:: 地道的英語短句表達練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Sld-YtmMPHQ",
            "title": "助你聽懂地道英語:: 英美劇台詞精選最地道的英語生活用語:: 老友記六人行::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ibPVtciJTcM",
            "title": "助你開口說完整句:: 英美掛嘴邊的生活英文!!! 完整長句表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0RfX6vL91Iw",
            "title": "助你開啟英文語感:: 生活英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "zuvDQTxpl5k",
            "title": "原來這些生活英文這樣說100短句聽力練習:: 學好英文so easy",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gqPcegehiyE",
            "title": "原來這些生活英文這樣說！！聽懂英文真容易",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "IE3E8p5jWD4",
            "title": "原來這些生活英語這樣說:: 外師帶你念英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "gqGZkbvH9I0",
            "title": "原來這些英文這樣說(附音標)::英美人士口中的::短語慣用語:: 常速、慢速",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CGRf0iLVlHg",
            "title": "原來這些英文這樣說::片語生活篇:: 簡簡單單就能表達自己想說的話",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8MBj2TyP1JM",
            "title": "原來這些英文這樣說::英文口語練習::讓你說的一口流俐英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Tmy-3ClI-Lg",
            "title": "原來這些英文這樣說::英文聽力練習::這些話英美人士這樣表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5xyLyByIWWI",
            "title": "原來這些英語這樣說(超實用):: 英語聽力Effective way to learn English listening",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TUDwRzSaLkc",
            "title": "句句精華::必學必會的電話英文::必聽到和想說的表達聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3FOr-t9VxxQ",
            "title": "句句重要::必備聽答技能::飛機上廣播&amp;空服在說什麼？::坐飛機必備英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "kXhLCabAjpM",
            "title": "句句重要！坐飛機必懂的英文句::一次搞懂空服員&amp;廣播在說些什麼",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3VX9ILj70J4",
            "title": "各種路況和交通情況表達::直路、山路、被開罰單車、被拖吊:: 英文口說練習(導讀)",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "S2QWIkihOqc",
            "title": "和外國人交朋友嗎聊天 | 與老外交友最好的英文聽力::口說教材",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6znM7O4dITg",
            "title": "和外國人聊電影、影集、TV秀::他們怎麼回答???| 如何提問Q和回答A所有聊天的句子",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hW_k7flvxLU",
            "title": "和老外交能的成朋友嗎？ ？ | 立馬了解他們都說些什麼| 與老外交友最好的英文聽力和口說教材",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Qu-Sb4Er_MY",
            "title": "地道的英文生活會話:: Q&amp;A::外師高清發音教會你提問和回答",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "JWdN_Su2rqQ",
            "title": "地道的英文表達:: 各種「你好嗎」的「對話運用」::英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2nVZclvK_Ak",
            "title": "基本の英会話フレーズ1000::最高の初心者英会話トレーニング",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4oG0L5zcxWk",
            "title": "外師一對一教會你英文口語:: 跟著讀輕鬆就學會生活會話",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9NdG_bOvqgY",
            "title": "外師助你「聽懂英美劇」表達:::高清外師發音::英文聽力練習::中級",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EOHj3IrMyfw",
            "title": "外師導讀助你開口溜英文:: 這些生活表達很必要",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "SHDoYo9_9oQ",
            "title": "外師帶著你開口說英文::高清發音(簡/繁)::英文口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "GZSIUsHuxxc",
            "title": "外師教你英文中各種「不客氣」怎麼說:: 外教陪你說好英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "l3qRs7aJyUk",
            "title": "外師教你這些生活英文這樣說:: 各種「快點！」的表達方式::英文口說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7Tuj7q9tf_M",
            "title": "外師教會你「生活中很受用高頻率片語02」:: 不管你在哪個等級::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "SaLFSiRVEGM",
            "title": "外師教會你「生活中很受用高頻率片語03」:: 不管你在哪個等級都好用::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "BLxHSH5FtkU",
            "title": "外師教會你「生活中很受用高頻率片語」:: 不管你在哪個等級::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "IYIUOseGgHA",
            "title": "外師用實用英文中長句教你聽力(簡/繁):: 英文高清發音聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sj6nmb8blLw",
            "title": "外師用實用英文中長句教你聽力(簡/繁):: 讓你聽懂生活中用語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OgqkfhICCw4",
            "title": "外師用實用英文生活句教你聽力(簡/繁):: 聽懂生活用句超簡單",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "PJprk1BEBbg",
            "title": "外師用實用英文長句教你聽力(簡/繁):: 英文高清發音聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "puP9Gyf1k38",
            "title": "外師高清導讀帶你說好英文長句表達:: 徹底提升英語口語技能",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "zXDb3jVXExs",
            "title": "外師高清發音助你快速搞定中長句:: 跟讀英文口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TT-MPqrlrQ8",
            "title": "外師高清發音助你快速搞定中長句::英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "B2zuQyPkd7M",
            "title": "外師高清發音助你聽懂英文::簡/繁::英文聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "43xf9YMxHJM",
            "title": "外師高清發音助你開口說的一口好英文(簡/繁):: 英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "u8mshPMCwQ8",
            "title": "外師高清發音帶你練好英文聽力(簡/繁)::50分鐘練好生活聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2QRVvxyuzXQ",
            "title": "外師高清發音帶你練好英文長句(簡/繁):: 英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "jx7Q3NzJxt0",
            "title": "外師高清發音教你聽懂生活英文(簡/繁):: 英語聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Ggoa8jLxmLc",
            "title": "外教助你「英文聽力技能提高一級」::突破學習瓶頸",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mcuU4O63wg0",
            "title": "好招助你學英文！這些英文沒你想的難:: 一日生活用語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OicquIOgZlE",
            "title": "字字重要::用1到2個英文單字就完成表達意思:: 聽懂英美人士高頻用詞",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LVcvoIgnHZs",
            "title": "學好英文必懂的片語全收錄|  附文法引導及實用例句運用 |雙聲版一併教你學好怎麼發音",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6d0K_JXrDL4",
            "title": "學好英文有秘技:: 必懂的形容詞運用:: 快速累積英文實力!!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hW0G4bIIvW0",
            "title": "學好英文高效聽力口說【生活篇】|實用句全收錄讓您easy學好英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2v_lsPMHGD0",
            "title": "學會英文造句就這麼簡單 :: 英美最常使用片語:: 舉一反三好輕鬆:: 高效提升英文實力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "VzTJfARXg4E",
            "title": "學會造句就這麼簡單 :: 英美最常使用片語::英文聽力文法一起練好!!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0iowDFJrvLw",
            "title": "完全掌握住英文!!!外師助你說出想說的話:: 超好用的生活英語表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "v0vyTkwtoRE",
            "title": "實用英文交流美食::餐飲句型::怎麼問怎麼介紹::聽力口說訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "w8HNDZwbafM",
            "title": "導讀帶你說的一口流俐英文::包羅萬象「不同廁所型式」表達:: 超齊必學！！",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "VhmHjwslw5A",
            "title": "導讀帶你說的一口流俐長句的英文口說:: 高清發音助你快速搞定長句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "bWjM3zPmX5Y",
            "title": "導讀教會你表達生活英文「家務事」::英文口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "a4xh5qy5SNY",
            "title": "廚房餐廳「各種作菜方式」::英文聽力練習::每天會用的英文表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "xtL-purElPU",
            "title": "強化英文口語表達力100句::那些學過卻不懂如何運用的英語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Ru1wBwjXP38",
            "title": "役に立つ英語の表現:: 毎日使うことができます",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_-MDXQHF8ng",
            "title": "從模糊到聽懂::原來這些英文這樣說:: 1小時就學好生活英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OgQx9vV5J94",
            "title": "從英文初階升級中長句::生活篇::英語聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "IvDJYxwqBUw",
            "title": "徹底搞懂!!!那些英美人士說什麼?英文中長句聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7EOfekSwlUQ",
            "title": "必備英文短語技能::簡簡單單學句句都實用！202句英美常掛嘴邊的短用語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4vrTm4edKSI",
            "title": "必學必會的超市英文用法:: 美食街、熟食區、超市推車...等:: 這些英文怎麼說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "PbgEunemIXg",
            "title": "必懂的趨勢英文:: 帶口罩防病毒的大小事::英語口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ohsewJ_6gZ8",
            "title": "必背必會!!!英美高頻詞的重要表達::提升英文實力的關鍵",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "C8lpGP_SiMM",
            "title": "快樂唱歌學英文::常速::慢速::歡快::三段變速教會你::You Are My Sunshine",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cH3iPQC77HU",
            "title": "快速搞定英文中長句::跟讀就學好英文口說::外師高清發音帶著你念",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "55AJqWSLnjo",
            "title": "怎麼說好英文？這些更好的英文表達方式:: 學好讓你一生受用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sqi3uuvgDzk",
            "title": "抓住關鍵::用1到3個英文單字就完整表達意思:: 聽懂英美人士高頻用字",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "B__1f4TnGfs",
            "title": "提升英文力必要養成！放著聽跟著讀就OK！外師助你從初級提升到中級",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "HDR5wFUTfbM",
            "title": "提升英語聽力進階技能::中級 :: 用好方法學好英文::增進您的英文力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "h7PabelrmM8",
            "title": "提升英語聽力進階技能::中高級::s2 :: 用好方法學好英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "lYGNm3t7bc8",
            "title": "提高英文聽力技能:: 生活溝通技能篇::短句精選::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "XtTdpAVMlO8",
            "title": "提高英文聽力技能:: 生活篇::中長句100選::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Cs5MNLX6qko",
            "title": "提高英文聽力技能:: 生活篇::中長句50選::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ixHGFS-a300",
            "title": "提高英文聽力技能:: 生活篇::廚房飲食::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "XndaFkURxIA",
            "title": "提高英文聽力技能:: 生活篇::廚房飲食::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "1pNUlM3BXLQ",
            "title": "提高英文聽力技能:: 生活篇::短句100選::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "UaFFrJVg6oE",
            "title": "提高英文聽力技能:: 生活篇::短句50選::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "MUs422M7Lpg",
            "title": "提高英文聽力技能:: 生活篇::短句精選::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rbaGrpft0Yo",
            "title": "提高英文聽力技能:: 生活篇::較長句100選::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mScRl4JpePA",
            "title": "提高英文聽力技能:: 生活篇::長句100選::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4jd1qL_wNIc",
            "title": "提高英文聽力技能:: 生活篇短句::常用句100選::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "W70XPZdKmmY",
            "title": "提高英文聽力訓練:: 生活篇問與答::升學國外生活實用::學了馬上用的上",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "SgKEGcyIFx0",
            "title": "換個腦袋思考英文「地道表達」::讓你不知說的流俐更說的地道",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sTmUXbH2Rek",
            "title": "旅行必要的英文表達::句句重要::反覆聽跟著讀就學會！",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "1j4fugae2Cw",
            "title": "旅行緊急用語英文口語練習::不可不會！出國必備!!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rm_lnI189MA",
            "title": "旅行英文:: 旅行前「必須必備」的英語能力::背熟這部萬事OK::聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-FOLysoZg24",
            "title": "更勵害多元的英文表達課程:: 不要只會說「I am sorry」教會你怎麼表達不同程度的抱歉",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hlqAAK_LJC0",
            "title": "更好的英文表達方式:: 換個腦袋說「好」英語::英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mVNSMZJ3MMM",
            "title": "最好的初學者英文口說訓練教材:: 1000超實用英文短語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "9HQ3HQE65RE",
            "title": "機場和飛機上英文表達運用:: 英文口說練習:: 一定會聽到說到的句子",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EZcivZ4rYXI",
            "title": "機場大小事英文:: 常聽到的/想問會問的/緊急狀況處理::| 英文聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "eujv6WYyU1g",
            "title": "機場英語101句重點::超全超詳細::一定會聽到必懂的表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0ipr92c3Bzg",
            "title": "機場英語必備:: 通關重點/緊急狀況處理及溝通:: 英文聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "n4vM__R_mdE",
            "title": "每天用到各類「道路及狀況」怎麼說:: 英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "AbTA2H3xruY",
            "title": "每日生活短句型100英文聽力訓練:: 破除你對英語困難的迷思",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TxCiUzy4K5s",
            "title": "流俐你的英文口語表達:: 「鼓勵別人的各種表達」方式",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "jMd9_SAZEP8",
            "title": "流俐你的英文口語表達::200超實用生活英文短語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "n3LHrFnQYtU",
            "title": "海關機場篇| 手把手教您海關問與回答 |及聽懂機場飛機上所有重要資訊| 英文聽力口說訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "RByWJdBWGHQ",
            "title": "無往不利300句生活英文會話集::一問一答練習::讓你聽懂問話也能回答",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "MH7ky5smABw",
            "title": "片語運用英文聽力練習:: 事半功倍 學習不累",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "MdQWl1vCgS0",
            "title": "玩具總動員精選筆記100句::慢速常速::看電影學英文::直接學精華",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "U1-aVehkr7k",
            "title": "生活「高頻英文用句」原來這些話這樣說:: 英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "aLCWjXAarE4",
            "title": "生活常用英文100 ::教你學會想表達的英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "B7T4oY5WZ_o",
            "title": "生活必用到的英文「高頻率片語05」:: 不管你在哪個等級都好用::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "RwDN26IFPbs",
            "title": "生活的那些小事::英文口語練習:: 外師高清慢速助你用長句表達生活",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OHmaWGP7R_I",
            "title": "生活習習相關「原來這些英文這樣說」:: 外師高清發音:: 英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hud_osxwCqM",
            "title": "生活英文:: 導讀教會你流俐口語「起床習慣描述Good morning」各種描述",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "nX05Lho5k7w",
            "title": "生活英文:: 教你聽懂每日生活「放鬆情緒take it easy」各種描述",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-bjHCMDiq58",
            "title": "生活英文:: 教會你聽懂「起床習慣描述Goodmorning」各種描述",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "R7DX9a-BywM",
            "title": "生活英文:: 教會你聽懂各種「加油打氣」的英文描述",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "PLp4cSL5Bic",
            "title": "生活英文「放鬆Let it go」各種「對話運用」::教你懂的與別人談話:: 英文聽力會話練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Q8dZhXXvlbY",
            "title": "生活英文「短句」各種場合「暢所欲言」::快速聽懂並開口說英文::聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "blVI4fvA2T0",
            "title": "生活英文實用500短句:: 反反覆覆練輕鬆就學會::初學也能暢所欲言",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "5HFEiLQQiKE",
            "title": "生活英文教你聽懂「各類廁所、內急」用法::必學必會的英文描述",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3cVCjyKX7Wk",
            "title": "生活英文教你聽懂「家務事」::每日會用的英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "MmpU6D4DKUs",
            "title": "生活英文教你聽懂「這些那些家用品」::必學必會的英文描述",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "83ooxVdoErk",
            "title": "生活英文聽力::瞬間提升技能::你常聽到的話其實很簡單:: 英文高清發音聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "dF6pM0CZEB8",
            "title": "生活英文，教你開口流俐說「3C生活家電句」:: 生活長篇口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0zDdMJpwqIo",
            "title": "生活英語::老外說的take your time啥意思::讓你輕鬆說的一口流俐英語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LegA0BGbnwA",
            "title": "生活英語「再見」各種「對話運用」::教你如何與別人的談話:: 英文聽力會話練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Mij0DE0FAzo",
            "title": "用英文搭上話！這些英語問與答:: 跟讀就學好如何提問和答話",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "dFI6ErrbPhQ",
            "title": "用英文蝦拼有招::招招必學::英文口語跟讀購物篇::超級市場::特惠搶購中",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Tvq2PVWToXc",
            "title": "百搭萬用句型雙倍效率學好英文:: 告別挫折快速學好英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "myIqokWVkNE",
            "title": "省時省力倍速學好::英文聽力&amp;造句一起學好::英美高頻形容詞名詞等的常用句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ei46JfxirB4",
            "title": "看懂英美劇必要的慣語俚語能力養成:: 學好道地英文的關鍵::英語跟讀",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8fhOWVnMI_w",
            "title": "看懂英美劇表達::中級::地道英文聽力訓練::高清外師發音",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "SK7Xv_0yqrU",
            "title": "看懂英美劇表達::地道英文聽力訓練::高清外師發音",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "X_9J7dO1XHs",
            "title": "看電影學英語::560全精選::美女與野獸:: 用英文故事聽出好聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "PcmrCn7ZrfU",
            "title": "看電影學英語::冰雪奇緣2台詞精選(全)::聽懂看懂英美電影說的是什麼意思",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "XRAWZH7phtg",
            "title": "短文故事理解力提升(簡/繁)::圖解英文聽力練習:: 聽著短故事技能就提升",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OoSIBIMn9ng",
            "title": "秒懂機場旅行大小事英文問與答:: 出國所有重要資訊:: 英文聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "d6gZnXwxeAM",
            "title": "秒懂英美劇中說的地道常用語俚語::和外國人一起說口語::Useful Daily English",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7ouDe6eQV-4",
            "title": "秒懂英美劇英文聽力訓練:: 英美劇中道地的俚諺語慣用說法:: 學會這些輕鬆看懂英美劇::輕鬆教會你聽懂",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Uo9ZnCL8DpY",
            "title": "秒懂英美劇英文聽力訓練:: 英美劇中道地的俚諺語慣用說法:: 這些英文你想的不一樣::輕鬆教會你聽懂",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "w4_8hVzM_m8",
            "title": "秒懂英美劇英文聽力訓練:: 輕鬆學會英美劇慣語俚語:: 輕鬆教會你聽懂",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3ZLAr0izsiM",
            "title": "秒懂英美劇訓練::聽力訓練::英美人士掛嘴邊的口語句子",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uVW4KlYeS-k",
            "title": "秒懂英聽美劇聽力訓練:: 原來這些話用英文這樣說::輕鬆教會你聽懂",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "jS12szENYZo",
            "title": "秒懂英聽美劇聽力訓練:: 英美人士常說慣用語、俚語::輕鬆教會你聽懂",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cdB3-C1nhAQ",
            "title": "秒懂英聽美劇聽力訓練:: 英美人士掛嘴邊::短句句型::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "a-5PlonPbWo",
            "title": "秒懂英聽美劇聽力訓練:: 英美人士掛嘴邊::長句句型::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Gff7Udhf1Tk",
            "title": "秒記英文聽力訓練:: 中高級生活篇::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YVYiBWlv_80",
            "title": "秒記英文聽力訓練:: 生活篇::短句精選::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "DbeSY2xSW9o",
            "title": "秒記英文訓練::生活問句與回答Q&amp;A::中長句聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3gUbymrbHIc",
            "title": "秒記英文訓練::生活問句與回答Q&amp;A::長句聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "DJUhqS8KJsE",
            "title": "秒記英文訓練::英美劇俚諺語慣用語::生活問句與回答Q&amp;A::聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "4krAnWAAVO0",
            "title": "秒記英文訓練::英美劇俚諺語慣用語::生活問句與回答Q&amp;A::長句聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "heDxhj0HEps",
            "title": "秒記英文訓練::英美劇俚諺語慣用語::生活問句與回答Q&amp;A::長句聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CXBzLA8aiwg",
            "title": "秒記英文訓練::英美劇俚諺語慣用語::生活問句與回答Q&amp;A::長句聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "c4YwnGvk_Tk",
            "title": "秒記英聽美劇聽力訓練:: 英美人士慣用語俚語::短句::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "L-FZ4mHzWVg",
            "title": "秒記英聽美劇聽力訓練:: 英美人士慣用語俚語::長句::升學國外生活實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "f90fZKT556s",
            "title": "秒速提升您的英文長句聽力:: 這些生活英文這樣說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8DmL9g4EjT8",
            "title": "突破口語:: 英文一問一答練習::讓你聽懂別人問話也知道怎麼回答",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "F7ZpyefCZtE",
            "title": "突破英文口語「流俐說出長句」::用好句子練好你的英文口說力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3DWgFHB86zA",
            "title": "突破英文聽力瓶頸 助你成功聽懂長句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Ui_GWsZsXo4",
            "title": "突破英美劇聽力:: 生活高頻極短句:: 英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CUiENBm1n9M",
            "title": "突飛猛進的關鍵!!生活必備的英文會話::聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_lGy8CopQDM",
            "title": "簡單卻不易聽懂的英文表達::聽力訓練::英美劇俚諺語慣用語::英語磨耳訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-yN4SSJW1_U",
            "title": "簡單從零開口說英文短句200:: 跟讀:: 外師高清發音帶你念",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "M6LQJ-0IaEc",
            "title": "簡簡單單就能學好英文應付生活::英文會話問與答聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "liq_eVnDXsI",
            "title": "練出一口地道英語(附音標)::英美人士口中的::短語慣用語:: 常速、慢速",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "a4yAO7biyYo",
            "title": "練出一口地道英語::英文口語練習::讓你說的一口流俐英文::常速、慢速",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "WtJ-4qg8lNk",
            "title": "練出一口地道英語::英文口語練習::讓你說的一口流俐英文::常速、慢速",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-5Hjgdujk-A",
            "title": "練出一口地道英語::英美劇俚諺語慣用語::生活問句與回答Q&amp;A::長句口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "g7_UWxEmiTs",
            "title": "美劇中最經典100句台詞《六人行》| 電視節目影集常用句- 學完馬上開口用英文聊天",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fseFvWcx7Jg",
            "title": "肯定用到！出國必備英文::從機場、交通、到飯店精華全集",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "SweKjkfC-OA",
            "title": "背好這些句型:: 讓你學英文事半功倍:: 零基礎到能造句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "g8gWp4zJZJk",
            "title": "背好這些句子:: 成功在生活中開口說英文:: 外師高清發音跟讀練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LmCv_J3nEjs",
            "title": "英会話短文｜リスニング・スピーキングの練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "pcyy_X-rYRc",
            "title": "英文1-3字簡簡單單學::輕輕鬆鬆會::英美人士生活中最常聊的短口語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "0q0rbMh96pM",
            "title": "英文1-4字短句::1000英美最高頻用詞::用簡單的方式就能表達意思",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "rQFReDoZkAM",
            "title": "英文「不客氣」各種「對話運用」(簡/繁)::教你如何回覆別人的話::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "SI5NkX1YqmQ",
            "title": "英文「你好嗎」各種「對話運用」::教你如何回覆別人的話:: 英文聽力會話練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "al119skUm6w",
            "title": "英文「好壞運」各種「對話運用」:: 教會你生活中的對話表達::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "b2XQ_suammU",
            "title": "英文「對不起」各種「對話運用」::教你如何回覆別人的話:: 英文聽力會話練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2B7xvXWilGs",
            "title": "英文「快點！」各種「狀況運用」(簡/繁)::教你在各種場合如何表達急迫::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hPZfN9o6Stw",
            "title": "英文「高頻率片語06」::不管你在哪個等級都好用::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "91LKmoDiNlQ",
            "title": "英文「高頻率片語07」什麼等級都好用::外師助你一次學好片語及聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "spd7JzWw9ks",
            "title": "英文一問一答聽力練習::聽懂英文搭上話::提問和答話",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "8mP37Mw08rw",
            "title": "英文不好學這部::從機場到飛機上會聽會說的重要短句表達::輕鬆告別煩惱",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7KD4HaScq94",
            "title": "英文中各種片語、慣用語「放鬆點 別緊張」都怎麼說?:: 教你流俐表達口說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Vlp5szv4YKY",
            "title": "英文中級聽力寶典::由淺入深手把手教會你::必會常用的文法句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "R2U249TTFaQ",
            "title": "英文初級提升到中級:: 重要的can和can't長句句型::口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YA-1Mlyg3kw",
            "title": "英文初級聽力寶典::由淺入深手把手教會你::必會的5W1H及最常使用動詞句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "S0jQoUtVvec",
            "title": "英文口語技能::購物用語::從頭到結帳買東西流程(含抱怨/退貨/維護您的權益)::手把手教會你讓表達更靈活",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YHv5nRrwISI",
            "title": "英文口語短語:: 初學也能說的像外國人:: 電視節目影集高頻率句:: 給英文初學者最好的教材",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "B8QXeLHtIIE",
            "title": "英文口語跟讀::生活篇::從零跟著讀就能開口說英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "97kbreqWmpw",
            "title": "英文口說:: 餐廳點餐廚房用語「各種作菜方式」::生活實用表達:: 調味料、烤、蒸、油炸",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cvvJpOAGhqo",
            "title": "英文基礎聽力寶典::由淺入深句子::超好上手快速學好英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "MfYK6b5NwV8",
            "title": "英文導讀助你「早日流俐說長句」::有效的口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "y3oxKkvzNX8",
            "title": "英文故事短文有聲書::強效提升理解力::刮鬍子出鎚篇",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "_2YcNP7bGDo",
            "title": "英文故事短文有聲書::理解力提升::英文聽力:: 雨中野餐篇",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "x-TjObj4_Bg",
            "title": "英文故事短文有聲書::高效提升理解力::奇妙動物園篇",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "40Sl8oCJYRA",
            "title": "英文故事短文有聲書::高效提升理解力::步行水果店篇::英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "SobsvlMhjT8",
            "title": "英文最基礎常用百搭萬用句讓你開口能造句::英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sM3phUIV8nI",
            "title": "英文會話 Q&amp;A長句表達:: 聽力練習:: 「對話篇」助你聽懂也能回答",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Ajm5FMmQP7A",
            "title": "英文會話100生活篇:: 讓你聽懂別人問話也能流俐回答",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "g9OA9sLQSts",
            "title": "英文片語句::生活篇::用生活句學好片語:: 英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "d7g3Q7mTlrY",
            "title": "英文生活句口語練習::句句實用:: 外師助你初級跳中級",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "64_dtZJeVAI",
            "title": "英文生活常用短句100 ::換個語言腦袋想英文:: 原來這些英文這樣說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "mXrdFf3FDP4",
            "title": "英文生活最常聽到「可以」「不可以」表達運用(简/繁):: 英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "QL_H3hxXibc",
            "title": "英文百搭片語助你開口能造句:: 學習捷徑倍速掌握好英文:: 片語搭配例句引導",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3yO2x7QHEcA",
            "title": "英文百搭萬用句讓你開口能造句::快速掌握好英文的學習捷徑::口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "DKW_f28rMiQ",
            "title": "英文短句200聽力:: 這些英語生活中很必要 !!!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "boFCWhwtfKY",
            "title": "英文短句會話對答:: 生活實用篇:: 輕鬆學快速開口說英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ICOB3I-E6JY",
            "title": "英文短句聽力練習::生活篇::英文菜鳥救星",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "TrHaHngdFpI",
            "title": "英文短句聽力練習::生活篇::英文菜鳥救星",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Nptb-ZV0fqY",
            "title": "英文練習提升聽力口說技能【中級篇】|實用句全收錄讓您easy學好英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iWGGIT6z274",
            "title": "英文練習提升聽力口說技能【中高級篇】|實用句全收錄讓您easy學好英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "F_VYl2I-k-Q",
            "title": "英文練習提升聽力口說技能【初級篇】|實用句全收錄讓您easy學好英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "aWtjQhOuioc",
            "title": "英文聽力練習::老外都在聊什麼?? 聽懂閒話家常::成功打入英美圈",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "YXwuAEOsPps",
            "title": "英文聽力訓練:: 100句初級生活篇::學了馬上用的上 ::高效提升英文力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "qkhBZGFD_jw",
            "title": "英文聽力訓練:: 慢速及常速讀音 ::中級生活篇::學了馬上用的上 ::高效提升英文力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "bD4wujpzBz8",
            "title": "英文聽力訓練:: 慢速及常速讀音 ::初級生活篇::學了馬上用的上 ::高效提升英文力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uZCsGv64kyk",
            "title": "英文聽力訓練::360度對生活中各種場面合適的讚美句::好人脈是誇出來的",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "wk4Cu0Jz46o",
            "title": "英文訓練::原來這些英文這樣說::明明很簡單卻不一定懂表達::聽力訓練::生活中很實用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "453_2NmS2vs",
            "title": "英文訓練::原來這些英文這樣說::明明很簡單卻不容易弄懂的英文::聽力訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "h0EUs-UkHfA",
            "title": "英文課本中最常聽到的句型::文法提示及例句示範::高效練好聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "xOGP6ZOlK64",
            "title": "英文課本初級句型超好用的As和like句型::一次搞懂怎麼用::高效練好聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "STciHV--nNU",
            "title": "英文超市各種「實境用句運用」::外師教你必懂的生活中的英文表達",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "28AR2COxf6Y",
            "title": "英文輕鬆開口說::流俐你的英文口語表達::200超實用生活英文短語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "S--UCydKQwM",
            "title": "英文長句聽力訓練::不知怎麼說的生活句::生活中很實用的英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "3lAPjdPwM8k",
            "title": "英美人士最常說的220句話:: 短語::俚語::口頭禪- 給英文初學者最好的教材",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cQdJ0ScadDE",
            "title": "英美人士說話最高頻詞:: 搭配運用短句:: 學完開口說英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "H85KW0MCBOo",
            "title": "英美劇中最常見的短句子:: 教會你聽懂地道英文意思:: 老外都在說什麼???",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2GnRPE6DM6Y",
            "title": "英美劇學習筆記::來自英文部編輯彙整200句::六人行::絕望主婦等",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "jplaD0Zti8w",
            "title": "英美劇常出現用語::最適合初學者::快速掌握英美劇用語意思::英文短句聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "LHNYOh0uHa8",
            "title": "英美劇掛嘴邊的200句話:: 極短句:: 英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "peCV0JqijjY",
            "title": "英美劇最常聽到100短句::英文聽力訓練::輕鬆聽懂慣用語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "nHPq1Rjy7Ac",
            "title": "英美劇最常聽到200極短句::英文菜鳥救星快速學好英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "2itSGJvhD6Y",
            "title": "英美劇最常聽到200生活短句::英文菜鳥救星::快速學好英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "aBVD1IhVAxk",
            "title": "英美劇最常聽到的200句型::輕鬆練好流俐英文口語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-yEW6AzLAtA",
            "title": "英美劇最常聽到的200句話| 電視節目影集高頻率句- 給英文初學者最好的教材",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "lZavHKozCAE",
            "title": "英美劇最高頻常聽到200句話:: 極短句:: 英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6XVFPmV-HW4",
            "title": "英美劇都在說什麼? 原來這句話是這意思!!!英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "7clklq4VWQc",
            "title": "英美劇高頻生活200極短句::就這麼簡單::英文聽力放就聽輕鬆學會",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "76OACoBaI90",
            "title": "英美劇高頻生活常用200句話:: 極短句:: 英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "s0zXV4xkJeI",
            "title": "英美常用的片語運用 :: 開口流俐造英文句其實很容易::把文法口語一起練了",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "geA1lw9y3uU",
            "title": "英美影集最高頻用語::地道必會:: 極短句:: 英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "QtUlcaUZJnc",
            "title": "英美最常用副&amp;介詞運用100::英文聽力文法一起練::事半功倍學好造句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "AnnwlgPTIZo",
            "title": "英美最常用句型帶例句教學:: 一生肯定用的到:: 英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "BDwJz7vSeP8",
            "title": "英美最高頻率句型:: 聽懂英文母語者表達結構句型:: 好搭好配",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EbhsyKLCoQk",
            "title": "英美生活常用的短表達:: 聽聽地道英美人士怎麼說 ::英文聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "cAoHwhUFC28",
            "title": "英美生活常用短語75句| 電視節目影集高頻率句- 給英文初學者最好的教材",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iXK1L-l6BIA",
            "title": "英美高頻片語運用:: 英文聽力文法一起練:: 事半功倍學英語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "OENBpLXRb-g",
            "title": "英美高頻用詞::英文短句聽力聽寫:: 邊聽邊寫高效加深記憶力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EXdwmmdIXMg",
            "title": "英語の聞き取り55::初级 ::Easy!!::Quick!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "NOwuNgWLl-c",
            "title": "英語慣俚語長句助你說出「地道英文表達」::英文口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "UPgCovrz358",
            "title": "英語母語者日常對話:: 生活長句問與答::英文口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "09zFYwop4z8",
            "title": "萬用的25個句型(含例句)::學好英文偷吃步::高效聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "H_Ef7Z0obgY",
            "title": "解你學習的苦:: 放著聽就有效果:: 英文生活口語練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-olkfiwO3n8",
            "title": "訓練您的英文回答反應力及聽力【生活常聽問句P2】|學好英文高效聽力口說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ncRuNkEwKEs",
            "title": "訓練您的英文回答反應力及聽力【生活常聽問句】|學好英文高效聽力口說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "V_BuVjIsY-k",
            "title": "讓你快速開口說好英文短句::可以運用在各種生活上::跟著讀反覆聽快速進步",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "faVhAWVLQHM",
            "title": "讓你自信積極英語句:: 不止聽更要記進心裡!!You're the best!!你是最好的",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iMM_8S4nXaY",
            "title": "超實用一定要會說的超市英語:: 英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "c4K9H6X0GvU",
            "title": "超實用的生活英文表達:: 導讀帶你高效學好英文口語",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Yf3ffDr-j0I",
            "title": "超市一定會聽到的英語(超重要)::英文聽力練習:: 買一送一、折價券使用、自助結帳",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-In3AIZceeM",
            "title": "超簡單就學會生活英文:: 輕輕鬆鬆就學好聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Np4jB-KZCns",
            "title": "趨勢英文課本沒教你的:: 帶好口罩 保持社交距離 自我隔離::英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "VEtk8q4f9jU",
            "title": "跟著外師讀就說出一口流俐長句::英文口語瞬間提升",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "IDNNprPtB0A",
            "title": "跟讀英文口語練習:: 外師教會你「這些生活表達這樣說」",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "n7pIgncoq4I",
            "title": "輕鬆學好英文初級聽力寶典(生活/考式)::聽力文法一次補齊::由淺入深例句教學",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "iuJzYSVqKt0",
            "title": "輕鬆學好英文如何聽懂開口說(中文字幕)★ #2 國外生活、旅行、商務和社交生活、升學考試的日常英語句子",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "n8ofFQcI144",
            "title": "輕鬆學好英文如何聽懂開口說(中文字幕)★ #3 國外生活、旅行、商務和社交生活、升學考試的日常英語句子",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "CXaaP99BvGg",
            "title": "輕鬆學好英文如何聽懂開口說(中文字幕)★ #4 國外生活、旅行、商務和社交生活、升學考試的日常英語句子",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "vGJmADmBHd4",
            "title": "輕鬆學好英文如何聽懂開口說★ #1 升學考試、國外生活、旅行、商務和社交生活的日常英語句子",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "ej7iWyxSK0Y",
            "title": "輕鬆學好英文會話:: 生活問句與回答Q&amp;A ::初級英文高效聽力口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "F4PieS35efk",
            "title": "輕鬆學好英文會話★ #2【迴音法學英文】| 教您活用課本教學開口說英語| 社交會話英文常用問句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "tZkhPUl3y1M",
            "title": "輕鬆學好英文會話★ #3【迴音法學英文】| 教您活用課本教學開口說英語| 社交會話英文常用問句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "hfMdsvOGMEY",
            "title": "輕鬆學好英文會話★ #4 升學考試、國外生活、旅行、商務和社交生活的日常英語句子",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "NwHhi1Lw8V4",
            "title": "輕鬆學好英文聽力寶典::居家生活必學短句::做飯、三餐、廚房",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "KATDcFvyHzU",
            "title": "輕鬆學好英文聽力寶典::道地又簡單::由淺入深例句教學",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "-j78G07u2uw",
            "title": "輕鬆就能練好聽力100英文短句::不知道怎麼說的英文這樣說",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "EihhgXI8x0c",
            "title": "輕鬆跟著外師讀:: 助你說的一口流俐英文表達:: 英文口說練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Y-Y4DUsSMfk",
            "title": "迅速提高英文口語能力::初學者也辦的到::生活極短句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "BQsU4-eM7l4",
            "title": "这些英语短语百搭句很好用:: 带例句运用:: 文法口语一次学好",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "qexW6KTqvwA",
            "title": "迴音法學英文【中級單字篇】| 背單字同時了解如何運用| 聽力口說也一併訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "MKZsLbre61c",
            "title": "迴音法學英文【初級單字篇】| 背單字同時了解如何運用| 聽力口說也一併訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "T6o7JNj9OII",
            "title": "迴音法學英文【高級單字篇】| 背單字同時了解如何運用| 聽力口說也一併訓練",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Ek8WjNUSgAA",
            "title": "這些百搭短句很好用短語口語一次學好:: 100句輕鬆開口說英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Z7TBghEuBv4",
            "title": "這些英文「百搭萬用句型」很好用:: 學會馬上造出句:: 英文聽力練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "Eu-rW7PsoVY",
            "title": "這些英文「高頻率片語02」很好用:: 片語、文法、口語一起練:: 事半功倍學英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "uvD-tjJYXrk",
            "title": "這些英文片語很好用:: 片語口語一次學好:: 帶例句片語運用",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "u7B7JFMdA-s",
            "title": "這些英文表達在生活很重要::學會生活無往不利:: 聽力",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "DZhwfbep2Cs",
            "title": "這些表達助你英文口語提升一階:: 生活中常需要說的句子",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "sqFZRgWbdyk",
            "title": "這些高頻率「英文片語」很好用:: 片語、文法、口語一起練:: 事半功倍學英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "oEZB2oGeV6U",
            "title": "這些高頻英文單字原來這樣運用400::口語文法一起練:: 助你開口能造句",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "yCmxMDVO7oE",
            "title": "速通英美劇::讓你聽懂英美劇意思::英文聽力練習::這些生活英語很好用!!!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "zzl4n3HOOWs",
            "title": "進級你的英文聽力:: 外師高清發音:: 生活篇(簡/繁)",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "vc0COt2UkEs",
            "title": "重要的英文高頻動詞運用:: 助你高效學好開口能造句:: 文法 &amp; 口說一起學",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "JaoZp6cRhXY",
            "title": "開口溜英文就這麼簡單:: 用地道英語表達想說的:: 跟讀練習",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "dHN3k1oTJnY",
            "title": "開口說真容易:: 輕輕鬆鬆就學會::生活化的英文表達300:: 简/繁",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "v6fgQZ-ivxw",
            "title": "開口說英文真容易!!! 英美劇中最常見的短句子::原來這句話是這意思!!!",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "18z9TLz4Pmg",
            "title": "電話英文:: 外師教會你專業的英文電話表達(全集)::必學必會",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "J2rKVgZud5U",
            "title": "電話英文用語聽力全集::必備的拼字能力、數字及email等的訓練::必備並包含！",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "6_0U_nILSb8",
            "title": "電話英文高頻用句:: 外師助你說好電話英文::跟著讀就變流俐",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "omKmNElFTE4",
            "title": "飛機上廣播英文::聽力訓練::一定會聽到的機上廣播的流程順序",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "fjOfrZX5rT0",
            "title": "高效英語學習自助零煩惱::從機場、交通到飯店::跟著讀就萬事ok",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          },
          {
            "key": "vF4w6jR2ca4",
            "title": "高頻率使用的「英文片語」超好用:: 片語、口語一起練:: 事半功倍學英文",
            "author": "Ozma英文",
            "date": "2021/11/16 11:30:00"
          }
        ], 
        "向上英文" : [
          {
            "key": "Re_YXSnkxjo",
            "title": " Look的常用英文片語（高頻片語篇）",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "hZOzgL2OZxM",
            "title": "英語聽力（初級150句）",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "-u2AHYXnVDs",
            "title": "實用基礎英文訓練",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "hUbyvM2oaxY",
            "title": "逐漸聽清楚外國老師的英文發音！",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "LSuKLWVlOWc",
            "title": "英文超短句600個",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "haI3t4wn-tU",
            "title": "生活英語口語200句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "xL1MZyrSpsI",
            "title": "生活英語短句200",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "K-ndC94NrG0",
            "title": "常用英文訓練100句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "d-T9Xj9BmX4",
            "title": "英美人士常用英文表達",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "g-RtiLokEFs",
            "title": "初級英語聽力",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "quGhc4eIMYc",
            "title": "聽力兼口說訓練300句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "7sdSYxQEmKs",
            "title": "实用英语听力100句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "zr6BfLOYRNU",
            "title": "英美劇常用表達聽力訓練（第二集）",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "GqWH2fofnII",
            "title": "英語初級聽力",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "zZjY_eNguIs",
            "title": "英語聽力提高特訓",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "FRAPD9WDhyU",
            "title": "最有效地提高您的聽力水平（第二集）",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "AfEHiVau8dI",
            "title": "牛津英文核心3000詞 - 第1集（帶音標/例句/繁體/簡體）",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "sP9qZI_KalY",
            "title": "牛津英語核心3000詞 - 第2集",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "wvvI589TtJQ",
            "title": "基礎英文54句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "VjR-hnP4IV4",
            "title": "必學「英語片語」",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "9KOawJHzxBA",
            "title": "美國人說常用英語100句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "NGchVWnGXsU",
            "title": "100個重要英文句子訓練（初級篇，強烈推薦）",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "tFm_EmpVc_M",
            "title": "最實用最浪漫的48句英語情話/表白",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "h2y6kZsroC8",
            "title": "英語簡短會話/聽力特訓",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "BDpK3KmqOVQ",
            "title": "加強提升英文敏銳力47句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "XgICB3YgcyI",
            "title": "英語聽力訓練48句日常表達",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "NkMJDGgybTw",
            "title": "實用英文句子115個（初級篇）",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "Un39QRFWmxk",
            "title": "英文聽力練習69句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "riJUZMww1Hg",
            "title": "52個常用句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "GL8NPRrsRWw",
            "title": "漸進式提高英文句子難度（從基礎到進階）",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "87GMrfXz5v8",
            "title": "美國人生活表達100句！",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "IHAtHikIYGI",
            "title": "生活英語95句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "G8eg12KfKNs",
            "title": "簡短超實用英文",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "Tu4HkGx0npA",
            "title": "輕鬆英語課堂",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "Eh352C2db7w",
            "title": "提高英語耳朵敏銳力118句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "Qm5x_9tDQi0",
            "title": "初學者英文短句130句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "h83io0QKh_M",
            "title": "美國人常用英文50句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "4_Q0iaI8A4Q",
            "title": "美國人說生活實用英文",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "In_xh3ijxks",
            "title": "生活中高頻率片語",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "pNqbCE8dKqs",
            "title": "精選英文97句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "1BCIyCGfDKY",
            "title": "老外基礎英語學習 顯著提高英語聽力訓練",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "Axv78P57nVg",
            "title": "生活常用英語90句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "30VtYIZV9_U",
            "title": "聽懂美國人生活英語 - 快速提高您的英語聽力水平！",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "mn9oSw5G9Lo",
            "title": "基礎提升篇",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "JZFsrAPIbWM",
            "title": "英文學習100句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "ijKV8EcaX6E",
            "title": "英文聽力從入門到提高",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "LuEbz4LrCAo",
            "title": "學習英文基礎42句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "91oFJwnS73Y",
            "title": "常用英語表達句型49個",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "TwX_RWrQEIY",
            "title": "日常52句很實用英文",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "LCuOgVAMIhg",
            "title": "美國生活用句100句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "y5bAgbpeHSk",
            "title": "500個英文短句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "RpcLOtr31JE",
            "title": "聽力訓練300句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "Qv9wlianYyU",
            "title": "聽力訓練200句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "oUcOxgBp9YU",
            "title": "生活英語口說108句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "k8bL3Fbewqw",
            "title": "英文基礎句子",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "BeS2XeVMG_8",
            "title": "高效提升英語聽覺 日常英文聽力練習",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "J4xctPq4r-8",
            "title": "英語聽力102",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "uzdCGUIZXUo",
            "title": "英語聽力200句（初中級篇）",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          },
          {
            "key": "H8opjYkXRvM",
            "title": "英語聽力必練100句",
            "author": "向上英文",
            "date": "2021/11/17 08:00:00"
          }
        ],
        "Club James Studios": [
          {
            "key": "gZQ0rL2EiE4",
            "title": "100 Conversation Sentences",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "BCOqE2xdsIQ",
            "title": "100 個日常使用的英語單詞、含義 + 句子",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "uX_kRj4fprY",
            "title": "100 句日常英語短句 | 英文句子",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "hZn3S9ZjXVE",
            "title": "100個超級有用的英語句子",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "eVSxt2mBlgQ",
            "title": "13 Useful Phrasal Verbs Using The Words ASK and LOOK | Improve Your English Dialogue Skills",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "nYfYaHzexZ4",
            "title": "17 Phrasal Verbs For EVERYDAY ACTIONS Used In Native English Conversations",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "YUyHDHKM7Dc",
            "title": "18 Prepositional Phrases For Place and Time using the word BY - English Grammar Lesson",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "HJ36JAJXqro",
            "title": "180個常用英語句子",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "Lc3Y_hq6c30",
            "title": "200 每日英語短語",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "lZD3_vucrEQ",
            "title": "21 Prepositional Phrases For Place and Time using the word FOR - English Grammar Lesson",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "xzVVuxD66KY",
            "title": "22 Idioms and Phrases in English - MONEY",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "-Sfu8b0hDVI",
            "title": "300句智能英語日常用語",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "pgjr-un1hB8",
            "title": "41 Useful English Collocations with DO and GO",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "KofUcPZsiRM",
            "title": "50 Super Useful English QUESTIONS and ANSWERS",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "uQJ2-LMR7WU",
            "title": "55 個超級有用的英語閒聊短語來創造偉大的對話",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "jFXtFnk-uIc",
            "title": "60 Daily Use ‘How’ Questions in English",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "HCUebKR7Tm4",
            "title": "60 Mins of VERY USEFUL English Phrasal Verbs, Meanings and Example Sentences",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "Eg68qnvKY20",
            "title": "60 個日常使用英語“什麼”問題",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "r6LiYJOWT7A",
            "title": "60 個日常使用英語“何時”問題",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "wY4IC4cGJfM",
            "title": "77 個有力的英語短句 | 日常英語句子",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "26VSYINj9s8",
            "title": "English Pronunciation Practice - The AI, EI, OI and UI Sounds in English",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "KLHLUQf4u3E",
            "title": "English Pronunciation Practice - The GR, QU and VE Sounds in English",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "tCVZh1wn9ss",
            "title": "English Pronunciation Practice - The OO, EE and SS Sound in English",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "QKcp92n7OGs",
            "title": "English Pronunciation Practice - The OW, SW and TW Sounds in English",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "QLhb58eUuMU",
            "title": "English Pronunciation Practice - The SS, TT and ZZ Sounds in English",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "KIerxWcui2s",
            "title": "English Pronunciation Practice - The URE, IGH and EAR Sound in English",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "0iOUNGOWoCI",
            "title": "Learn 15 UNUSUAL but VERY USEFUL English Vocabulary Words, Meanings and Example English Sentences",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "egMjr8-NdPY",
            "title": "學習 100 個英語句子 - 談談駕駛",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "5HdX1XOs2rc",
            "title": "用英語提供建議 - 每天 40 個有用的英語句子",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          },
          {
            "key": "r-RAr4aE4GI",
            "title": "英語中最常用的 65 個動作動詞",
            "author": "Club James Studios",
            "date": "2021/11/18 08:00:00"
          }
        ], 
        "跟洋妞学英语": [
          {
            "key": "Z42uYDoJRn4",
            "title": "洗手间用品英语单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "QQDISDf4HQ8",
            "title": "不要再说 I DON'T KNOW!",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "KsP9VKQLLhg",
            "title": "15个高频英语万用句型",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "5gJY7g8z0dI",
            "title": "【我很忙】用英文怎么说?",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "E2mXJ334fFA",
            "title": "怎么用英语说【节哀顺变】? ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "HWuFTFZd8I4",
            "title": "提高英语口语和写作的最好方式",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "n-wgOhUgyiI",
            "title": "不要再用 VERY+形容詞  第二集",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "SRHeJU_XhbM",
            "title": "怎么用地道英语说【中文成语】",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "DOGZIl0HrV4",
            "title": "怎么用地道英语说 【我不喜欢】",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "vqD8EhjPySA",
            "title": "不要再用 VERY+形容詞",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "a9eO-cgYPyI",
            "title": "用流利的英语讲电话",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "wk0jki4lCTE",
            "title": "【职场版】 怎么说一口流利的美式英语? 3",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "7xU4ODxO8jc",
            "title": "厨房用品英语单词 2",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "CtLUtv8-wNc",
            "title": "怎么说一口流利的美式英语? 2",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "lO_BMxNZWH8",
            "title": "厨房用品英语单词 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "fxpoQY8waGI",
            "title": "房子房间实用英文词汇",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "p0rdzXm1_Q0",
            "title": "常用英语短语",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "RE1ol1O5_j4",
            "title": "英文日常对话 | 英语对话",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "nKDmtY-lflo",
            "title": "40个与卧室有关的单字",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "5JHijc13_Ew",
            "title": "怎么用英语表达面部表情 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "U1djLB8abh4",
            "title": "种菜学英语 | 简单生活常用英语",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "4YrO9FaF850",
            "title": "【零基础英语口语】100句简单生活常用英语口语 3",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "f0E2JpmsaX4",
            "title": "25个最常用的短语动词 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "uRAA5f9fdVs",
            "title": "50个常用英语动词 3 洋妞表演【零基础英语】",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "SOlgN5WUoOA",
            "title": "50个常用英语动词 2 洋妞表演【零基础英语】】",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "mS262AnSuME",
            "title": "50个常用英语动词 1 洋妞表演【零基础英语】",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "dY9st7OcafM",
            "title": "【零基础英语口语】100句简单生活常用英语口语 2",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "4D7Nm3SE16I",
            "title": "【零基础英语口语】100句简单生活常用英语口语 1",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "IksIzMqdyRg",
            "title": "【从零开始学英语】 情人节",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "oVv8wXt4S-0",
            "title": "美国总统 美国历届总统 2",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "44lQcNrY7HY",
            "title": "美国总统 美国历届总统 1",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "cJd5i-dODZA",
            "title": "衣服 - 下装 中英文词汇 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "Ag3N7ft_two",
            "title": "衣服 - 上衣 中英文词汇 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "vbWgyKvQ2IE",
            "title": "学美国节日 中英文名称和简称  [058]",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "r5E5vkUd5VI",
            "title": "057 五个学英语的窍门 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "zk83eOaou4o",
            "title": "15个著名美国国家公园中英文名称和简称 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "7VubnBGePAg",
            "title": "20个美国有名的城市中英文名称和简称 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "cgrpZu4UG0o",
            "title": "美国50州中英文名称和简称 第2集 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "T2Ag-dVtqhs",
            "title": "美国50州中英文名称和简称 第1集 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "iMts2N6JoKU",
            "title": "COVID-19 新型冠状病毒疾病英语词汇 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "P2Y1fEPdxY4",
            "title": "20个常见烹饪英语动词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "Q_Uj4_5mZ54",
            "title": "050 20个常见水果单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "OWwqDSYwL0w",
            "title": "美国大选 选举英文单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "WPjSbmIm15o",
            "title": "20个常见水果单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "Wqk8KUoB-FQ",
            "title": "047 常用英语句子 | 怪怪的美国俗语",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "vfNPU4112Q0",
            "title": "下午和傍晚习惯英语单词和短语",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "ZuYmPDwhsUg",
            "title": "早晨习惯英语单词和短语",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "culLQNR7R_M",
            "title": "041 日期单词2 - 月份和季节",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "hIiKnPLiIiE",
            "title": "040 日期单词1 - 天和周",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "puKirmCXAqQ",
            "title": "【从零开始学英语】20个煮饭调料单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "L1TxKMI5JlQ",
            "title": "【从零开始学英语】日常英语短语 | 开车旅行",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "tj0X9pkyiUQ",
            "title": "【从零开始学英语】20个开车旅行单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "5qidZjMOeCs",
            "title": "实用快餐英文单词发音教学",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "dx1CT0-wmAI",
            "title": "星巴克点咖啡必备英文单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "g_GKSdKJazk",
            "title": "日常英文单字 | 实用咖啡店饮料英文单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "yMqAqR-SG8s",
            "title": "实用快餐英文单词发音教学",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "9onfeQ8cfnM",
            "title": "【从零开始学英语】20个常见蔬菜单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "a_zJOQLpDbY",
            "title": "30种日常电器用品名称",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "bPDoSwz6kAw",
            "title": "【从零开始学英语】20个常见蔬菜单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "275Q5seIaq0",
            "title": "十句必学英语口语 | 饭店的常用句子",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "YK5aZJBK5Qk",
            "title": "028 10个最常发错音的英语单词 【英文发音】",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "j4cqn7gYw4w",
            "title": "027 100个最常用英语动词 第二集",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "KrRvpswPWJ4",
            "title": "150个初学者英语单词 | 从零学英语",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "9kIoYWp6bdk",
            "title": "从零学英语 | 100个最常用英语动词 第一集",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "nw9IJCSx9iY",
            "title": "从零学英语 | 100个最常用英语单词",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "thwZf66Hoz0",
            "title": "从零学英语 | 关于生病的动词短语 学英语",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "KTv-SXIjy9Y",
            "title": "从零学英语数字 | 一到一万亿",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "-YMQfv5FAGA",
            "title": "25句对你爱人说的浪漫情话",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "XfkCfqsNyuc",
            "title": "通过生病学英语 | 新冠病毒",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "Yh6DObbzBnk",
            "title": "鼠年快樂",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "r4zsPK9_N3I",
            "title": "英文日常对话第一集 | 英语对话",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "ba2LfVea0Jo",
            "title": "最常用英语口语会话 第5集 | 征求意见时的回应",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "HQBMAUTXF1A",
            "title": "最常用英语动词 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "3DliURH1--0",
            "title": "圣诞节学英语",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "0nw9D4oSF9w",
            "title": "最常用英语口语会话 第4集 请求帮忙和回应",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "Mk8hf7Sj3RE",
            "title": "睡眠时学英语",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "_KnbRS8JjDg",
            "title": "最常用英语口语会话 第3集 | 道歉方式和回应",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "l7RYgc9i2_k",
            "title": "最常用英语动词 Most Common English Verbs A学英语",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "_k8YoNaNTo0",
            "title": "最常用英语口语会话 第2集 | 介绍,面对消息的回应 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "3C0sO4_98YQ",
            "title": "最常用英语口语会话 第1集  | 问候和告别",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "q9EQ9es3iQU",
            "title": "60多個英語顏色詞彙",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "YnBB0h9pK70",
            "title": "35句餐廳訂位會話",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "BBWnLgtigLY",
            "title": "50句問候語和告別句 學習英語口語",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "A_kzxc6-aG4",
            "title": "004 50句对你爱人說最浪漫的话",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "UOwzmLSTmPQ",
            "title": "003 50句超市会话 50 Supermarket Conversations ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "37M5122jk2k",
            "title": "002 50句让别人微笑的赞美",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          },
          {
            "key": "yqCusTDkTHc",
            "title": "001 30句日常个人问题和答案 ",
            "author": "跟洋妞学英语",
            "date": "2021/11/26 12:00:00"
          }
        ]
      }
		}; // 
	},
	created(){
    /* 
      }, {
        title: "", id: "", 
        children: [
          {title: "", start: , end: },
        ]
    */
	},
	mounted () {
    let s = window.localStorage["mytube-submenu"];
    if(typeof s == "string" && s.length > 0) {
      this.submenu = s;
    } else {
      for(let key in this.menu) {
        this.submenu = key;
        break;
      }
    }
    
    let m = window.localStorage["mytube-menu-" + this.submenu];
    let index = "0";
    if(typeof m == "string" && m.length > 0) {
      for(let i = 0; i < this.menu[this.submenu].length; i++ ) {
        if(this.menu[this.submenu][i].key == m) {
          index = i.toString();
          setTimeout(() => {
            this.onSelect(this.submenu + "-" + i)
          }, 300);
          break;
        }
      }
    }

    this.active = this.submenu + "-" + index;
    
    setTimeout(() => {
      this.$nextTick(()=>{
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
        this.onSubmenuChange();
      });
    }, 600);
    // this.onSelect(this.active);
    this.broadcast.$on('onResize', this.onResize);
	},
	destroyed() {
    this.broadcast.$off('onResize', this.onResize);
  },
	methods: {
    onOpenChange(index){
      let old = this.submenu;
      if(index.length > 1) {
        let arr = index.filter(itm =>{
          return itm != this.submenu;
        });
        if(arr.length > 0) {
          this.submenu = arr[0];
        }
      } else if(index.length == 1 && this.submenu != index[0]) {
        this.submenu = index[0];
      }
      
      if(this.submenu != old) {
        window.localStorage["mytube-submenu"] = this.submenu;
        if(this.submenu.length > 0) {
          let m = window.localStorage["mytube-menu-" + this.submenu];
          let index = "0";
          if(typeof m == "string" && m.length > 0) {
            for(let i = 0; i < this.menu[this.submenu].length; i++ ) {
              if(this.menu[this.submenu][i].key == m) {
                index = i.toString();
                setTimeout(() => {
                  this.onSelect(this.submenu + "-" + i)
                }, 300);
                break;
              }
            }
          }
          this.active = this.submenu + "-" + index;
        }
        
        setTimeout(() => {
          this.$nextTick(()=>{
            this.$refs.menu.updateOpened();
            this.$refs.menu.updateActiveName();
            this.onSubmenuChange(); 
          });
        }, 600);
      }
    },
    async onSelect(index){
      let arr = index.split("-")
      this.$emit('on-select', this.menu[arr[0]][arr[1]]);
      window.localStorage["mytube-menu-" + this.submenu] = this.menu[arr[0]][arr[1]].key;
      if(this.smallScreen == true) {
        this.onClickIcon();
      }
    },
    onClickIcon(){
      let el = document.getElementById("frameMenu");
      el.style.visibility = "hidden";
    },
    onResize(small){
      this.smallScreen = small;
      let el = document.getElementById("frameMenu");
      if(small == true) {
        el.classList.add("smallScreen");
        this.width = document.body.clientWidth + "";
        el.style.visibility = "hidden";
      } else {
        el.classList.remove("smallScreen");
        this.width = "310";
        el.style.visibility = "visible";
      }
    },
    onSubmenuChange(){
      let slef = this;
      let h1 = document.getElementById("frameMenu").clientHeight - document.getElementById("version").clientHeight;
      let arr = document.querySelectorAll(".submenu");
      let h2 = h1 - (arr.length * 45)
      for(let i = 0; i < arr.length; i++) {
        arr[i].parentElement.classList.remove("activeMenu");
        if(arr[i].id == this.submenu) {
          arr[i].parentElement.classList.add("activeMenu");
          let ul = arr[i].parentElement.parentElement.children[1];
          delay(ul)
        }
      }
      function delay(ul){
        setTimeout(()=>{
          ul.style.height = h2 + "px";
          ul.style.overflowX = "hidden";
          ul.style.overflowY = "auto";
          setTimeout(()=>{
          document.getElementById(slef.active).scrollIntoView({block: "center",});
          }, 1000); 
        }, 300)
      }
    }
	},
	computed: {
	},
	watch: {
    
	}
});