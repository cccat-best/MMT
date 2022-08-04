<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="resumeDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>点击简历触发弹窗的内容</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resumeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resumeDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'resumeDialog',
  data() {
    return {
      // 控制简历界面弹窗
      resumeDialogVisible: false,
      // 学号,由主页传过来
      studentId: ''
    }
  }
}
</script>

<style></style>
