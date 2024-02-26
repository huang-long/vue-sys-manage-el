<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://gitcode.net/mirrors/byte-fe/gm-crypto?utm_source=csdn_github_accelerator" target="_blank">gm-crypto</a>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="SM2" name="SM2">
        <el-row :gutter="24">SM2 公钥： {{ SM2Data.publicKey }}</el-row>
        <el-row :gutter="24">SM2 私钥： {{ SM2Data.privateKey }}</el-row>
        <el-row :gutter="24">
          <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <el-input v-model="SM2Data.originalData" placeholder="请输入需要加密的数据" clearable />
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-button type="cyan" size="mini" @click="encryptSM2">加密</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">SM2 加密数据：</el-row>
        <el-row :gutter="24">
          <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <el-input v-model="SM2Data.encryptedData" placeholder="请输入需要解密的数据" type="textarea" />
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-button type="cyan" size="mini" @click="decryptedSM2">解密</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">SM2 解密数据： {{ SM2Data.decryptedData }}</el-row>
      </el-tab-pane>

      <el-tab-pane label="SM3" name="SM3">
        <el-row :gutter="24">
          <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <el-input v-model="SM3Data.originalData" placeholder="请输入需要加密的数据" clearable />
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-button type="cyan" size="mini" @click="encryptSM3">加密</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">SM3 加密数据： {{ SM3Data.encryptedData }}</el-row>
      </el-tab-pane>

      <el-tab-pane label="SM4" name="SM4">
        <el-row :gutter="24">SM4 秘钥： {{ SM4Data.key }}</el-row>
        <el-row :gutter="24">
          <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <el-input v-model="SM4Data.originalData" placeholder="请输入需要加密的数据" clearable />
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-button type="cyan" size="mini" @click="encryptSM4">加密</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">SM4 加密数据： {{ SM4Data.encryptedData }}</el-row>
        <el-row :gutter="24">
          <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <el-input v-model="SM4Data.encryptedData" placeholder="请输入需要解密的数据" clearable />
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-button type="cyan" size="mini" @click="decryptedSM4">解密</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">SM4 解密数据： {{ SM4Data.decryptedData }}</el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup name="DemoGuomi">
// 该加密方式需要安装gm-crypto
import { SM4, SM3, SM2 } from "gm-crypto";
import { reactive, ref } from "vue";

const { publicKey, privateKey } = SM2.generateKeyPair();
const activeName = ref("SM2");
const SM2Data = reactive({
  publicKey: publicKey,
  privateKey: privateKey,
  originalData: "SM2 椭圆曲线公钥密码算法",
  encryptedData: "",
  decryptedData: "",
});

const SM3Data = reactive({
  originalData: "SM3水电费水电费",
  encryptedData: "",
});

const SM4Data = reactive({
  key: "0123456789abcdeffedcba9876543210",
  iv: "0123456789abcdeffedcba9876543210",
  originalData: "SM4 国标对称加密",
  encryptedData: "",
  decryptedData: "",
});

const handleClick = (tab: string, event: HTMLElement) => {
  console.log(tab, event);
};

//加密
const encryptSM2 = () => {
  SM2Data.encryptedData = SM2.encrypt(SM2Data.originalData, SM2Data.publicKey, {
    inputEncoding: "utf8",
    outputEncoding: "base64",
  });
};

//解密
const decryptedSM2 = () => {
  SM2Data.decryptedData = SM2.decrypt(SM2Data.encryptedData, SM2Data.privateKey, {
    inputEncoding: "base64",
    outputEncoding: "utf8",
  });
};

//加密
const encryptSM3 = () => {
  // SM3Data.encryptedData = SM3.digest(SM3Data.originalData)
  // SM3Data.encryptedData = SM3.digest(SM3Data.originalData, 'base64')
  SM3Data.encryptedData = SM3.digest(SM3Data.originalData, "utf8", "base64");
};

//加密
const encryptSM4 = () => {
  // ECB
  SM4Data.encryptedData = SM4.encrypt(SM4Data.originalData, SM4Data.key, {
    inputEncoding: "utf8",
    outputEncoding: "base64",
  });
  //CBC
  // SM4Data.encryptedData = SM4.encrypt(SM4Data.originalData, SM4Data.key, {
  //   iv: SM4Data.iv,
  //   mode: SM2Data.constants.CBC,
  //   inputEncoding: 'utf8',
  //   outputEncoding: 'hex'
  // })
};
//解密
const decryptedSM4 = () => {
  // ECB
  SM4Data.decryptedData = SM4.decrypt(SM4Data.encryptedData, SM4Data.key, {
    inputEncoding: "base64",
    outputEncoding: "utf8",
  });
  //CBC
  // SM4Data.decryptedData = SM4.decrypt(SM4Data.encryptedData, SM4Data.key, {
  //   iv: SM4Data.iv,
  //   mode: SM2Data.constants.CBC,
  //   inputEncoding: 'utf8',
  //   outputEncoding: 'hex'
  // })
};
</script>
