<template>
  <Form ref="formRef" v-bind="getBindValues" :model="formModel">
    <Row align="center" justify="space-between" style="margin-bottom: 10px">
      <div class="title">{{ props.title }}</div>
      <Button v-if="showAdvanced" type="text" @click="() => (isAdvanced = !isAdvanced)">
        <template #icon>
          <IconUp v-if="isAdvanced" />
          <IconDown v-else />
        </template>
        <template #default>{{ isAdvanced ? '收起' : '更多筛选' }}</template>
      </Button>
    </Row>
    <Row :gutter="10">
      <template v-for="schema in getSchema" :key="schema.field">
        <AcroProFormItem
          :schema="schema"
          :form-model="formModel"
          :form-props="getProps"
          :set-form-model="setFormModel"
          :is-advanced="fieldsIsAdvancedMap[schema.field]"
          :show-advanced="isAdvanced"
        >
          <template v-for="item in Object.keys($slots)" #[item]="data">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </AcroProFormItem>
      </template>
      <AcroProFormAction :get-schema="getSchema" :is-advanced="isAdvanced" :form-props="getProps" />
    </Row>
  </Form>
</template>

<script setup lang="ts">
import { computed, reactive, Ref, ref, unref, useAttrs, watch } from 'vue'
import { Form, Row, Button } from '@arco-design/web-vue'
import { IconUp, IconDown } from '@arco-design/web-vue/es/icon'

import AcroProFormItem from './ProFormItem.vue'
import AcroProFormAction from './ProFormAction.vue'

import { baseProps } from '../props'
import { ProFormAction, ProFormProps, ProFormSchema } from '../types'
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
  if (formProps.initFormModel) {
    Object.keys(formProps.initFormModel).map((key) => {
      setFormModel(key, (formProps.initFormModel as any)[key])
    })
  }
}

const getBindValues = computed(() => {
  return { ...attrs, ...unref(getProps) }
})

const formModel = reactive<Record<string, any>>({})
const schemaRef = ref<ProFormSchema[] | null>(null)
const isAdvanced = ref(false)

const getSchema = computed((): ProFormSchema[] => {
  return unref(schemaRef) || (unref(getProps).schemas as ProFormSchema[])
})

const { formRef, methods } = useForm()

const proFormAction: ProFormAction = {
  ...methods,
}

defineExpose(proFormAction)

const emit = defineEmits(['submit', 'reset'])

const { submit, reset, resetSchema } = useFormEvents({
  emit,
  formModel,
  formRef: formRef as Ref<ProFormAction>,
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
  formProps: unref(getProps),
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
