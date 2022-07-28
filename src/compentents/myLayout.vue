<template>
  <div class="myLayout">
    <el-container class="container">
      <el-aside
        :width="asideWidth + 'px'"
        :style="'background-color:' + asideBgColor + ';'"
        v-if="isAside"
      >
        <slot name="asideTitle"></slot>
        <el-menu
          :default-active="defaultActiveItem"
          class="el-menu-vertical-demo"
          :background-color="asideBgColor"
          :text-color="menuItemColor"
          :active-text-color="meunItemActiveColor"
          router
          :collapse="isCollapse"
        >
          <div>
            <el-menu-item
              :index="item.id"
              v-for="(item, index) in menuItemList"
              :key="index"
              @click="handleMenuItemClick(item)"
              :route="item.pagePath"
            >
              <el-icon :class="['iconfont', item.iconClass]"></el-icon>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <slot name="header"></slot>
        </el-header>
        <el-main>
          <slot name="main"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  props: {
    // 菜单数据
    /**
     * 菜单数组数据说明
     *@param {String} iconClass 图标的 iconfont名称 或者 element的icon class
     *@param {String} id 菜单名称的唯一标注
     *@param {String} pagePath 页面跳转的路由地址
     * */
    menuItemList: {
      type: Array,
      required: true
    },
    // 侧边栏宽度
    asideWidth: {
      type: Number,
      required: false,
      default: 200
    },
    // 侧边栏的背景颜色
    asideBgColor: {
      type: String,
      required: false,
      default: '#283039'
    },
    // 菜单字体颜色
    menuItemColor: {
      type: String,
      required: false,
      default: '#fff'
    },
    // 菜单选项激活颜色
    meunItemActiveColor: {
      type: String,
      required: false,
      default: 'green'
    },
    // 选择是否需要侧边栏
    isAside: {
      type: Boolean,
      required: false,
      default: true
    },
    // 选择是否需要导航栏
    isHeader: {
      type: Boolean,
      required: false,
      default: true
    },
    // 默认激活的菜单选项
    defaultActiveItem: {
      type: String,
      required: false,
      default: '1'
    },
    // 控制是否折叠菜单
    isCollapse: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleMenuItemClick(item) {
      console.log(item)
      this.$route.push(item.pagePath)
    }
  }
}
</script>

<style lang="less" scoped>
.myLayout {
  height: 100%;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  transition: width 0.6s;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // 这段代码导致el表格会出现表头很高
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container {
  height: 100%;
}

.el-menu {
  // 解决菜单突出的1px边框
  border-right-width: 0;
}
</style>
