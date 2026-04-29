let doms = document.querySelectorAll(".ytd-rich-item-renderer"), datas = [];
doms.forEach((el, index) => {
  try {
    let key = el.querySelectorAll("a")[3].href.replace("https://www.youtube.com/watch?v=", "");
    if(datas.length === 0 || datas[datas.length - 1].key !== key) {
      datas.push({
        title: el.querySelectorAll("a")[3].innerText,
        key,
        during: el.querySelectorAll(".ytBadgeShapeText")[0].innerText,
      })
    }
  } catch (error) {
    console.log(error)
  }
});
console.log(datas)


// console.log(el.querySelectorAll("a")[3].innerText) // title 
// console.log(el.querySelectorAll("a")[3].href) // url
// console.log(el.querySelectorAll(".ytBadgeShapeText")[0].innerText) // 時間
// el.querySelectorAll(".ytd-video-meta-block")[0].innerText // 觀看次數, 發布時間