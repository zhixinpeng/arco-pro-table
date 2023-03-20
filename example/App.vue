<script setup lang="ts">
import dayjs from 'dayjs'
import { useTable } from './hooks/useTable'

const { request, columns, formConfig } = useTable()
</script>

<template>
  <arco-pro-table
    row-key="id"
    title="高级表格"
    size="small"
    :request="request"
    :columns="columns"
    :form-config="formConfig"
    :pagination="{ pageSize: 10 }"
    :row-selection="{ type: 'checkbox', showCheckedAll: true }"
  >
    <template #avatar="{ record }">
      <a-avatar :src="record.avatar" />
    </template>
    <template #birth="{ record }">
      <span>{{ dayjs(record.birth).format('YYYY-MM-DD') }}</span>
    </template>
    <template #operations>
      <a-space>
        <a-button type="primary" size="small">编辑</a-button>
        <a-button type="outline" status="danger" size="small">删除</a-button>
      </a-space>
    </template>
  </arco-pro-table>
</template>

<style lang="less">
#app {
  padding: 20px;
}
</style>
