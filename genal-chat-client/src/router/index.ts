import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { roomId } from '../const/index';
console.log('roomId', roomId);

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Chat',
    component: () => (!roomId ? import('@/views/NoRoomId.vue') : import('@/views/GenalChat.vue')),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
