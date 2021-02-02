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
  {
    path: '/storage',
    name: '多页签通信',
    component: () => import('../views/多页签通信.vue'),
    meta: {
      title: '浏览器跨页签通信',
      description: '可以监听到storage的增加 删除 修改，本标签页不生效',
    },
  },
  {
    path: '/sign',
    name: '签名',
    component: () => import('../views/签名.vue'),
    meta: {
      title: 'canvas签名',
      description: '仿支付宝写福 签名 会退 视频',
    },
  },
];

export default routes;
