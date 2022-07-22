<template>
  <div>
    <div class="interviewOrder">
      <button class="btn btn1">一面</button>
      <button class="btn btn2">二面</button>
      <button class="btn btn3">三面</button>
    </div>
    <div><b>待面试人员名单：</b></div>
    <div class="search">筛选框</div>
    <div class="table">表格</div>
  </div>
</template>

<script>
export default {
  name: 'personList',
  data() {
    return {}
  }
}
</script>

<style scoped>
.btn {
  color: gray;
  /* font-size: 20px; */
  background: white;
  padding: 10px 15px 10px 15px;
  border: solid gray 0.5px;
  text-decoration: none;
}

.btn:focus {
  background: gray;
  color: white;
  text-decoration: none;
}
.btn1 {
  border-radius: 40% 0 0 40%;
  border-right: 0;
}
.btn3 {
  border-radius: 0 40% 40% 0;
  border-left: 0;
}
</style>
