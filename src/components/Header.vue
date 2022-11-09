<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <el-icon v-if="!collapse">
        <Fold />
      </el-icon>
      <el-icon v-else>
        <Expand />
      </el-icon>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message ? `有${message}条未读消息` : `消息中心`" placement="bottom">
            <router-link to="/tabs">
              <el-icon>
                <Bell />
              </el-icon>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../images/tx.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a href="https://gitee.com/huanglgln/vue-sys-manage-el" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, onMounted } from "vue";
import { userStore } from "../stores/counter";
import { useRouter } from "vue-router";
export default {
  setup() {
    const message = 2;

    const store = userStore();
    const collapse = computed(() => store.meunIsCollapsed);
    const username = computed(() => store.loginUser);
    // 侧边栏折叠
    const collapseChage = () => {
      store.setMeunIsCollapsed(!collapse.value)
    };

    onMounted(() => {
      if (document.body.clientWidth < 1500) {
        collapseChage();
      }
    });

    // 用户名下拉菜单选择事件
    const router = useRouter();
    const handleCommand = (command: string) => {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        router.push("/login");
      } else if (command == "user") {
        router.push("/user");
      }
    };

    return {
      username,
      message,
      collapse,
      collapseChage,
      handleCommand,
    };
  },
};
</script>
<style lang="less" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: #242f42;

  .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .collapse-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 21px;
    cursor: pointer;
  }

  .header-right {
    float: right;
    padding-right: 50px;

    .header-user-con {
      display: flex;
      height: 70px;
      align-items: center;

      .btn-bell {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;

        .el-icon {
          color: #fff;
        }

        .btn-bell-badge {
          position: absolute;
          right: 0;
          top: -2px;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: #f56c6c;
          color: #fff;
        }
      }

      .user-avator {
        margin-left: 20px;
        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }

      .user-name {
        margin-left: 10px;

        .el-dropdown-link {
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
