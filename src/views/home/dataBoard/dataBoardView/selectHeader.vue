<template>
  <div>
    <el-popover
      v-model="visible"
      :ref="'popover' + myLabel"
      placement="bottom-end"
      width="100px"
      trigger="click"
    >
      <el-checkbox-group v-model="filterResVal">
        <div v-for="(item, index) in filterCondition" :key="index">
          <el-checkbox :label="Object.values(item)[0]"></el-checkbox>
          <span style="margin: 30px">{{ item.number }}</span>
        </div>
      </el-checkbox-group>
      <div class="el-table-filter__bottom">
        <button @click="filterTableData">筛选</button>
        <button @click="visible = false">取消</button>
      </div>
      <template slot="reference">
        <!-- 标题名 -->
        {{ myLabel }}
        <!-- 筛选的icon -->
        <svg
          t="1659452654866"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3285"
          width="20"
          height="20"
        >
          <path
            d="M70.36750609 95.8406077l346.25646235 345.36786577-0.5923977 356.91962118 191.93685852 130.32749653v-485.76612344l346.2564624-346.84886004H70.36750609z m463.55120925 316.34037792v376.46874564l-43.54123178-29.61988557 0.29619885-243.77165828v-104.55819608l-74.04971397-73.75351507-167.35235349-167.05615466H775.61698162l-167.64855236 167.94475123-74.04971392 74.34591279z"
            p-id="3286"
          ></path>
        </svg>
      </template>
    </el-popover>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'mySelectHeader',
  props: ['filterCondition', 'myLabel'],
  //filterCondition为筛选的条件从父组件传过来
  // myLabel为表头名，因为筛选icon只能写在solt里，干脆一起写这
  computed: {
    // ...mapState('dataBoard',['organizationOrderLabel'])
  },
  data() {
    return {
      visible: false, //控制隐藏过滤弹窗
      filterResVal: [], //存储选项值
      filterResKey: [] //存储筛选值的key值，用于调接口时传参
    }
  },
  methods: {
    // my(){
    //   this.filterResKey = [];   //每次筛选重置筛选选项值
    // this.filterCondition.forEach(item => {
    // 	if(this.filterResVal.length) {
    // 		this.filterResVal.forEach(items => {
    // 			if(item === items.label) {
    // 				this.filterResKey.push(item.key);
    // 			}
    // 		})
    // 	}
    // });
    // let value= '';
    // if(this.filterResKey.length) {
    // 	value = this.filterResKey.join(',');
    // }
    // this.isShowFilter = false;
    // this.$emit('filteredData',value);  //将选项值转为字符串传给父组件
    // }
  }
}
</script>

<style lang="less" scoped>
.icon {
  fill: currentColor;
  color: aqua;
  position: absolute;
  top: 1px;
}
</style>
