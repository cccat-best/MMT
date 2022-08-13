<template>
  <el-header>
    <el-row
      type="flex"
      align="middle"
      justify="space-between"
      style="height: 100%; overflow: hidden"
    >
      <div style="min-width: 200px">
        <!-- 非个人中心页面显示 -->
        <div
          v-if="!isPersonal"
          class="leftTop"
          style="
            height: 20px;
            overflow: hidden;
            margin-left: 20px;
            text-align: start;
          "
        >
          {{ loginOrganizationName }}
        </div>
        <!-- 个人中心页面显示 -->
        <el-page-header
          v-if="isPersonal"
          @back="goBack"
          content="个人中心"
          class="back-botton"
        >
        </el-page-header>
      </div>
      <div
        class="rightTop"
        style="display: flex; min-width: 300px; justify-content: right"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="点击此处进入超级管理"
          placement="bottom"
        >
          <span>
            <img
              v-if="this.isSuper"
              src="../assets/img/admin.png"
              alt=""
              style="height: 30px; width: 30px; cursor: pointer"
              @click="superAdmin"
            />
          </span>
        </el-tooltip>
        <el-button
          class="color-change"
          type="text"
          @click="superAdmin"
          style="
            color: black;
            margin-right: 30px;
            height: 40px;
            overflow: hidden;
          "
          @mouseover="this.style.color = blue"
          v-if="this.isSuper"
          >超级管理
        </el-button>
        <!-- 应江哥要求，其他页面点击头像进入个人中心，而个人中心点击头像刷新页面，home函数实现 -->
        <div class="block" style="height: 35px; overflow: hidden">
          <el-tooltip
            v-if="!this.isPersonal"
            class="item"
            effect="dark"
            content="点击头像进入个人中心"
            placement="bottom"
          >
            <span @click="home"
              ><el-avatar
                :size="35"
                :src="circleUrl"
                style="vertical-align: middle; cursor: pointer"
                :click="home"
              ></el-avatar
            ></span>
          </el-tooltip>
          <el-tooltip
            v-if="this.isPersonal"
            class="item"
            effect="dark"
            content="点击头像刷新个人中心"
            placement="bottom"
          >
            <span @click="home"
              ><el-avatar
                :size="35"
                :src="circleUrl"
                style="vertical-align: middle; cursor: pointer"
                :click="home"
              ></el-avatar
            ></span>
          </el-tooltip>
          <el-dropdown trigger="click">
            <span
              class="el-dropdown-link"
              style="
                color: black;
                margin-left: 10px;
                cursor: pointer;
                height: 40px;
                overflow: hidden;
                margin-right: 10px;
              "
            >
              {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div style="text-align: center">
                <el-avatar
                  :size="50"
                  :src="circleUrl"
                  style="vertical-align: middle"
                ></el-avatar>

                <div style="font-size: 10px; margin-top: 10px; height: 20px">
                  {{ loginOrganizationName }}
                </div>
              </div>

              <el-dropdown-item divided>
                <el-dropdown
                  @command="changeOrganization"
                  style="width: 140px; text-align: center"
                >
                  <span class="el-dropdown-link">
                    切换社团
                    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                  </span>
                  <!-- 贺节介建议这里的下拉框改成向左拉开，不过我不会 -->
                  <el-dropdown-menu slot="dropdown">
                    <!-- 单独取出第一个元素，销掉多出的分割线 -->
                    <!-- 防止name爆红 -->
                    <el-dropdown-item
                      v-if="this.organizations[0]"
                      style="width: 140px"
                      :command="this.organizations[0].name"
                      >{{ this.organizations[0].name }}</el-dropdown-item
                    >
                    <el-dropdown-item
                      style="width: 140px"
                      :command="item.name"
                      v-for="(item, index) in organizations.slice(
                        1,
                        organizations.length
                      )"
                      :key="index"
                      divided
                      >{{ item.name }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </el-dropdown-item>

              <el-dropdown-item
                divided
                @click.native="quitLogin"
                style="text-align: center"
              >
                <el-button
                  type="text"
                  @click="quitLogin"
                  class="el-dropdown-link"
                  style="padding: 0px; margin: 0px"
                  >退出登录</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </el-header>
</template>

<script>
export default {
  props: {
    // 是否是个人中心页面
    isPersonal: {
      type: Boolean,
      required: false,
      default: false
    },
    // 用户是否是超级管理
    isSuper: {
      type: Boolean,
      required: false,
      default: false
    },
    name: {
      type: String,
      required: false
    },
    organizations: {
      type: Array,
      required: true
    },
    loginOrganizationName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      sizeList: ['large', 'medium', 'small']
    }
  },
  methods: {
    async changeOrganization(command) {
      const organization = {
        organization: command
      }
      const url = '/api/login/change'
      try {
        let { data: res } = await this.$http.post(url, organization)
        switch (res.code) {
          case '00000': {
            let { data } = res
            // if (this.isPersonal) {
            this.update(data.loginOrganizationName)
            // } else {
            // this.loginOrganizationName = data.loginOrganizationName
            // }
            sessionStorage.setItem(
              'loginOrganizationName',
              data.loginOrganizationName
            )
            if (this.isPersonal) {
              location.reload()
            }

            this.$message({
              message: '切换成功',
              type: 'success'
            })
            break
          }
          default: {
            // this.$message.error(res.message)
            throw new Error(JSON.stringify(res))
          }
        }
      } catch (err) {
        console.log('出错了', err.message)
        this.$message.error('当前未登录或登录已失效')
      }
    },
    async quitLogin() {
      const url = '/api/logout'
      try {
        let { data: res } = await this.$http.get(url)
        switch (res.code) {
          case '00000': {
            this.$message({
              message: '退出登录成功',
              type: 'success'
            })
            this.$router.push('/login')
            break
          }
          default: {
            // this.$message.error(res.message)
            throw new Error(JSON.stringify(res))
          }
        }
      } catch (err) {
        console.log('出错了', err.message)
        this.$message.error('当前未登录或登录已失效')
      }
    },

    superAdmin() {
      this.$router.push('/superAdmin/interviewMain')
      this.$message({
        message: '已切换至超级管理',
        type: 'success'
      })
    },
    home() {
      if (this.isPersonal) {
        location.reload()
      } else {
        this.update(this.loginOrganizationName)
        this.$router.push('/personalInfo')
      }
    },
    // 个人中心顶部左侧返回的实现
    goBack() {
      this.$router.go(-1)
    },
    //更新切换组织后的组织名
    update(newValue) {
      this.$emit('update', newValue)
    }
  }
}
</script>

<style lang="less" scoped>
.bottom {
  clear: both;
  text-align: center;
}

.item {
  margin: 4px;
}

.left .el-tooltip__popper,
.right .el-tooltip__popper {
  padding: 8px 10px;
}
.color-change:hover {
  color: #409eff !important;
}
.el-dropdown-link:hover {
  color: #409eff !important;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
}

.back-botton {
  color: black;
  ::v-deep .el-page-header__title {
    font-size: 14px;
    font-weight: 500;
    color: black;
    &:hover {
      color: #409eff !important;
    }
  }
  ::v-deep .el-icon-back {
    &:hover {
      color: #409eff !important;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
}
.el-dropdown-link:hover {
  color: #409eff !important;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.color-change:hover {
  color: #409eff !important;
}
</style>
