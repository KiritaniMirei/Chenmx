import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directives, { Directives } from './utils/directives';
import { Cell, CellGroup } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);

/* 自定义指令 */
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as Directives)[key]);
});

app
  .use(store)
  .use(router)
  .use(Cell)
  .use(CellGroup)
  .mount('#root');
