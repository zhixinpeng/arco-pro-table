import { SelectOptionData } from '@arco-design/web-vue/es/select/interface'
import axios from 'axios'
import { ref } from 'vue'

export function useCitySelect() {
  const city = ref<SelectOptionData[]>([])

  const fetchCity = async () => {
    const { data } = await axios.get('https://6412b953232c91393dd41c2d.mockapi.io/api/citys')
    data.forEach((item: any) => {
      city.value.push({
        value: item.id,
        label: item.name,
      })
    })
  }

  fetchCity()

  return { city }
}
