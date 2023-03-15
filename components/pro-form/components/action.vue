<template>
  <a-col :span="span">
    <a-form-item :hide-label="true" content-class="action">
      <a-space>
        <a-button @click="resetAction">
          <template #icon>
            <icon-refresh />
          </template>
          <template #default>重置</template>
        </a-button>
        <a-button html-type="submit" type="primary" @click="submitAction">
          <template #icon>
            <icon-search />
          </template>
          <template #default>查询</template>
        </a-button>
      </a-space>
    </a-form-item>
  </a-col>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
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
