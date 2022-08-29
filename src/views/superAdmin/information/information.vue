<template>
  <div class="information">
    <div class="title">
      <i class="el-icon-folder-opened"></i>
      <span> 宣传管理 </span>
    </div>
    <div class="content">
      <div class="left">
        <div class="title"><h3>信息编辑</h3></div>
        <div class="leftEdit">
          <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="1">
              <div class="baseInfo"></div>
            </el-tab-pane>
            <el-tab-pane label="社团宣传" name="2">配置管理</el-tab-pane>
            <el-tab-pane label="纳新部门" name="3">角色管理</el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="right">
        <div class="title"><h3>效果预览</h3></div>
        <div class="rightPreview">
          <div class="baseInfo">
            <div class="card">
              <div class="organize">
                <div class="organizeImg"></div>
                <div class="organizeAttr">
                  <div class="organizeName"></div>
                  <div class="organizeTags">
                    <div class="tag"></div>
                  </div>
                </div>
              </div>
              <div class="describe"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: '1'
    }
  },
  methods: {
    handleClick() {
      console.log(1)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  text-align: left;
}
.information {
  height: 100%;
}
.content {
  height: 89%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left {
  height: 100%;
  flex: 1;
  .leftEdit {
    margin-top: 10px;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    overflow: scroll;
    // 隐藏滚动条
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  .title {
    margin-left: 20px;
    margin-top: 10px;
  }
}

.right {
  height: 100%;
  margin-left: 40px;
  margin-top: 24px;
  .rightPreview {
    height: 100%;
    margin-top: 10px;
    background: url(../../../assets/img/iPhone13.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 290px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .baseInfo {
      width: 91%;
      height: 84%;
      border: 1px solid #333;
    }
  }
}
::v-deep .el-tabs__nav-scroll {
  padding-left: 36px;
}
::v-deep .el-tabs {
  height: 100%;
}
</style>
