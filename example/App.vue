<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { SelectOptionData } from '@arco-design/web-vue/es/select/interface'
import { ProColumnData, ProFormProps } from '../components'

const city = ref<SelectOptionData[]>([])

const fetchCity = async () => {
  const { data } = await axios.get('https://6412b953232c91393dd41c2d.mockapi.io/api/citys')
  data.forEach((item: any) => {
    city.value.push({
      value: item.id,
      label: item.name,
    })
  })
}

fetchCity()

const request = async (params: any, sort: any, filter: any) => {
  console.log('查询参数：', params)
  console.log('排序参数：', sort)
  console.log('筛选参数：', filter)

  const { data } = await axios.get('https://6412b953232c91393dd41c2d.mockapi.io/api/users')

  return {
    data: data,
    total: data.length,
  }
}

const columns = computed<ProColumnData[]>(() => [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名字',
    dataIndex: 'name',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    slotName: 'avatar',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
    filterable: {
      filters: [
        {
          text: '> 30',
          value: '30',
        },
        {
          text: '> 50',
          value: '50',
        },
      ],
      filter: (age, record) => record.age > age,
      multiple: true,
    },
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '生日',
    dataIndex: 'birth',
    slotName: 'birth',
  },
  {
    title: '国家',
    dataIndex: 'country',
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
      label: '名字',
      component: 'Input',
    },
    {
      field: 'address',
      label: '地址',
      component: 'Select',
      componentProps: {
        options: city.value,
      },
    },
    {
      field: 'birth',
      label: '生日',
      component: 'DatePicker',
    },
    {
      field: 'age',
      label: '年龄',
      component: 'InputNumber',
    },

    {
      field: 'phone',
      label: '电话',
      component: 'Input',
    },
    {
      field: 'email',
      label: '邮箱',
      component: 'Input',
    },
    {
      field: 'country',
      label: '国家',
      component: 'Input',
    },
  ],
}))
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
    <template #operations="{ record }">
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
