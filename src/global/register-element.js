import {
  Input,
  Progress,
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
  TableColumn,
  Pagination
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const components = [
  Input,
  Progress,
  Button,
  Table,
  TableColumn,
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
  Pagination
]
export default function (Vue) {
  for (const component of components) {
    Vue.use(component)
  }
}
