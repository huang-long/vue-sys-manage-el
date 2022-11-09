<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened
      router>
      <template v-for="item in menu">
        <template v-if="item.children">
          <el-sub-menu :index="item.id" :key="item.id">
            <template #title>
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-sub-menu v-if="subItem.children" :index="subItem.id" :key="subItem.id">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="threeItem in subItem.children" :key="threeItem.id" :index="threeItem.path">
                  {{ threeItem.title }}</el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.path" :key="subItem.id">{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.id">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { userStore } from "../stores/counter";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = userStore();
    const menu = computed(() => store.menuList);
    const collapse = computed(() => store.meunIsCollapsed);

    return {
      menu,
      onRoutes,
      collapse,
    };
  },
};
</script>

<style lang="less" scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  height: calc(100vh - 70px);

  .sidebar-el-menu {
    min-height: 100%;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
</style>
