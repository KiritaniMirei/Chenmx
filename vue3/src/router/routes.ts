import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/directives',
    name: '常用自定义指令',
    component: () => import('../views/常用自定义指令.vue'),
    meta: {
      title: '自定义指令',
      description: '包括水印、权限、复制、长按、防抖、图片懒加载、拖拽等',
    },
  },
];

export default routes;
