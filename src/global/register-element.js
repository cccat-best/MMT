import {
  Radio,
  Select,
  TimePicker,
  DatePicker,
  Input,
  Progress,
  Button,
  Table,
  Container,
  Header,
  Aside,
  Main,
  Submenu,
  MenuItemGroup,
  Row,
  Col,
  TableColumn,
  Pagination,
  Dialog,
  Divider,
  Alert,
  Message,
  MessageBox,
  Tag,
  Form,
  FormItem,
  RadioGroup,
  TimeSelect,
  Checkbox,
  Popover,
  Image,
  Tabs,
  TabPane,
  InputNumber,
  PageHeader,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  Icon,
  Card,
  Descriptions,
  DescriptionsItem,
  Drawer,
  Loading,
  Tooltip,
  Option
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const components = [
  Loading,
  Descriptions,
  DescriptionsItem,
  Card,
  Tooltip,
  Icon,
  MenuItem,
  Menu,
  Option,
  Select,
  Menu,
  MenuItem,
  Icon,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  Avatar,
  PageHeader,
  Radio,
  TimePicker,
  DatePicker,
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
  Submenu,
  MenuItemGroup,
  Row,
  Col,
  TableColumn,
  Pagination,
  Dialog,
  Radio,
  Divider,
  Alert,
  Tag,
  Form,
  FormItem,
  RadioGroup,
  TimeSelect,
  Checkbox,
  Dialog,
  Popover,
  Input,
  Form,
  FormItem,
  Image,
  Input,
  FormItem,
  Tabs,
  TabPane,
  TableColumn,
  Tabs,
  InputNumber,
  Drawer,
  Tooltip,
  Select
]
export default function (Vue) {
  for (const component of components) {
    Vue.use(component)
  }
  Vue.use(Loading.directive)
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$message = Message
}
