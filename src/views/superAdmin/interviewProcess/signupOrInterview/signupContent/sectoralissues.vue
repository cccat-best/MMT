<template>
  <div class="section">
    <div class="section-title" ref="sectionPage">部门问题</div>
    <div class="section-content">
      <!-- 最大可报部门数 是否允许调剂 -->
      <div class="section-content-top">
        <!-- 最大可报部门 -->
        <div class="section-content-top-max">
          <span class="section-content-top-max-title">最多可报名部门数</span>
          <el-input-number
            v-model="maxDepartment"
            controls-position="right"
            :min="1"
            :max="3"
            size="mini"
            :disabled="!isEdit"
            @change="changeMaxDepartment"
          ></el-input-number>
        </div>
        <!-- 是否允许调剂 -->
        <div class="section-content-top-allocated">
          <el-checkbox
            v-model="allocated"
            v-if="departmentCount >= 2"
            :disabled="!isEdit"
            @change="changeAllocated"
            >允许调剂</el-checkbox
          >
        </div>
      </div>
      <!-- 部门&&问题展示 -->
      <div
        class="section-que-content"
        v-for="(item, i) in departmentList"
        :key="'d' + i"
      >
        <!-- 部门名称 -->
        <div class="section-que-content-title">
          部门{{ i + 1 }}：{{ item.departmentName }}
        </div>
        <!-- 问题展示区&&添加区 -->
        <addQues
          :sectionQues="sectionQues"
          :departmentId="item.departmentId"
          ref="a"
        ></addQues>
      </div>
    </div>
  </div>
</template>

<script>
import addQues from './addQues.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  props: ['allQues'],
  //添加问题组件
  components: { addQues },
  data() {
    return {
      //最多可报名部门数
      maxDepartment: 1,
      //是否调剂
      allocated: false,
      //部门数组
      departmentList: [],
      //如果部门数为1不显示调剂按钮
      departmentCount: 0,
      // 获取用户是否设置过部门问题
      sectionQues: []
    }
  },
  mounted() {
    this.getDeppartmentList()
    window.addEventListener('scroll',this.sectionPage,true)
  },
  methods: {
    ...mapMutations('problem', ['updateMaxDepartment', 'updateAllocated']),
    sectionPage() {
      console.log('部门问题',this.$refs.sectionPage.getBoundingClientRect().top)
      if(this.$refs.sectionPage.getBoundingClientRect().top>=157&&this.$refs.sectionPage.getBoundingClientRect().top<=357) {
        this.$parent.sectionShow()
      }
    },
    // packgeSectionQue() {
    //   //保存最大可报部门数 是否调剂
    //   this.updateMaxDepartment(this.maxDepartment)
    //   this.updateAllocated(this.allocated)
    //   //保存问题到vuex （动态给组件绑定了ref a数组代表每一个组件）
    //   if (!this.$refs.a) return
    //   for (let i = 0; i < this.$refs.a.length; i++) {
    //     this.$refs.a[i].saveToVuex()
    //   }
    // },
    async getDeppartmentList() {
      const organizationId = sessionStorage.getItem('loginOrganizationId')
      const { data: res } = await this.$http.get(
        `api/organization/department-id?organizationId=${organizationId}`
      )
      //判断是否请求成功
      if (res.code != '00000') return this.$message.error('部门' + res.message)
      this.departmentCount = res.data.departmentList.length
      this.departmentList = res.data.departmentList
    },
    changeAllocated() {
      // console.log(this.allocated);
      this.updateAllocated(this.allocated)
    },
    changeMaxDepartment() {
      this.updateMaxDepartment(this.maxDepartment)
    }
  },
  watch: {
    // 查看用户是否设置过问题
    allQues(newV) {
      if (newV.allocated) {
        this.allocated = newV.allocated
        this.updateAllocated(newV.allocated)
      }
      if (newV.maxDepartment) {
        this.maxDepartment = newV.maxDepartment
        this.updateMaxDepartment(newV.maxDepartment)
      }
      if (newV.departmentQuestionsList.length != 0) {
        //如果用户设置过部门问题传递给子组件 子组件是请求完部门后渲染 所以避免子组件在请求之前数据更改检测不到 使用定时器延迟
        setTimeout(() => {
          this.sectionQues = newV.departmentQuestionsList
        }, 500)
      }
    }
  },
  computed: {
    ...mapState('problem', ['isEdit'])
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.sectionPage,true)
  }
}
</script>

<style lang="less" scoped>
.section {
    margin-top: 30px;
  .section-title {
    margin-left: 29px;
    font-size: 26px;
    display: flex;
    color: #989898;
    margin-bottom: 20px;
  }
  .section-content {
    margin-left: 65px;
    .section-content-top {
      display: flex;
      align-items: center;
      .section-content-top-max {
        .section-content-top-max-title {
          padding-right: 5px;
          font-size: 16px;
        }
      }
      .section-content-top-allocated {
        display: flex;
        align-items: center;
        margin-left: 40px;
        font-size: 16px;
      }
    }
    // 部门&&问题展示
    .section-que-content {
      margin-top: 20px;
      .section-que-content-title {
        display: flex;
        font-size: 20px;
        margin-bottom: 20px;
      }
    }
  }
}
input:focus {
  border: 1px solid #535858 !important;
  outline: none;
}
input {
  padding-left: 10px;
}
select:focus {
  outline: none;
}
</style>
