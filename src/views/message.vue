<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://element-plus.gitee.io/zh-CN/component/alert.html" target="_blank">element-plus Alert</a>
        ;
        <a href="https://element-plus.gitee.io/zh-CN/component/dialog.html" target="_blank">element-plus Dialog</a>
        ;
        <a href="https://element-plus.gitee.io/zh-CN/component/drawer.html" target="_blank">element-plus Drawer</a>
        ;
        <a href="https://element-plus.gitee.io/zh-CN/component/message.html" target="_blank">element-plus Message</a>
        ;
        <a href="https://element-plus.gitee.io/zh-CN/component/message-box.html" target="_blank">element-plus MessageBox</a>
        ;
        <a href="https://element-plus.gitee.io/zh-CN/component/notification.html" target="_blank">element-plus Alert</a>
      </el-col>
    </el-row>

    <el-divider content-position="left">Alert 警告提示</el-divider>
    <div>
      <el-alert title="unclosable alert" type="success" :closable="false" />
      <el-alert title="customized close-text" type="info" close-text="Gotcha" />
      <el-alert title="alert with callback" type="warning" @close="hello" />
    </div>

    <el-divider content-position="left">Dialog 弹窗</el-divider>
    <div>
      <el-button text @click="dialogVisible = true">打开</el-button>

      <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
        <span>This is a message</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <el-divider content-position="left">Drawer 抽屉</el-divider>
    <div>
      <el-radio-group v-model="direction">
        <el-radio label="ltr">left to right</el-radio>
        <el-radio label="rtl">right to left</el-radio>
        <el-radio label="ttb">top to bottom</el-radio>
        <el-radio label="btt">bottom to top</el-radio>
      </el-radio-group>

      <el-button type="primary" style="margin-left: 16px" @click="drawer = true">open</el-button>
      <el-button type="primary" style="margin-left: 16px" @click="drawer2 = true">with footer</el-button>

      <el-drawer v-model="drawer" title="I am the title" :direction="direction" :before-close="handleClose2">
        <span>Hi, there!</span>
      </el-drawer>
      <el-drawer v-model="drawer2" :direction="direction">
        <template #header>
          <h4>set title by slot</h4>
        </template>
        <template #default>
          <div>
            <el-radio v-model="radio1" label="Option 1" size="large">Option 1</el-radio>
            <el-radio v-model="radio1" label="Option 2" size="large">Option 2</el-radio>
          </div>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">cancel</el-button>
            <el-button type="primary" @click="confirmClick">confirm</el-button>
          </div>
        </template>
      </el-drawer>
    </div>

    <el-divider content-position="left">Message 消息提示</el-divider>
    <div>
      <el-button :plain="true" @click="open2">success</el-button>
      <el-button :plain="true" @click="open3">warning</el-button>
      <el-button :plain="true" @click="open1">message</el-button>
      <el-button :plain="true" @click="open4">error</el-button>
      <el-button :plain="true" @click="open5">Message Box</el-button>
    </div>

    <el-divider content-position="left">Notification 通知</el-divider>
    <div>
      <el-button plain @click="open6">Closes automatically</el-button>
      <el-button plain @click="open7">Won't close automatically</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup name="DemoMessage">
import { h, ref } from "vue";
import { ElMessageBox, ElMessage, ElNotification } from "element-plus";

const hello = () => {
  alert("Hello World!");
};

const dialogVisible = ref(false);
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

const drawer = ref(false);
const drawer2 = ref(false);
const direction = ref("rtl");
const radio1 = ref("Option 1");
const handleClose2 = (done: () => void) => {
  ElMessageBox.confirm("Are you sure you want to close this?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
function cancelClick() {
  drawer2.value = false;
}
function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawer2.value = false;
    })
    .catch(() => {
      // catch error
    });
}

const open1 = () => {
  ElMessage("this is a message.");
};
const open2 = () => {
  ElMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  ElMessage({
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open4 = () => {
  ElMessage.error("Oops, this is a error message.");
};

const open5 = () => {
  ElMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

const open6 = () => {
  ElNotification({
    title: "Title",
    message: h("i", { style: "color: teal" }, "This is a reminder"),
  });
};

const open7 = () => {
  ElNotification({
    title: "Prompt",
    message: "This is a message that does not automatically close",
    duration: 0,
  });
};
</script>
<style lang="less" scoped>
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}
</style>
