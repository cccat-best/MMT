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
  Radio,
  Checkbox,
  Dialog,
  Popover,
  Input,
  MessageBox,
  Message,
  Form,
  FormItem,
  InputNumber,
  TableColumn,
  Tabs,
  TabPane,
  Select,
  Option,


  Progress,
  Pagination,
  Divider,
  Alert,
  Tag,
  RadioGroup,
  Image,
  PageHeader,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem


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
  Radio,
  Checkbox,
  Dialog,
  Popover,
  Input,
  Form,
  FormItem,
  InputNumber,
  TableColumn,
  Tabs,
  TabPane,
  Select,
  Option,

  Progress,
  Pagination,
  Divider,
  Alert,
  Tag,
  RadioGroup,
  Image,
  PageHeader,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem
]
export default function (Vue) {
  for (const component of components) {
    Vue.use(component)
  }
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$message = Message
}
