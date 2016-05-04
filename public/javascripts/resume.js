/**
 * Created by Ganother on 4/20/16.
 */
function setView(){
  var dolWidth = document.documentElement.getBoundingClientRect().width;
  $(".main_container").style.cssText= "-webkit-perspective: "+dolWidth/2+"px;"
}

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

function scrollChange(){
  var config = {};
  config.lastPosition = 0;
  config.count = 1;
  $(document).on("scroll", function(){
    clearTimeout(config.timer);
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
      $this.scrollTop(bodyHeight*(config.count-1)/4);
      config.lastPosition = bodyHeight*(config.count-1)/4;
    },100)
  });
  return function(){
    return config;
  }
}


$(document).ready(function(){
  var dolWidth = document.documentElement.getBoundingClientRect().width;
  replaceStyle({
    "width" : dolWidth,
    "half" : dolWidth/2
  });

  window.bodyHeight = $("body").height();
  window.bodyWidth = $("body").width();
  console.log(bodyHeight);

  scrollChange();

});
