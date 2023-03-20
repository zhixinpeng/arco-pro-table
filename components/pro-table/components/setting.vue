<template>
  <a-space :size="12">
    <a-tooltip content="刷新">
      <div class="action-icon" @click="reload"><icon-refresh size="18" /></div>
    </a-tooltip>
    <a-dropdown position="br" @select="handleSelectDensity">
      <a-tooltip content="密度">
        <div class="action-icon"><icon-line-height size="18" /></div>
      </a-tooltip>
      <template #content>
        <a-doption
          v-for="item in densityList"
          :key="item.value"
          :value="item.value"
          :class="{ active: item.value === size }"
        >
          <span>{{ item.name }}</span>
        </a-doption>
      </template>
    </a-dropdown>
    <a-tooltip content="列表设置">
      <a-popover trigger="click" position="br" @popup-visible-change="handleVisibleChange">
        <div class="action-icon"><icon-settings size="18" /></div>
        <template #content>
          <div id="tableSetting">
            <a-checkbox-group
              ref="columnListRef"
              v-model:model-value="state.checkedList"
              @change="onChange"
            >
              <div v-for="item in plainSortOptions" :key="item.value" class="columns">
                <div class="drag-icon" style="cursor: move">
                  <icon-drag-arrow />
                </div>
                <div>
                  <a-checkbox :value="item.value"></a-checkbox>
                </div>
                <div class="title">
                  {{ item.label }}
                </div>
              </div>
            </a-checkbox-group>
          </div>
        </template>
      </a-popover>
    </a-tooltip>
  </a-space>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, reactive, unref, nextTick } from 'vue'
import { cloneDeep, isNull, isUndefined } from 'lodash'
import Sortablejs from 'sortablejs'
import { Size } from '@arco-design/web-vue/es/_utils/constant'

import { useTableContext } from '../hooks/useTableContext'
import { ComponentRef } from '../types/index'

interface State {
  checkAll: boolean
  isInit?: boolean
  checkedList: string[]
  defaultCheckList: string[]
}

interface Options {
  label: string
  value: string
}

const table = useTableContext()

const size = ref<Size>(table.getSize())
const densityList = computed(() => [
  {
    name: '迷你',
    value: 'mini',
  },
  {
    name: '偏小',
    value: 'small',
  },
  {
    name: '中等',
    value: 'medium',
  },
  {
    name: '偏大',
    value: 'large',
  },
])

const state = reactive<State>({
  checkAll: true,
  checkedList: [],
  defaultCheckList: [],
})
const cachePlainOptions = ref<Options[]>([])
const plainOptions = ref<Options[] | any>([])
const plainSortOptions = ref<Options[]>([])
const columnListRef = ref<ComponentRef>(null)

watchEffect(() => {
  const columns = table.getColumns()
  setTimeout(() => {
    if (columns.length && !state.isInit) {
      init()
    }
  }, 0)
})

const reload = () => {
  table.reload()
}

const handleSelectDensity = (value: string | number | Record<string, any> | undefined) => {
  size.value = value as Size
  table.setProps({ size: value as Size })
}

const getColumns = () => {
  const ret: Options[] = []
  table.getColumns().forEach((item) => {
    ret.push({
      label: item.title as string,
      value: item.dataIndex,
      ...item,
    })
  })
  return ret
}

const init = () => {
  const columns = getColumns()

  const checkList = table
    .getColumns()
    .map((item) => {
      if (item.defaultHidden) {
        return ''
      }
      return item.dataIndex
    })
    .filter(Boolean) as string[]

  if (!plainOptions.value.length) {
    plainOptions.value = columns
    plainSortOptions.value = columns
    cachePlainOptions.value = columns
    state.defaultCheckList = checkList
  }
  state.isInit = true
  state.checkedList = checkList
}

function handleVisibleChange() {
  nextTick(() => {
    const columnListEl = unref(columnListRef)
    if (!columnListEl) return

    const el = columnListEl.$el as any
    if (!el) return

    Sortablejs.create(unref(el), {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
      handle: '.drag-icon',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt
        if (
          isNull(oldIndex) ||
          isUndefined(oldIndex) ||
          isNull(newIndex) ||
          isUndefined(newIndex) ||
          oldIndex === newIndex
        ) {
          return
        }
        const columns = cloneDeep(plainSortOptions.value)

        if (oldIndex > newIndex) {
          columns.splice(newIndex, 0, columns[oldIndex])
          columns.splice(oldIndex + 1, 1)
        } else {
          columns.splice(newIndex + 1, 0, columns[oldIndex])
          columns.splice(oldIndex, 1)
        }

        plainSortOptions.value = columns

        const newColumns = columns
          .map((col: Options) => col.value)
          .filter((value: string) => state.checkedList.includes(value))

        table.setColumns(newColumns)
      },
    })
  })
}

const onChange = (checkedList: (string | number | boolean)[]) => {
  // 按照原始顺序排序
  const len = plainSortOptions.value.length
  state.checkAll = checkedList.length === len
  const sortList = unref(plainSortOptions).map((item) => item.value)
  ;(checkedList as string[]).sort((prev, next) => {
    return sortList.indexOf(prev) - sortList.indexOf(next)
  })

  table.setColumns(checkedList as string[])
}
</script>

<script lang="ts">
export default {
  name: 'ProTableSetting',
}
</script>

<style lang="less" scoped>
.action-icon {
  cursor: pointer;
}

.active {
  color: #0960bd;
  background-color: #e3f4fc;
}

.columns {
  display: flex;
  align-items: center;
  min-width: 100px;

  .title {
    cursor: pointer;
  }
}
</style>
