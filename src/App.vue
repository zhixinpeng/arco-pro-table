<script setup lang="ts">
import { computed } from 'vue'
import { ProColumnData } from './components'

const columns = computed<ProColumnData[]>(() => [
  {
    title: '#',
    dataIndex: 'id',
    slotName: 'index',
  },
  {
    title: '集合编号',
    dataIndex: 'number',
  },
  {
    title: '集合名称',
    dataIndex: 'name',
  },
  {
    title: '内容体裁',
    dataIndex: 'contentType',
    slotName: 'contentType',
  },
  {
    title: '筛选方式',
    dataIndex: 'filterType',
  },
  {
    title: '内容量',
    dataIndex: 'count',
    defaultHidden: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
  },
])
</script>

<template>
  <a-card>
    <arco-pro-table :columns="columns"></arco-pro-table>
  </a-card>
</template>
