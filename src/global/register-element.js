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
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const components = [Button, Table, Container, Header, Aside, Main, Icon, Menu,Submenu,MenuItem,MenuItemGroup,Row,Col,]
export default function (Vue) {
  for (const component of components) {
    Vue.use(component)
  }
}
