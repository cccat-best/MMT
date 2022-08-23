<template>
  <div class="interviewMain"></div>
</template>

<script>
export default {
  methods: {
    getStatus() {
      this.$http
        .get('/api/interview-data/time/getAdmissionStatus', {
          admissionId: 1
        })
        .then((res) => {
          if (res.data.data.admissionStatus === '面试前') {
            this.$router.push('interviewBefore')
          }
          if (res.data.data.admissionStatus === '面试中') {
            this.$router.push('interviewing')
          }
          if (res.data.data.admissionStatus === '面试后') {
            this.$router.push('interviewAfter')
          }
        })
    },
    changeStatus(status) {
      this.$http.post('/api/interview-data/time/putAdmissionStatus', {
        admissionId: 1,
        save: '123',
        code: status
      })
    }
  },
  mounted() {
    this.getStatus()
    //debug
    this.changeStatus(3)
  }
}
</script>
