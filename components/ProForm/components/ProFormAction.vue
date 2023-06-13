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
import { ProFormProps, ProFormSchema } from '../types'

const props = defineProps({
  getSchema: {
    type: Array as PropType<ProFormSchema[]>,
    default: () => [],
  },
  isAdvanced: {
    type: Boolean,
  },
  formProps: {
    type: Object as PropType<ProFormProps>,
    default: () => ({}),
  },
})

const span = computed(() => {
  const schemaLength = props.getSchema.length
  const cols = props.formProps.cols

  if (schemaLength < cols - 1) return 24 - schemaLength * (24 / cols)

  if (props.isAdvanced) return 24

  return 24 / cols
})

const { resetAction, submitAction } = useFormContext()
</script>

<style lang="less">
.arco-form-item-content.action {
  justify-content: flex-end;
}
</style>
