let doms = document.querySelectorAll(".ytd-rich-item-renderer"), datas = [];
doms.forEach((el, index) => {
  try {
    let key = el.querySelectorAll("a")[3].href.replace("https://www.youtube.com/watch?v=", "");
    
    if(datas.length === 0 || datas[datas.length - 1].key !== key) {
      let title = el.querySelectorAll("a")[3].innerText;
      if(title.indexOf("測") > -1) return;
      
      datas.push({title, key,
        during: el.querySelectorAll(".ytBadgeShapeText")[0].innerText,
      })
    }
  } catch (error) {
    console.log(error)
  }
});
console.log(datas)