import {
  Container,
  Header,
  Main,
  Footer,
  Aside,
  Row,
  Col,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  Button,
  Form,
  FormItem,
  PageHeader,
  Avatar,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Tag,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const components = [
  Container,
  Header,
  Main,
  Footer,
  Aside,
  Row,
  Col,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  Button,
  Form,
  FormItem,
  PageHeader,
  Avatar,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Tag,
]
export default function (Vue) {
  for (const component of components) {
    Vue.use(component)
  }
}
