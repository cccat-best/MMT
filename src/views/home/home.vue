<template>
  <div class="home">
    <my-layout-vue
      :isCollapse="isCollapse"
      ref="layout"
      :asideWidth="asideWidth"
      :menuItemList="menuList"
    >
      <template slot="header">hello, 我是头部插槽 </template>
      >
      <template slot="main">
        <router-view></router-view>
      </template>
    </my-layout-vue>
  </div>
</template>

<script>
import myLayoutVue from '../../compentents/myLayout.vue'
export default {
  name: 'home',
  components: {
    myLayoutVue
  },
  data() {
    return {
      isCollapse: false,
      asideWidth: 200,
      menuList: [
        {
          iconClass: '',
          id: '1',
          title: '面试总看板',
          // 瞎写的
          pagePath: '/login'
        },
        {
          iconClass: '',
          id: '2',
          title: '数据看板',
          pagePath: '/login'
        },
        {
          iconClass: '',
          id: '3',
          title: '面试安排',
          pagePath: '/home/arrangement'
        },
        {
          iconClass: '',
          id: '4',
          title: '实时面试',
          pagePath: '/login'
        },
        {
          iconClass: '',
          id: '5',
          title: '面试复盘',
          pagePath: '/login'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
