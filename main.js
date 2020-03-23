import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import ElTreeSelect from 'el-tree-select';
import EditTable from './index.js'
Vue.use(ElTreeSelect);
Vue.use(EditTable);

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})

