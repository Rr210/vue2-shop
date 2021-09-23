<template>
  <div>
    <el-button type="info" @click="layout">退出</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  methods: {
    layout() {
      sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>
