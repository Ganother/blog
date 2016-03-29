/**
 * Created by Ganother on 3/28/16.
 */

var Detail = Vue.extend({
  template: 'aha'
});
var app = Vue.extend({});

var router = new VueRouter();

router.map({
  '/index': {

  },
  '/detail:id': {
    component: Detail
  }
})

router.start(app, '#app')