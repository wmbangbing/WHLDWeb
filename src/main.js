import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'


import './icons'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css


import './mock' 
import './permission'


Vue.use(Element,{
  size: 'medium', 
});

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
