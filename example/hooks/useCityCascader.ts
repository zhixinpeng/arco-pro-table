import { CascaderOption } from '@arco-design/web-vue/es/cascader/interface'
import { ref } from 'vue'

export function useCityCascader() {
  const cascaderOptions = ref<CascaderOption[]>([])

  setTimeout(() => {
    cascaderOptions.value = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'beijing1',
            label: 'Beijing1',
          },
          {
            value: 'beijing2',
            label: 'Beijing2',
            isLeaf: true,
          },
          {
            value: 'beijing3',
            label: 'Beijing3',
            isLeaf: true,
          },
          {
            value: 'beijing4',
            label: 'Beijing4',
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'shanghai1',
            label: 'Shanghai1',
            isLeaf: true,
          },
        ],
      },
    ]
  }, 1000)

  const loadMore = (option: CascaderOption, done: (children?: CascaderOption[]) => void) => {
    window.setTimeout(() => {
      const nodes = [
        {
          value: `${option.value}-option1`,
          label: `${option.label}-Option1`,
          isLeaf: true,
        },
        {
          value: `${option.value}-option2`,
          label: `${option.label}-Option2`,
          isLeaf: true,
        },
      ]
      done(nodes)
    }, 2000)
  }

  return {
    cascaderOptions,
    loadMore,
  }
}
