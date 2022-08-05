<template>
  <!-- 以下包括批量删除、批量修改权限弹窗 -->
  <div>
    <!--批量删除弹窗-->
    <el-dialog
      title="删除账号"
      :visible.sync="dialogVisibleDelete"
      width="30%"
      class="leastWidth"
    >
      <div style="font-size: 16px">确定删除吗?</div>
      <br />
      <div style="font-size: 16px">确定删除后的信息无法恢复</div>
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
      width="25%"
      top="5vh"
      title="修改权限"
      class="leastWidth"
    >
      <!-- 选择权限列表 -->
      <div style="width: 70%; margin: 0 auto; display: flex">
        <div class="yhqx">用户权限</div>
        <!-- 勾选 -->
        <el-radio-group v-model="permission">
          <div class="radioGroup">
            <el-radio label="committee" class="radioGroupCommitee"
              >committee</el-radio
            >
            <el-radio label="member" class="radioGroupMember">member</el-radio>
          </div>
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
export default {
  name: 'batchOperateDialog',
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
      this.$http
        .post('api/account/manage/delete', {
          organizationId: this.organizationId,
          studentList: studentListData
        })
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.$message.success('删除成功')
              // 同步更新页面权限数据
              this.$emit('myBatchOperateDelete', studentListData)
            } else {
              this.$message.error(res.data.message)
              // console.log('code: ' + res.data.code)
            }
            // 关闭弹窗
            this.dialogVisibleDelete = false
          },
          (err) => {
            this.$message.error(err)
            // 关闭弹窗
            this.dialogVisibleDelete = false
          }
        )
      // console.log('--------仅供测试同步批量删除更新========')
      // this.$emit('myBatchOperateDelete', studentListData)
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
          studentId: this.multipleSelection[index].studentId,
          // studentNumber完全不影响，学号不修改，直接凑一个数据
          studentNumber: this.multipleSelection[index].studentId
        }
      }
      // console.log('点击批量修改')
      // console.log(ListData)
      this.$http
        .post('api/account/manage/revise', {
          organizationId: this.organizationId,
          studentList: ListData
        })
        .then(
          (res) => {
            if (res.data.code == '00000') {
              this.$message.success('修改完成')
              // 同步更新页面权限数据
              this.multipleSelection.forEach((item) => {
                item.permission = this.permission
              })
              // console.log(this.multipleSelection)
            } else {
              this.$message.error(res.data.message)
            }
            // 关闭弹窗
            this.dialogVisible = false
          },
          (err) => {
            this.$message.error(err)
            // 关闭弹窗
            this.dialogVisible = false
          }
        )
      // 仅供测试
      // console.log('测试批量修改权限后，同步更新页面权限数据')
      // // 同步更新页面权限数据，multipleSelection好像也是引用
      // this.multipleSelection.forEach((item) => {
      //   item.permission = this.permission
      // })
      // this.$emit('myBatchOperateChange', 114514)
    }
  }
}
</script>

<style scoped>
/* 最小宽度，防止样式垮了 */
.leastWidth {
  min-width: 1200px;
}
/* 单选上下摆放*/
.radioGroup {
  display: flex;
  flex-direction: column;
}
.radioGroupCommitee {
  position: relative;
  left: 20px;
  bottom: 20px;
  font-size: 20px;
}
.radioGroupMember {
  font-size: 20px;
}
</style>
