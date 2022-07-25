<template>
  <!-- 以下包括批量删除、批量修改权限弹窗 -->
  <div>
    <!--批量删除弹窗-->
    <el-dialog title="删除账号" :visible.sync="dialogVisibleDelete" width="30%">
      <div>确定删除吗?</div>
      <div>确定删除后的信息无法恢复</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogVisibleDelete"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改权限弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      top="5vh"
      title="修改权限"
    >
      <!-- 选择权限列表 -->
      <div style="width: 70%; margin: 0 auto; display: flex">
        <div class="yhqx">用户权限</div>
        <!-- 勾选 -->
        <el-radio-group v-model="permission">
          <el-radio label="commitee">commitee</el-radio>
          <el-radio label="member">member</el-radio>
        </el-radio-group>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDialogVisibleChangePermission"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
//引入axios
import axios from 'axios'
export default {
  data() {
    return {
      dialogVisibleDelete: false, //批量删除
      dialogVisible: false, //批量修改权限
      // 权限选择
      permission: 'member', //默认 ////////////////////////
      // 选中数据
      multipleSelection: []
    }
  },
  methods: {
    // 批量删除
    handleDialogVisibleDelete() {
      // console.log(...this.multipleSelection);
      // console.log('this.multipleSelection[0]')
      // console.log(this.multipleSelection[0])
      // 准备学号list
      const studentListData = []
      for (let index = 0; index < this.multipleSelection.length; index++) {
        studentListData[index] = {
          studentId: this.multipleSelection[index].studentId
        }
      }
      // console.log(studentListData);
      axios({
        method: 'post',
        url: 'https://mmt-dev.sipcoj.com/account/manage/delete',
        data: {
          organizationId: this.organizationId,
          studentList: studentListData
        }
      }).then(
        (res) => {
          this.$message.success(res.data.message)
        },
        (err) => {
          this.$message.error(err)
        }
      )
    },
    // 批量修改
    handleDialogVisibleChangePermission() {
      // 准备账号信息list
      // 不够优雅，待改进
      const ListData = []
      for (let index = 0; index < this.multipleSelection.length; index++) {
        ListData[index] = {
          name: this.multipleSelection[index].name,
          // password: this.passWord, 修改账号不需要password
          permission: this.permission, //选中的权限
          phone: this.multipleSelection[index].phone,
          studentId: this.multipleSelection[index].studentId
        }
      }
      // console.log('点击批量修改')
      // console.log(ListData)
      axios({
        method: 'post',
        url: 'https://mmt-dev.sipcoj.com/account/manage/revise',
        data: {
          organizationId: this.organizationId,
          studentList: ListData
        }
      }).then(
        (res) => {
          this.$message.success(res.data.message)
        },
        (err) => {
          this.$message.error(err)
        }
      )
    }
  }
}
</script>

<style></style>
