import type { Router } from 'vue-router';
import defaultRouters from "./defaultRouter";
//引入所有views下.vue文件 
const modules = import.meta.glob("../views/**/**.vue")

let vueRouter: Router;
const addMenuRouter = (list: Array<any>, parentMenu: Array<String>) => {
  list.forEach(menu => {
    let tags: Array<String> = [...parentMenu, menu.title];
    if (vueRouter.hasRoute(menu.name)) {
      console.log(menu.name)
    }
    if (menu.path && !vueRouter.hasRoute(menu.name)) {
      let componentPath = "../views/" + menu.componentPath;
      vueRouter.addRoute("main", {
        path: menu.path,
        name: menu.name,
        meta: {
          title: menu.title,
          tags: tags
        },
        component: modules[componentPath]
      });
    }
    if (menu.children && menu.children.length > 0) {
      addMenuRouter(menu.children, tags);
    }
  });
}

/**
 * 清空菜单路由
 * @param router 
 */
export const clearMenuRouter = (router: Router) => {
  let dfPath: string[] = [];
  defaultRouters.forEach(drt => {
    dfPath.push(drt.path);
  });
  router.getRoutes().forEach(rt => {
    if (dfPath.indexOf(rt.path) < 0 && rt.name) {
      router.removeRoute(rt.name);
    }
  });
}

/**
 * 登录成功后，动态加载路由
 * @param router 
 * @param list 路由菜单
 */
export const loadMenuRouter = (router: Router, list: Array<any>) => {
  vueRouter = router;
  clearMenuRouter(router);
  addMenuRouter(list, []);
}

/**
 * 刷新页面加载缓存中的路由
 * @param router 
 */
export const addCacheRouter = (router: Router) => {
  let menuStr = sessionStorage.getItem("store_menuList");
  if (menuStr && menuStr != "") {
    let list = JSON.parse(menuStr);
    vueRouter = router;
    addMenuRouter(list, []);
  }
}
