export default {
  namespaced: true,
  state: () => ({
    time: [],
    generalQuestions: [],
    questionsList: [],
    departmentQuestionsList: [],
    maxDepartment: 1,
    allocated: false,
    //是否是编辑模式
    isEdit: false
  }),
  mutations: {
    //更新允许报名时间
    updateTime(state, timer) {
      state.time = timer
    },
    //更新预设问题
    updateGeneralQuestions(state, que) {
      state.generalQuestions = que
    },
    //更新基本问题的自定义问题
    updateQuestionsList(state, que) {
      state.questionsList = que
    },
    //更新部门问题
    updateDepartmentQuestionsList(state, ques) {
      //避免重复添加
      const findRusult = state.departmentQuestionsList.find((item) => {
        return (
          item.departmentId == ques.departmentId &&
          item.description == ques.description
        )
      })
      if (!findRusult) {
        state.departmentQuestionsList.push(ques)
      }
    },
    //删除部门问题
    removeDepartmentQuestionsList(state, removeitem) {
      const findRusult = state.departmentQuestionsList.find((item) => {
        return (
          item.departmentId == removeitem.departmentId &&
          item.description == removeitem.description
        )
      })
      if (findRusult) {
        state.departmentQuestionsList = state.departmentQuestionsList.filter(
          (p) => p != findRusult
        )
      }
    },
    //更新最多可报部门数
    updateMaxDepartment(state, item) {
      state.maxDepartment = item
    },
    //更新是否允许调剂
    updateAllocated(state, item) {
      state.allocated = item
    },
    updateIsEdit(state) {
      state.isEdit = !state.isEdit
    }
  },
  getters: {}
}
