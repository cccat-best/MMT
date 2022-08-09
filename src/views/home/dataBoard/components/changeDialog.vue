<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="changeDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>点击修改触发弹窗的内容</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'changeDialog',
  data() {
    return {
      // 控制修改界面弹窗
      changeDialogVisible: false,
      // 学号,由主页传过来
      studentId: ''
    }
  },
  methods: {
    handleClose() {}
  }
}
</script>

<style></style>
