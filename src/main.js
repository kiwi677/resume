require("babel-runtime/regenerator")
require("webpack-hot-middleware/client?reload=true")
require("./css/main.css")
require("./css/gb.css")
require("./index.html")

"use strict"
//图片加载
function preloadImg(config) {
  var source = config.source,
      len = source.length,
      count = 0,
      prefix = config.prefix || '',
      onComplete = config.onComplete;
  for (var i = 0; i < len; i++) {
    var img = new Image();
    img.src = prefix + source[i];
    img.onerror = img.onload = function() {
      count++;
      if (count == len) {
        onComplete();
      }
    }
  }
}
preloadImg({
  source: [
    'float_bl.png',
    'float_cb.png',
    'float_cc.png',
    'float_cr.png',
    'float_lc.png',
    'float_tl.png',
    'float_tr.png',
    'me.png',
    'mingx.png',
    'p3_01.png',
    'wx.jpg',
    'xkooter.png',
    'zan.png'
  ],
  prefix: 'images/',
  onComplete: onComplete
});
//图片加载后更改loading的运行事件，监听load的动画，执行init()
function onComplete() {
  document.querySelector(".load").classList.add('finish');
  document.querySelector(".load span").addEventListener('webkitAnimationEnd', function() {
    init()
  })
}

function init () {
  //关闭load页面，展示内容页面
  document.querySelector(".mod_container").style.display = 'block';
  document.querySelector(".load").style.display = 'none'; 
  changePage();
  showPlan ();
}
//上下滑动翻页
function changePage () {
  var page = document.querySelectorAll('.part'),
      step = document.querySelector('.progress circle'),
      startY,
      endY,
      dy,
      num = 0;
  page[num].classList.add('in');
  document.addEventListener('touchstart',function (e) {
    var event = e || window.event; 
    startY = event.touches[0].pageY;
  }, false);
  document.addEventListener('touchend',function (e) {
    var event = e || window.event; 
    endY = event.changedTouches[0].pageY;
    dy = startY - endY;
    if(dy > 16) {//向上滑动
      page[num].classList.remove('in')
      if(num === 3){
        num = 3;
      }else{
        num ++
      }
      page[num].classList.add('in')
    }else if(dy< -16){//向下滑动
      page[num].classList.remove('in')
      if(num === 0){
        num = 0;
      }else{
        num --
      }
      page[num].classList.add('in') 
    }
    //progress 移动位置
    step.setAttribute('cy', num * 14 + 5)
  },false)
}
//part2点击展示项目
function showPlan () {
  var apDetail = document.querySelectorAll('.ap_detail_item'),
      len = apDetail.length,
      i,j;
  for(i = len-1; i >= 0; i--){
    apDetail[i].addEventListener('click', function (e) {
      var event = e || window.event; 
      var target = event.target || event.srcElement;
      for(j = len-1; j >= 0; j--){
        apDetail[j].classList.remove('act')
      }
      this.classList.add('act')
    },false)
  }   
}