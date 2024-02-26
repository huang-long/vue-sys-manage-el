import type { Menu } from "@/data/menuList";
import type { Router } from "vue-router";
import defaultRouters from "./defaultRouter";
//引入所有views下.vue文件
const modules = import.meta.glob("../views/**/**.vue");

let vueRouter: Router;
const addMenuRouter = (list: Array<Menu>, parentMenu: Array<Menu>) => {
  list.forEach((menu) => {
    const tagsTree: Array<Menu> = [...parentMenu, menu];
    if (menu.name && vueRouter.hasRoute(menu.name)) {
      console.log(menu.name);
    }
    if (menu.path && menu.name && !vueRouter.hasRoute(menu.name)) {
      const componentPath = "../views/" + menu.componentPath;
      vueRouter.addRoute("main", {
        path: menu.path,
        name: menu.name,
        meta: {
          title: menu.title,
          tagsTree: tagsTree,
        },
        component: modules[componentPath],
      });
    }
    if (menu.children && menu.children.length > 0) {
      addMenuRouter(menu.children, tagsTree);
    }
  });
};

/**
 * 清空菜单路由
 * @param router
 */
export const clearMenuRouter = (router: Router) => {
  const dfPath: string[] = [];
  defaultRouters.forEach((drt) => {
    dfPath.push(drt.path);
  });
  router.getRoutes().forEach((rt) => {
    if (dfPath.indexOf(rt.path) < 0 && rt.name) {
      router.removeRoute(rt.name);
    }
  });
};

/**
 * 登录成功后，动态加载路由
 * @param router
 * @param list 路由菜单
 */
export const loadMenuRouter = (router: Router, list: Array<Menu>) => {
  vueRouter = router;
  clearMenuRouter(router);
  addMenuRouter(list, []);
};

/**
 * 刷新页面加载缓存中的路由
 * @param router
 */
export const addCacheRouter = (router: Router) => {
  const menuStr = sessionStorage.getItem("store_menuList");
  if (menuStr && menuStr != "") {
    const list = JSON.parse(menuStr);
    vueRouter = router;
    addMenuRouter(list, []);
  }
};
