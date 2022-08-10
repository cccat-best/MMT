<template>
  <div class="interviewMain">
    <div class="interviewMainTop">
      <div class="interviewMainTopInner"></div>
      <div class="interviewMainTopInner">
        <div class="informationBasicMain">
          <div
            v-if="editable === false"
            class="editBtn"
            @click="
              editable = !editable
              gotoEdit()
            "
          >
            <i class="el-icon-edit-outline"></i>
            编辑页面
          </div>
          <div
            v-if="editable === true"
            class="editBtn"
            @click="
              editable = !editable
              gotoSaved()
            "
          >
            <i class="el-icon-document-checked"></i>
            保存页面
          </div>
          <!-- 下面是默认显示的信息（默认是不保存） -->
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="interviewMainButtom"></div>
  </div>
</template>

<script>
export default {
  comments: {},
  data() {
    return {
      editable: false
    }
  }
}
</script>
