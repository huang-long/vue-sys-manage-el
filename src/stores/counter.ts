import type { Menu } from '@/data/menuList';
import { loadMenuRouter } from '@/router/loadMenuRouter';
import { defineStore } from 'pinia';
import { menuList1, menuList2 } from '../data/menuList';
import router from '../router';

interface Tag {
  path: string,
  name: string,
  title: string,
}

export declare interface Store {
  tagsList: Tag[],
  meunIsCollapsed: boolean,
  loginUser: string | null,
  menuList: Menu[],
}

export const userStore = defineStore({
  id: 'counter',
  state: (): Store => {

    //刷新后，重新加载缓存中的页签
    let tagsList: Tag[] = [];
    let tagStr = sessionStorage.getItem("store_tagsList");
    if (tagStr && tagStr != "") {
      tagsList = JSON.parse(tagStr);
    }

    //刷新后，重新加载缓存中的页签
    const loginUser = sessionStorage.getItem("store_loginUser");

    //刷新后，重新加载缓存中的动态路由
    let menuList: Menu[] = [];
    let menuStr = sessionStorage.getItem("store_menuList");
    if (menuStr && menuStr != "") {
      menuList = JSON.parse(menuStr);
      // loadMenuRouter(router, menuList);
    }

    return {
      tagsList: tagsList,
      meunIsCollapsed: false,
      loginUser: loginUser,
      menuList: menuList,
    }
  },
  getters: {
    //方法名称参照官网
    //https://pinia.vuejs.org/core-concepts/getters.html#accessing-other-getters
  },
  actions: {
    setMenuList(value: Array<Menu>) {
      this.menuList = value;
      sessionStorage.setItem("store_menuList", JSON.stringify(this.menuList));
    },
    loadMenu() {
      let list = this.loginUser == "admin" ? menuList1 : menuList2;
      this.clearAllTags();
      this.setMenuList(list);
      loadMenuRouter(router, list);
    },
    setLoginUser(value: string) {
      this.loginUser = value;
      sessionStorage.setItem("store_loginUser", value);
    },
    setMeunIsCollapsed(value: boolean) {
      this.meunIsCollapsed = value;
    },
    setTagsItem(tagsList: Tag[]) {
      this.tagsList = tagsList;
      sessionStorage.setItem("store_tagsList", JSON.stringify(this.tagsList));
    },
    delTagsItem(index: number) {
      if (this.tagsList && this.tagsList.length > 0) {
        this.tagsList.splice(index, 1);
        this.setTagsItem(this.tagsList);
      }
    },
    addTagsItem(tag: Tag) {
      if (!this.tagsList) {
        this.tagsList = [];
      }
      this.tagsList.push(tag);
      this.setTagsItem(this.tagsList);
    },
    clearAllTags() {
      this.setTagsItem([]);
    },
    closeTagsOther(tagsList: Tag[]) {
      this.setTagsItem(tagsList);
    },
  }
})
