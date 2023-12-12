import { getParam } from '../utils/common';
export const roomId = getParam('room');
export const DEFAULT_GROUP = 'shining';
export const SERVER = process.env.NODE_ENV === 'development' ? 'https://local.y.qq.com/' : '/';
export const DEFAULT_BACKGROUND =
  'https://images.weserv.nl/?url=https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/453b8ebcdefa46a69c620da13f346ce2~tplv-k3u1fbpfcp-zoom-1.image?imageView2/2/w/800/q/85';
