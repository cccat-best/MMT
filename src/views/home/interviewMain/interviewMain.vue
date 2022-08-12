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
          if (res.data.data.admissionStatus === '面试中') {
            this.$router.push('/home/interviewing')
          }
          if (res.data.data.admissionStatus === '面试中') {
            this.$router.push('/home/interviewing')
          }
          if (res.data.data.admissionStatus === '面试中') {
            this.$router.push('/home/interviewing')
          }
        })
    }
  },
  mounted() {
    this.getStatus()
  }
}
</script>
