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
        <!-- <div class="title"><h3>效果预览</h3></div> -->
        <div class="rightPreview">
          <div class="baseInfo">
            <div class="card">
              <div class="organize">
                <div class="organizeImg">
                  <img
                    src="https://hanzoy-picture.oss-cn-chengdu.aliyuncs.com/mmt/7942b9e2a80a4945b269a597de7af7a2-file"
                    alt=""
                  />
                </div>
                <div class="organizeAttr">
                  <div class="organizeName">团委</div>
                  <div class="organizeTags">
                    <div class="tag">院级组织</div>
                    <div class="tag">思想政治</div>
                    <div class="tag">志愿公益</div>
                    <div class="tag">活动多样</div>
                  </div>
                </div>
              </div>
              <div class="describe">
                团委是一个向院内学生强力输出积极向上思想的学生组织
              </div>
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
  height: 91%;
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
  height: 94vh;
  margin-left: 40px;
  margin-top: 24px;
  transform: translateY(-20px);
  display: flex;
  align-items: center;
  .rightPreview {
    height: 713px;
    margin-top: 10px;
    background: url(../../../assets/img/iPhone13.png);
    background-repeat: no-repeat;
    background-size: cover;
    width: 354px;
    margin-right: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .baseInfo {
      width: 91%;
      height: 84%;
      .card {
        height: 90px;
        width: 96%;
        margin: 0 auto;
        background-color: #f8f8f8;
        border-radius: 20px;
        margin-top: 30px;
        border: 2px solid #e8e8e8;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        .organize {
          margin: 15px 0 0 0px;
          display: flex;
          .organizeName {
            font-weight: 600;
          }
          .organizeTags {
            display: flex;
            .tag {
              font-size: 11px;
            }
          }
        }
        .describe {
          font-size: 11px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        img {
          height: 50px;
          min-height: 35px;
          min-width: 35px;
          border-radius: 10px;
        }
      }
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
