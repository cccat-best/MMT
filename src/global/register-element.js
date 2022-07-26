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
  TableColumn,
  Pagination,
  Input,
  Dialog,
  Radio,
  Divider,
  Alert,
  Message,
  MessageBox,
  Tag,
  Form,
  FormItem,
  RadioGroup,
  DatePicker,
  TimeSelect,
  TimePicker,
  Checkbox,
  Popover,
  InputNumber
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
  TableColumn,
  Pagination,
  Input,
  Dialog,
  Radio,
  Divider,
  Alert,
  Tag,
  Form,
  FormItem,
  RadioGroup,
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
  InputNumber
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
