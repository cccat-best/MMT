<template>
  <div class="section">
    <div class="section-title">部门问题</div>
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
          ></el-input-number>
        </div>
        <!-- 是否允许调剂 -->
        <div class="section-content-top-allocated">
          <el-checkbox v-model="allocated" v-if="departmentCount >= 2"
            >允许调剂</el-checkbox
          >
        </div>
      </div>
      <!-- 部门&&问题展示 -->
      <div class="section-que-content" v-for="(item,i) in departmentList" :key="'d'+i">
        <!-- 部门名称 -->
        <div class="section-que-content-title">部门：{{item.departmentName}}</div>
        <!-- 问题展示区&&添加区 -->
        <addQues :departmentId="item.departmentId" ref="a"></addQues>
      </div>
    </div>
  </div>
</template>

<script>
import addQues from './addQues.vue'
import  {mapMutations} from 'vuex'
export default {
  components:{addQues},
  data() {
    return {
      //最多可报名部门数
      maxDepartment: 1,
      //是否调剂
      allocated: false,
      departmentList: [
        { departmentId: 1, departmentName: '设计部' },
        { departmentId: 2, departmentName: '产品部' },
        { departmentId: 3, departmentName: '问题部' }
      ],
      //如果部门数为1不显示调剂按钮
      departmentCount: 0,
    }
  },
  mounted() {
    //测试是否显示调剂
    this.departmentCount = this.departmentList.length
  },
  methods: {
    ...mapMutations('problem',['updateMaxDepartment','updateAllocated']),
    packgeSectionQue() {
      this.updateMaxDepartment(this.maxDepartment)
      this.updateAllocated(this.allocated)
      //保存问题到vuex
      for(let i =0 ;i<this.$refs.a.length;i++) {
        this.$refs.a[i].saveToVuex()
      }
      //  console.log(6);
    }
  },

}
</script>

<style lang="less" scoped>
.section {
  overflow: hidden;
  .section-title {
    font-size: 30px;
    display: flex;
    color: #828282;
    margin-bottom: 15px;
  }
  .section-content {
    margin-left: 25px;
    .section-content-top {
      display: flex;
      align-items: center;
      .section-content-top-max {
        .section-content-top-max-title {
          padding-right: 5px;
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
      margin-top: 10px;
      .section-que-content-title {
        display: flex;
        font-size: 20px;
      }

    }
  }
}
</style>
