<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://vxetable.cn/#/table/start/install" target="_blank">vxe-table配置</a>
      </el-col>
    </el-row>

    <el-divider content-position="left">vxe-table</el-divider>

    <div>
      <vxe-table border show-overflow ref="xTable" :column-config="{resizable: true}" :loading="demo1.loading"
        :data="demo1.tableData" :edit-config="{trigger: 'manual', mode: 'row'}">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.name" type="text"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="role" title="Role" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.role" type="text" placeholder="请输入昵称"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="sex" title="Sex" :edit-render="{}">
          <template #default="{ row }">
            <span>{{ formatSex(row.sex) }}</span>
          </template>
          <template #edit="{ row }">
            <vxe-select v-model="row.sex" transfer>
              <vxe-option v-for="item in demo1.sexList" :key="item.value" :value="item.value" :label="item.label">
              </vxe-option>
            </vxe-select>
          </template>
        </vxe-column>
        <vxe-column field="sex2" title="多选下拉" :edit-render="{}">
          <template #default="{ row }">
            <span>{{ formatMultiSex(row.sex2) }}</span>
          </template>
          <template #edit="{ row }">
            <vxe-select v-model="row.sex2" multiple transfer>
              <vxe-option v-for="item in demo1.sexList" :key="item.value" :value="item.value" :label="item.label">
              </vxe-option>
            </vxe-select>
          </template>
        </vxe-column>
        <vxe-column field="num6" title="Number" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.num6" type="number" placeholder="请输入数值"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="date12" title="Date" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.date12" type="date" placeholder="请选择日期" transfer></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="date13" title="Week" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.date13" type="week" placeholder="请选择日期" transfer></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="address" title="Address" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.address" type="text"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="160">
          <template #default="{ row }">
            <template v-if="$refs.xTable.isEditByRow(row)">
              <vxe-button @click="saveRowEvent(row)">保存</vxe-button>
              <vxe-button @click="cancelRowEvent(row)">取消</vxe-button>
            </template>
            <template v-else>
              <vxe-button @click="editRowEvent(row)">编辑</vxe-button>
            </template>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { VXETable } from 'vxe-table'
import type { VxeTableInstance } from 'vxe-table'

export default {
  name: "DemoTable2",
  setup() {
    const xTable = ref<VxeTableInstance>()
    interface ItemVO {
      id: number;
      name: string;
      nickname: string;
      [key: string]: any;
    }
    const demo1 = reactive({
      loading: false,
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
      ] as ItemVO[],
      sexList: [
        { label: '', value: '' },
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ]
    })

    const formatSex = (value: any) => {
      if (value === '1') {
        return '男'
      }
      if (value === '0') {
        return '女'
      }
      return ''
    }

    const formatMultiSex = (values: any[]) => {
      if (values) {
        return values.map(val => formatSex(val)).join(',')
      }
      return ''
    }

    const isActiveStatus = (row: ItemVO) => {
      const $table = xTable.value
      return $table?.isEditByRow(row)
    }

    const editRowEvent = (row: ItemVO) => {
      const $table = xTable.value
      $table?.setEditRow(row)
    }

    const saveRowEvent = () => {
      const $table = xTable.value
      $table?.clearEdit().then(() => {
        demo1.loading = true
        setTimeout(() => {
          demo1.loading = false
          VXETable.modal.message({ content: '保存成功！', status: 'success' })
        }, 300)
      })
    }

    const cancelRowEvent = (row: ItemVO) => {
      const $table = xTable.value
      $table?.clearEdit().then(() => {
        // 还原行数据
        $table?.revertData(row)
      })
    }

    return {
      xTable,
      demo1,
      formatSex,
      formatMultiSex,
      isActiveStatus,
      editRowEvent,
      saveRowEvent,
      cancelRowEvent
    }
  },
};
</script>
<style lang="less" scoped>
.page {
  padding: 10px 0;
  display: flex;
  justify-content: right;
}
</style>