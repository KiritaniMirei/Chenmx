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
      description: '包括水印、复制、长按、过滤空格',
    },
  },
  {
    path: '/zhihu-card',
    name: '知乎卡片',
    component: () => import('../views/飞卡片.vue'),
    meta: {
      title: '仿知乎卡片效果',
      description: '可以拖动，发牌员飞卡片',
    },
  },
];

export default routes;
