import {
  Button,
  Table,
  Container,
  Header,
  Aside,
  Main,
  Icon,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  DatePicker,
  TimeSelect,
  TimePicker,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const components = [
  Button,
  Table,
  Container,
  Header,
  Aside,
  Main,
  Icon,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  DatePicker,
  TimeSelect,
  TimePicker,
]
export default function (Vue) {
  for (const component of components) {
    Vue.use(component)
  }
}
