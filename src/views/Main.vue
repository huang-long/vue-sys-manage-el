<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
        <div class="crumbs">
          <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item class="my-breadcrumb-item" v-for='(item, index) in tagsTree' :key="index">
              <el-icon v-if="item.icon">
                <component :is="item.icon" />
              </el-icon>
              {{item.title}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { userStore } from "../stores/counter";
import vHeader from "../components/Header.vue";
import vSidebar from "../components/Sidebar.vue";
import vTags from "../components/Tags.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  setup() {
    const route = useRoute();
    const store = userStore();
    const tagsList = computed(() =>
      store.tagsList.map((item) => item.name)
    );

    const tagsTree = computed(() => route.meta.tagsTree);
    const collapse = computed(() => store.meunIsCollapsed);
    return {
      tagsList,
      collapse,
      tagsTree
    };
  },
};
</script>
<style lang="less" scoped>
.content-box {
  height: calc(100vh - 70px);
}

.my-breadcrumb-item {
  :deep(.el-breadcrumb__inner) {
    display: flex;

    > .el-icon {
      margin-right: 3px;
    }
  }
}
</style>