import Vue from 'vue'
const components = [
  require('./ComponentSandbox.vue').default
]

components.forEach((c) => Vue.component(c.name, c))