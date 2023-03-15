<template>
  <a-form ref="formRef" v-bind="getBindValues" :model="formModel">
    <a-row align="center" justify="space-between" style="margin-bottom: 10px">
      <div class="title">{{ props.title }}</div>
      <a-button v-if="showAdvanced" type="text" @click="() => (isAdvanced = !isAdvanced)">
        <template #icon>
          <icon-up v-if="isAdvanced" />
          <icon-down v-else />
        </template>
        <template #default>{{ isAdvanced ? '收起' : '更多筛选' }}</template>
      </a-button>
    </a-row>
    <a-row :gutter="10">
      <template v-for="schema in getSchema" :key="schema.field">
        <form-item
          :schema="schema"
          :form-model="formModel"
          :form-props="getProps"
          :set-form-model="setFormModel"
          :is-advanced="fieldsIsAdvancedMap[schema.field]"
        >
          <template v-for="item in Object.keys($slots)" #[item]="data">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </form-item>
      </template>
      <form-action :get-schema="getSchema" :is-advanced="isAdvanced" />
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, Ref, ref, unref, useAttrs, watch } from 'vue'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'

import { baseProps } from '../props'
import { dateItemType } from '../componentMap'
import { ProFormAction, ProFormProps, ProFormSchema } from '../types'
import FormItem from './item.vue'
import FormAction from './action.vue'
import { createFormContext } from '../hooks/useFormContext'
import { useFormEvents } from '../hooks/useFormEvents'
import { useForm } from '../hooks/useForm'
import { useAdvanced } from '../hooks/useAdvanced'
import { getDynamicProps, deepMerge } from '../../shared'

const props = defineProps(baseProps)
const attrs = useAttrs()
const innerPropsRef = ref<Partial<ProFormProps>>()

const getProps = computed(() => {
  return {
    ...props,
    ...unref(innerPropsRef),
  } as ProFormProps
})

const setProps = async (formProps: Partial<ProFormProps>) => {
  innerPropsRef.value = deepMerge(unref(innerPropsRef) || {}, formProps)
}

const getBindValues = computed(() => {
  return { ...attrs, ...unref(getProps) }
})

const formModel = reactive<Record<string, any>>({})
const defaultValueRef = ref<Record<string, any>>({})
const schemaRef = ref<ProFormSchema[] | null>(null)
const isAdvanced = ref(false)

const getSchema = computed((): ProFormSchema[] => {
  const schemas: ProFormSchema[] = unref(schemaRef) || (unref(getProps).schemas as ProFormSchema[])

  for (const schema of schemas) {
    const { defaultValue, component, isHandleDateDefaultValue = true } = schema
    if (isHandleDateDefaultValue && defaultValue && dateItemType.includes(component)) {
      if (!Array.isArray(defaultValue)) {
        schema.defaultValue = dayjs(defaultValue)
      } else {
        const def: any[] = []
        defaultValue.forEach((item) => {
          def.push(dayjs(item))
        })
        schema.defaultValue = def
      }
    }
  }
  return cloneDeep(schemas as ProFormSchema[])
})

const { formRef, methods } = useForm()

const proFormAction: ProFormAction = {
  ...methods,
}

defineExpose(proFormAction)

const emit = defineEmits(['submit'])

const { submit, reset, resetSchema } = useFormEvents({
  emit,
  formModel,
  formRef: formRef as Ref<ProFormAction>,
  getSchema,
  defaultValueRef,
  schemaRef: schemaRef as Ref<ProFormSchema[]>,
})

createFormContext({
  resetAction: reset,
  submitAction: submit,
})

const setFormModel = (key: string, value: any) => {
  formModel[key] = value
}

const { showAdvanced, fieldsIsAdvancedMap } = useAdvanced({
  isAdvanced,
  getSchema,
})

watch(
  () => props,
  () => {
    props && setProps(getDynamicProps(props))
  },
  {
    immediate: true,
    deep: true,
  },
)

watch(
  () => unref(getProps).schemas,
  (schemas) => {
    resetSchema(schemas ?? [])
  },
)
</script>

<style lang="less" scoped>
.title {
  font-weight: 500;
  font-size: 16px;
}
</style>
