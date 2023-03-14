<template>
  <div ref="wrapRef">
    <pro-form
      v-if="getFormProps.schemas && getFormProps.schemas.length > 0"
      ref="formRef"
      submit-on-reset
      v-bind="getFormProps"
      @submit="handleFormSubmit"
    />
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-space>
          <slot name="action" />
        </a-space>
      </a-col>
      <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
        <a-space :size="12">
          <slot name="toolbar" />
          <setting v-if="showSetting" />
        </a-space>
      </a-col>
    </a-row>
    <a-table
      ref="tableRef"
      v-bind="getBindValues"
      :loading="loading"
      :columns="getViewColumns"
      :data="renderData"
      :pagination="getPaginationInfo"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, unref, useAttrs, watch } from 'vue'

import useLoading from '../hooks/useLoading'
import { ProForm } from '../../pro-form'
import { useTable } from '../hooks/useTable'
import { usePagination } from '../hooks/usePagination'
import { useColumns } from '../hooks/useColumns'
import Setting from './setting.vue'
import { createTableContext } from '../hooks/useTableContext'
import { baseProps } from '../props'
import { isBoolean } from '../../shared/is'
import { useTableForm } from '../hooks/useTableForm'
import { ProTableAction } from '../types/action'
import { ProTableProps } from '../types/index'
import { getDynamicProps } from '../../shared'
import { PaginationProps } from '@arco-design/web-vue/es/pagination/interface'
import { Size } from '@arco-design/web-vue/es/_utils/constant'
import Message from '@arco-design/web-vue/es/message'

const props = defineProps(baseProps)
const attrs = useAttrs()
const innerPropsRef = ref<Partial<ProTableProps>>()

// 获取 ProTable 组件的所有 Props
// 使用 innerPropsRef 覆盖外部传入的 Props 以实现动态 Props
const getProps = computed(() => {
  return {
    ...props,
    ...unref(innerPropsRef),
  } as ProTableProps
})
// 设置 ProTable 组件的所有 Props
const setProps = (changeProps: Partial<ProTableProps>) => {
  innerPropsRef.value = { ...unref(innerPropsRef), ...changeProps }
}
// 需要传递给 Arco Table 绑定的所有 Props 与 Events
const getBindValues = computed(() => {
  return { ...attrs, ...unref(getProps) }
})

const { request } = getProps.value

const showSetting = computed(() => {
  return unref(getProps).showSetting || true
})

const { loading, setLoading } = useLoading(false)
const renderData = ref<any[]>([])

const { tableRef, methods } = useTable()
const { getPaginationInfo, getPagination, setPagination, setShowPagination, getShowPagination } =
  usePagination(getProps)

const { getCacheColumns, getColumns, setColumns, getViewColumns } = useColumns(getProps)

const wrapRef = ref(null)

const fetchData = async (info?: Record<string, any>) => {
  if (!request) return
  setLoading(true)
  try {
    let params
    if (isBoolean(getPaginationInfo)) {
      params = {}
    } else {
      const { current, pageSize } = unref(getPaginationInfo) as PaginationProps
      params = {
        pageNo: current,
        pageSize,
      }
    }

    if (info) {
      params = {
        ...params,
        ...info,
      }
    }

    const { data, total } = await request(params)
    renderData.value = data
    setPagination({ total })
  } catch (err) {
    Message.error({ content: err as string })
  } finally {
    setLoading(false)
  }
}

fetchData()

const onPageChange = (current: number) => {
  setPagination({ current })
  fetchData()
}

const onPageSizeChange = (pageSize: number) => {
  setPagination({ current: 1, pageSize })
  fetchData()
}

const { getFormProps, handleFormSubmit } = useTableForm(getProps, fetchData)

const tableAction: ProTableAction = {
  ...methods,
  reload: fetchData,
  setProps,
  getSize: () => unref(getBindValues).size as Size,
  getColumns,
  setColumns,
  getCacheColumns,
  getPagination,
  setPagination,
  getShowPagination,
  setShowPagination,
}

createTableContext({ ...tableAction, wrapRef })

defineExpose(tableAction)

watch(
  () => props,
  (props) => {
    setProps(getDynamicProps(props))
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>
