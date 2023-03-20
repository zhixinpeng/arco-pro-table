<template>
  <a-modal
    :title="record.id ? '编辑' : '新增'"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" :model="form" @submit="handleSubmit">
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
  await formRef.value?.validate((errors: undefined | Record<string, ValidatedError>) => {
    if (errors) return
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

const handleSubmit = (data: any) => {
  const {} = data as FormData
  console.log(data)
}
</script>
