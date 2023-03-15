<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProColumnData, ProFormProps } from '../components'

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

const options = ref<any[]>([])

setTimeout(() => {
  options.value = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
  ]
}, 3000)

const formConfig = computed<Partial<ProFormProps>>(() => ({
  labelColProps: {
    span: 8,
  },
  wrapperColProps: {
    span: 16,
  },
  schemas: [
    {
      field: 'name',
      label: '集合名称',
      component: 'Input',
      props: {
        showColon: true,
      },
    },
    {
      field: 'name1',
      label: '集合名称1',
      component: 'Input',
      props: {
        showColon: true,
      },
    },
    {
      field: 'name2',
      label: '集合名称2',
      component: 'Input',
      props: {
        showColon: true,
      },
    },
    {
      field: 'name3',
      label: '集合名称3',
      component: 'Input',
      props: {
        showColon: true,
      },
    },
    {
      field: 'contentType',
      label: '内容体裁',
      component: 'Select',
      componentProps: {
        options: options,
      },
      props: {
        showColon: true,
      },
    },
  ],
}))
</script>

<template>
  <a-card>
    <arco-pro-table title="高级表格" :columns="columns" :form-config="formConfig"></arco-pro-table>
  </a-card>
</template>

<style lang="less"></style>
