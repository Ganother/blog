'use strict';


exports.install = function (Vue, Options) {
    var isVueNext = Vue.version.split('.')[0] === '2';
    var DEFAULT_PRE = 1.3;
    var DEFAULT_URL = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXs7Oxc9QatAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
    if (!Options) {
        Options = {
            preLoad: DEFAULT_PRE,
            error: DEFAULT_URL,
            loading: DEFAULT_URL,
            try: 3
        };
    }
    var Init = {
        preLoad: Options.preLoad || DEFAULT_PRE,
        error: Options.error ? Options.error : DEFAULT_URL,
        loading: Options.loading ? Options.loading : DEFAULT_URL,
        hasbind: false,
        isInChild: false,
        childEl: null,
        try: Options.try ? Options.try : 1
    };

    var Listeners = [];

    function debounce(action, idle) {
        var last = void 0;
        return function () {
            var _this = this;

            var args = arguments;
            clearTimeout(last);
            last = setTimeout(function () {
                action.apply(_this, args);
            }, idle);
        };
    };

    var _ = {
        on: function on(type, func) {
            window.addEventListener(type, func);
        },
        off: function off(type, func) {
            window.removeEventListener(type, func);
        }
    };

    var lazyLoadHandler = debounce(function () {
        var i = 0;
        var len = Listeners.length;
        for (var _i = 0; _i < len; ++_i) {
            checkCanShow(Listeners[_i]);
        }
    }, 50);

    function onListen(start) {
        if (start) {
            console.log('start');
            _.on('scroll', lazyLoadHandler);
            _.on('wheel', lazyLoadHandler);
            _.on('mousewheel', lazyLoadHandler);
            _.on('resize', lazyLoadHandler);
        } else {
            Init.hasbind = false;
            _.off('scroll', lazyLoadHandler);
            _.off('wheel', lazyLoadHandler);
            _.off('mousewheel', lazyLoadHandler);
            _.off('resize', lazyLoadHandler);
            console.log('removed!');
        }
    };

    function checkCanShow(listener) {
        if (listener.el.getBoundingClientRect().top < window.innerHeight * Init.preLoad && listener.el.getAttribute('lazy') != 'loaded') {
            render(listener);
        }
    };

    function render(item) {
        if (item.try >= Init.try) {
            return false;
        }
        item.try++;

        loadImageAsync(item).then(function (ind) {
          if(ind == item.el.count){
            var index = Listeners.indexOf(item);
            if (index !== -1) {
                Listeners.splice(index, 1);
            }
            if (!item.bindType) {
                item.el.setAttribute('src', item.src);
            } else {
                item.el.setAttribute('style', item.bindType + ': url(' + item.src + ')');
            }
            item.el.setAttribute('lazy', 'loaded');
            if(item.el.className.indexOf('img-loaded') == -1){
              let oldName = item.el.className;
              item.el.className += ' img-loaded';
              setTimeout(() => {
                item.el.className = oldName;
              }, 500)
              item.el.parentNode.style.minHeight = 0;
            }
          }
        }).catch(function (error) {
            if (!item.bindType) {
                item.el.setAttribute('src', Init.error);
            } else {
                item.el.setAttribute('style', item.bindType + ': url(' + Init.error + ')');
            }
            item.el.setAttribute('lazy', 'error');
        });
    };

    function loadImageAsync(item) {
        if (!item.bindType) {
            item.el.setAttribute('src', Init.loading);
        } else {
            item.el.setAttribute('style', item.bindType + ': url(' + Init.loading + ')');
        }
        return new Promise(function (resolve, reject) {
          var image = new Image();
          image.src = item.src;
          image.index = item.el.count;
          image.onload = function () {
            var ind = this.index;
            resolve(ind);
          };
          image.onerror = function () {
              reject();
          };
        });
    };

    function componentWillUnmount(el, binding, vnode, OldVnode) {
        if (!el) return;
        var i = void 0;
        var len = Listeners.length;

        for (i = 0; i < len; i++) {
            if (Listeners[i] && Listeners[i].el === el) {
                Listeners.splice(i, 1);
            }
        }

        if (Init.hasbind && Listeners.length == 0) {
            onListen(false);
        }
    };

    function addListener(el, binding, vnode) {
        var parentEl = null;

        if (binding.modifiers) {
            parentEl = window.document.getElementById(Object.keys(binding.modifiers)[0]);
        }
        if (!binding.arg) {
            el.setAttribute('lazy', 'loading');
            el.setAttribute('src', Init.loading);
        } else {
            el.setAttribute('lazy', 'loading');
            el.setAttribute('style', binding.arg + ': url(' + Init.loading + ')');
        }

        Vue.nextTick(function () {
            if(binding.value != ''){
              Listeners.push({
                  bindType: binding.arg,
                  try: 0,
                  parentEl: parentEl,
                  el: el,
                  src: binding.value,
                  status: 'load'
              });
              lazyLoadHandler();
              if (Listeners.length > 0 && !Init.hasbind) {
                  Init.hasbind = true;
                  onListen(true);
              }
            }
        });
    };

    if (isVueNext) {
        Vue.directive('lazy', {
            bind: addListener,
            update: addListener,
            unbind: componentWillUnmount
        });
    } else {
        Vue.directive('lazy', {
            bind: function bind() {},
            update: function update(newValue, oldValue) {
                if(newValue != ''){
                  !this.el.count ? this.el.count = 1 : this.el.count++;
                  addListener(this.el, {
                      modifiers: this.modifiers,
                      arg: this.arg,
                      value: newValue,
                      oldValue: oldValue
                  });
                }
            },
            unbind: function unbind() {
                componentWillUnmount(this.el);
            }
        });
    }
};
