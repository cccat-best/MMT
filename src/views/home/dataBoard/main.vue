<template>
  <div class="content">
    <dataBoardTable></dataBoardTable>
  </div>
</template>

<script>
import dataBoardTable from './dataBoardView/dataTable.vue'
export default {
  data() {
    return {}
  },
  // 注册组件
  components: { dataBoardTable },
  methods: {}
}
</script>
<style lang="less" scoped></style>
