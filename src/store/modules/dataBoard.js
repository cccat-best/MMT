export default {
  namespaced: true,
  state: () => ({
    // 筛选选项
    classNameFilter: [
      { text: '计算机1班 ' + '--' + 352 + '人', value: '计算机1班' },
      { text: '计算机2班 ' + '--' + 322 + '人', value: '计算机2班' }
    ], // 班级筛选项
    organizationOrderFilter: [
      { text: '第一志愿 ' + '--' + 152 + '人', value: '第一志愿' },
      { text: '第二志愿 ' + '--' + 267 + '人', value: '第二志愿' }
    ], // 社团志愿次序筛选项
    departmentOrderFilter: [
      { text: '第一志愿 ' + '--' + 102 + '人', value: '第一志愿' },
      { text: '第二志愿 ' + '--' + +57 + '人', value: '第二志愿' }
    ], // 部门志愿次序筛选项
    wishDepartmentFilter: [
      { text: '产品组 ' + '--' + 2 + '人', value: '产品组' },
      { text: '安全组 ' + '--' + 5 + '人', value: '安全组' }
    ], // 当前志愿部门筛选项
    interviewStatusFilter: [
      { text: '一面进行中 ' + '--' + 2 + '人', value: '一面进行中' },
      { text: '二面进行中 ' + '--' + 5 + '人', value: '二面进行中' }
    ], // 当前志愿状态筛选项
    nextPlaceFilter: [
      { text: '7-111 ' + '--' + 2 + '人', value: '7-111' },
      { text: '7-112 ' + '--' + 5 + '人', value: '7-112' }
    ], // 下一场面试地点筛选项
    nextTimeFilter: [
      { text: '8/29 15:10 ' + '--' + 2 + '人', value: '8/29 15:10' },
      { text: '8/29 15:20 ' + '--' + 5 + '人', value: '8/29 15:20' }
    ] // 下一次面试时间筛选项
  }),
  mutations: {
    //更新筛选项
    //班级
    updateClassNameFilter(state, data) {
      let newData = data.map((item) => {
        return {
          text: item.className + ' ' + '--' + item.number + '人',
          value: item.className
        }
      })
      state.classNameFilter = newData
    },
    //社团志愿次序
    updateOrganizationOrderFilter(state, data) {
      let newData = data.map((item) => {
        return {
          text: item.organizationOrder + ' ' + '--' + item.number + '人',
          value: item.organizationOrder
        }
      })
      state.organizationOrderFilter = newData
    },
    //部门志愿次序
    updateDepartmentOrderFilter(state, data) {
      let newData = data.map((item) => {
        return {
          text: item.departmentOrder + ' ' + '--' + item.number + '人',
          value: item.departmentOrder
        }
      })
      state.departmentOrderFilter = newData
    },

    // 当前志愿部门
    updateWishDepartmentFilter(state, data) {
      let newData = data.map((item) => {
        return {
          text: item.wishDepartment + ' ' + '--' + item.number + '人',
          value: item.wishDepartment
        }
      })
      state.wishDepartmentFilter = newData
    },
    //当前志愿状态
    updateInterviewStatusFilter(state, data) {
      let newData = data.map((item) => {
        return {
          text: item.interviewStatus + ' ' + '--' + item.number + '人',
          value: item.interviewStatus
        }
      })
      state.interviewStatusFilter = newData
    },
    //下一场面试地点
    updateNextPlaceFilter(state, data) {
      let newData = data.map((item) => {
        return {
          text: item.nextPlace + ' ' + '--' + item.number + '人',
          value: item.nextPlace
        }
      })
      state.nextPlaceFilter = newData
    },
    //下一次面试时间
    updateNextTimeFilter(state, data) {
      let newData = data.map((item) => {
        return {
          text: item.nextTime + ' ' + '--' + item.number + '人',
          value: item.nextTime
        }
      })
      state.nextTimeFilter = newData
    }
  },
  getters: {}
}
