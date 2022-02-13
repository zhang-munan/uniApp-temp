import App from './App'
import store from './store'

// i18n部分的配置
// 引入语言包，注意路径
import Chinese from '@/common/locales/zh.js';
import English from '@/common/locales/en.js';

// 引入全局baseConfig
import baseConfig from 'baseConfig';

// api接口配置
import * as api from 'common/api.js'

// 引入共通mixin
import commonMixin from 'common/mixin.js'

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$adpid = "1111111111"
Vue.prototype.$api = api

Vue.use(baseConfig);
Vue.mixin(commonMixin)

App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})

// 引入请求封装
require('./util/request/index')(app)

app.$mount()
// #endif

// #ifdef VUE3
import {createSSRApp} from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(baseConfig);
  app.config.globalProperties.$adpid = "1111111111"
	
  return {
    app
  }
}

// #endif