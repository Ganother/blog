/**
 * Created by Ganother on 4/20/16.
 */
//样式初始化
function replaceStyle(rule){
  var $resize = $("[r-style]");
  $resize.each(function(){
    var $this = $(this);
    var thisStyle = $this.attr("r-style");

    for(var key in rule){
      thisStyle = thisStyle.replace(new RegExp("{"+key+"}",'g'),rule[key]);
      console.log(key,rule[key]);
    }
    console.log(thisStyle);
    $this[0].style.cssText = thisStyle;
    $this.removeAttr("r-style");
  })
}
//滚动事件绑定
function scrollChange(){
  var config = {};
  config.lastPosition = 0;
  config.count = 1;
  $(document).on("scroll", function(){
    clearTimeout(config.timer);//节流
    var $this = $(this);
    config.timer = setTimeout(function(){
      var scrollTop = $this.scrollTop();
      if(scrollTop > config.lastPosition){
        if(config.count < 4){
          config.count++;
        }
      }
      if(scrollTop < config.lastPosition){
        if(config.count > 1){
          config.count--;
        }
      }
      $(".main_container")[0].style.cssText = $(".main_container")[0].style.cssText + "-webkit-transform:rotateY("+90*(config.count-1)+"deg)";
      setTimeout(function(){
        if(config.count == 2){ //保证每次滑动到第二个页面时执行css动画
          $(".skill-item").show(0);
        }else{
          $(".skill-item").hide(0);
        }
      },500)
      $this.scrollTop(bodyHeight*(config.count-1)/4);
      config.lastPosition = bodyHeight*(config.count-1)/4;
    },80)
  });
  return function(){
    return config;
  }
}
//保证背景图load完成
function loading(){
  var urlHead = '/images/background_0',
    urlFoot = '.jpg';
  window.imgCount = 4;
  for(var i = 0; i < 4; i++){
    var img = new Image();
    img.onload = function(){
      imgCount --;
    }
    img.src = urlHead+(i+1)+urlFoot;
  }

  window.loadingCounter = setInterval(function(){
    if(imgCount == 0){
      clearInterval(loadingCounter);
      $("#loadingLayer").fadeOut(300);
      imgCount = null;
    }
  },80)
}


$(document).ready(function(){
  var dolWidth = document.documentElement.getBoundingClientRect().width;
  //初始化样式
  replaceStyle({
    "width" : dolWidth,
    "half" : dolWidth/2
  });

  window.bodyHeight = $("body").height();
  window.bodyWidth = $("body").width();

  //滚动事件绑定
  scrollChange();

  //loading四张背景图
  loading();


});
