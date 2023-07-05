<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { ProTableAction } from '../components'
import { useTable } from './hooks/useTable'
import EditModal from './EditModal.vue'

const tableRef = ref<ProTableAction>()
const { request, columns, formConfig } = useTable()

const visible = ref(false)
const currentRecord = ref<Record<string, any>>({})
const handleEdit = (record: Record<string, any>) => {
  currentRecord.value = record
  visible.value = true
}
const handleOk = (record?: Record<string, any>) => {
  console.log('弹窗关闭', record)
  visible.value = false
}
const handleDelete = (record?: Record<string, any>) => {
  console.log('删除数据', record)
  tableRef.value?.reload(true)
}
const handleReset = () => {
  console.log('重置')
}
</script>

<template>
  <div>
    <arco-pro-table
      ref="tableRef"
      row-key="id"
      title="高级表格"
      size="small"
      :request="request"
      :columns="columns"
      :form-config="formConfig"
      :pagination="{ pageSize: 5 }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      @reset="handleReset"
    >
      <template #action>
        <a-button type="primary" size="small" @click="() => handleEdit({})">新增</a-button>
      </template>
      <template #avatar="{ record }">
        <a-avatar :src="record.avatar" />
      </template>
      <template #birth="{ record }">
        <span>{{ dayjs(record.birth).format('YYYY-MM-DD') }}</span>
      </template>
      <template #operations="{ record }">
        <a-space>
          <a-button type="primary" size="small" @click="() => handleEdit(record)">编辑</a-button>
          <a-popconfirm type="warning" content="确认删除吗？" @ok="() => handleDelete(record)">
            <a-button type="outline" status="danger" size="small">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </arco-pro-table>
    <edit-modal :visible="visible" :record="currentRecord" @ok="handleOk" @cancel="handleOk" />
  </div>
</template>

<style lang="less">
#app {
  padding: 20px;
}
</style>
