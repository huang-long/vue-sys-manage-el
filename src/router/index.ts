import { createRouter, createWebHistory } from 'vue-router';
import routes from "./defaultRouter";
import { addCacheRouter } from './loadMenuRouter';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

//刷新后，重新加载缓存中的动态路由
addCacheRouter(router);

// 路由拦截
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');

  if (token) {
    // 是否有该路径
    if (to.matched.length > 0) {
      next();
    } else {
      next('/404');
    }
  } else {
    // 反正让你去登录页
    if (to.path == '/login') {
      next();
    } else {
      next('/login');
    }
  }
});

export default router