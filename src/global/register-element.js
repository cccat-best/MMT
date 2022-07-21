import {
  Button,
  Table,
  Container,
  Header,
  Aside,
  Main,
  Icon
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const components = [Button, Table, Container,Header,Aside,Main,Icon]
export default function (Vue) {
  for (const component of components) {
    Vue.use(component)
  }
}
