<script lang="tsx">
import type { PropType } from 'vue'
import { computed, defineComponent, unref } from 'vue'

import { ProFormSchema, ProFormProps } from '../types'
import { componentMap } from '../componentMap'

export default defineComponent({
  name: 'ProFormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<ProFormSchema>,
      default: () => ({}),
    },
    formProps: {
      type: Object as PropType<ProFormProps>,
      default: () => ({}),
    },
    formModel: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any) => void>,
      default: null,
    },
    isAdvanced: {
      type: Boolean,
    },
  },
  setup(props) {
    const getComponentsProps = computed(() => {
      const { schema } = props
      const { componentProps = {} } = schema

      return componentProps
    })

    function renderComponent() {
      const { component, field } = props.schema

      const Comp = componentMap.get(component) as ReturnType<typeof defineComponent>

      const propsData = {
        allowClear: true,
        ...unref(getComponentsProps),
      }

      return <Comp v-model={props.formModel[field]} {...propsData} />
    }

    function renderItem() {
      const { props: itemProps, field, label } = props.schema

      const getContent = () => {
        return renderComponent()
      }

      return (
        <a-form-item name={field} label={label} {...itemProps}>
          {getContent()}
        </a-form-item>
      )
    }

    return () => {
      const { component } = props.schema
      if (!componentMap.has(component)) return null

      return props.isAdvanced && <a-col span={6}>{renderItem()}</a-col>
    }
  },
})
</script>
