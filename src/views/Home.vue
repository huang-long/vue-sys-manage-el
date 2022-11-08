<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
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
export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  setup() {
    const store = userStore();
    const tagsList = computed(() =>
      store.tagsList.map((item) => item.name)
    );
    const collapse = computed(() => store.meunIsCollapsed);
    return {
      tagsList,
      collapse,
    };
  },
};
</script>