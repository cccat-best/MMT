<template>
  <div class="sign_details">
    <div class="title">{{ title }}</div>
    <div class="details_content" v-html="markContent"></div>
  </div>
</template>

<script>
const marked = require('marked')

export default {
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    }
  },
  computed: {
    markContent() {
      return marked.parse(this.content).replace(/\n/g, '<br/>')
    }
  }
}
</script>

<style lang="less" scoped>
.sign_details {
  width: 100%;
  min-height: 75px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  .details_content {
    padding: 0 20px;
    font-size: 12px;
    letter-spacing: 2px;
    padding-bottom: 10px;
    color: #3f536e;
    ::v-deep img {
      width: 100%;
      display: block;
    }
  }
}

.title {
  border-left: 4px solid #3784ff;
  padding: 8px;
  margin: 7px 0;
  display: inline-block;
  font-weight: 600;
  color: #2c405a;
  font-size: 15px;
  letter-spacing: 2px;
}
</style>
