import { Button, Table } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const components = [Button, Table]
export default function (Vue) {
  for (const component of components) {
    Vue.use(component)
  }
}
