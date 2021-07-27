import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';

import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';
import App from './App';

// configure language
locale.use(lang);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
