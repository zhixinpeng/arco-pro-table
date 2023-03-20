import axios from 'axios'
import { computed } from 'vue'
import { ProColumnData, ProFormProps } from '../../components'
import { useCityCascader } from './useCityCascader'
import { useCitySelect } from './useCitySelect'

export function useTable() {
  const { cascaderOptions, loadMore } = useCityCascader()
  const { city } = useCitySelect()

  const request = async (params: any) => {
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
        component: 'Cascader',
        componentProps: {
          options: cascaderOptions,
          loadMore,
        },
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

  return { request, columns, formConfig }
}
