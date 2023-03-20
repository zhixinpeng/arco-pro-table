<template>
  <Col :span="span">
    <FormItem :hide-label="true" content-class="action">
      <Space>
        <Button @click="resetAction">
          <template #icon>
            <IconRefresh />
          </template>
          <template #default>重置</template>
        </Button>
        <Button html-type="submit" type="primary" @click="submitAction">
          <template #icon>
            <IconSearch />
          </template>
          <template #default>查询</template>
        </Button>
      </Space>
    </FormItem>
  </Col>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { Col, FormItem, Space, Button } from '@arco-design/web-vue'
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'

import { useFormContext } from '../hooks/useFormContext'
import { ProFormSchema } from '../types'

const props = defineProps({
  getSchema: {
    type: Array as PropType<ProFormSchema[]>,
    default: () => [],
  },
  isAdvanced: {
    type: Boolean,
  },
})

const span = computed(() => {
  const schemaLength = props.getSchema.length

  if (schemaLength < 3) return 24 - schemaLength * 6

  if (props.isAdvanced) return 24

  return 6
})

const { resetAction, submitAction } = useFormContext()
</script>

<style lang="less">
.action {
  justify-content: flex-end;
}
</style>
