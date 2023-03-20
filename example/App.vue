<script setup lang="ts">
import dayjs from 'dayjs'
import { Avatar, Space, Button } from '@arco-design/web-vue'
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
      <Avatar :src="record.avatar" />
    </template>
    <template #birth="{ record }">
      <span>{{ dayjs(record.birth).format('YYYY-MM-DD') }}</span>
    </template>
    <template #operations>
      <Space>
        <Button type="primary" size="small">编辑</Button>
        <Button type="outline" status="danger" size="small">删除</Button>
      </Space>
    </template>
  </arco-pro-table>
</template>

<style lang="less">
#app {
  padding: 20px;
}
</style>
