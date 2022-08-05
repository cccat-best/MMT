<template>
  <div class="rightTop">
    <div class="above"></div>
    <div class="below"></div>
  </div>
</template>

<script>
export default {
  name: 'rightTop'
}
</script>

<style scoped>
.rightTop {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.above {
  width: 100%;
  height: 40%;
  background-color: white;
  border-radius: 10px;
}
.below {
  width: 100%;
  height: 54%;
  background-color: white;
  border-radius: 10px;
}
</style>
