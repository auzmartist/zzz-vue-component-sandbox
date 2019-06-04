import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'
import App from './App.vue'
import './sandbox/index.js'

new Vue({
  el: '#app',
  render: (h) => h(App)
})

// Font-awesome test
// document.body.innerHTML = '<i class="fa fa-question"></i>'