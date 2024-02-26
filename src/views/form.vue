<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://element-plus.gitee.io/zh-CN/component/form.html" target="_blank">element-plus form配置</a>
      </el-col>
    </el-row>

    <el-divider content-position="left">form</el-divider>

    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="活动地区" prop="region">
        <el-select v-model="ruleForm.region" placeholder="地区">
          <el-option label="成都" value="01" />
          <el-option label="绵阳" value="02" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动数量" prop="count">
        <el-select-v2 v-model="ruleForm.count" placeholder="数量" :options="options" />
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker v-model="ruleForm.date1" type="date" label="日期" placeholder="请选择日期" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker v-model="ruleForm.date2" label="时间" placeholder="请选择时间" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时活动" prop="delivery">
        <el-switch v-model="ruleForm.delivery" />
      </el-form-item>
      <el-form-item label="活动类型" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="线上活动" name="type" />
          <el-checkbox label="促销活动" name="type" />
          <el-checkbox label="离线下活动" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="赞助" />
          <el-radio label="会场" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动描述" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup name="DemoForm">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 3, max: 5, message: "长度3到5", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "请选择地区",
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      message: "请选择数量",
      trigger: "change",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "请选择日期",
      trigger: "change",
    },
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "请选择时间",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "请选择活动类型",
      trigger: "change",
    },
  ],
  resource: [
    {
      required: true,
      message: "请选择活动资源",
      trigger: "change",
    },
  ],
  desc: [{ required: true, message: "请输入活动描述", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>
