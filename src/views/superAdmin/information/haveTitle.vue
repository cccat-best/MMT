<template>
  <div class="haveTitleCard">
    <div class="title">
      <h4>{{ title }}</h4>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  text-align: left;
  h4 {
    border-left: 3px solid #3784ff;
    padding: 3px 10px;
  }
}
</style>
