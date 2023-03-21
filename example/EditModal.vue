<template>
  <a-modal
    :title="record.id ? '编辑' : '新增'"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" :model="form">
      <a-form-item field="name" tooltip="Please enter username" label="Username" required>
        <a-input v-model="form.name" placeholder="please enter your username..." />
      </a-form-item>
      <a-form-item field="post" label="Post" required>
        <a-input v-model="form.post" placeholder="please enter your post..." />
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead"> I have read the manual </a-checkbox>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ValidatedError } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'

interface Props {
  visible: boolean
  record: Record<string, any>
}

interface FormData {
  name: string
  post: string
  isRead: boolean
}

defineProps<Props>()
const emit = defineEmits(['ok', 'cancel'])

const handleOk = async () => {
  await formRef.value?.validate(async (errors: undefined | Record<string, ValidatedError>) => {
    if (errors) return
    // 表单校验通过之后，form 会被自动赋值，里面就是目前表单的内容
    // 你可以在这里做一些异步操作，比如提交表单
    // await submitForm(form)
    // emit('ok')

    // 也可以通过 emit 事件，将表单内容传递给父组件进行处理
    emit('ok', form)
  })
}

const handleCancel = () => {
  emit('cancel')
}

const formRef = ref()
const form = reactive<FormData>({
  name: '',
  post: '',
  isRead: false,
})
</script>
