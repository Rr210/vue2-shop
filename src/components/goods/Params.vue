<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-11-03 09:24:52
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-03 09:46:57
 * @LastEditors: Harry
-->
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        effect="dark"
        show-icon
      >
      </el-alert>
      <br />
      <el-cascader
        v-model="value"
        :options="options"
        :props="prop"
        @change="handleChange"
      ></el-cascader>
      <br><br>
      <el-tabs type="border-card">
        <el-tab-pane label="动态参数">用户管理</el-tab-pane>
        <el-tab-pane label="静态属性">配置管理</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      value: null,
      prop: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created() {},
  mounted() {
    this.getAllCates()
  },
  methods: {
    handleChange(data) {
      if (data.length < 3) {
        this.value = []
        this.$message.error('请选择三级分类列表')
      }
    },
    // 获取所有的分类列表数据
    async getAllCates() {
      const { data: res } = await this.$http.get('categories')
      console.log(res)
      this.options = res.data
    }
  }
}
</script>
<style lang="less" scoped>
</style>
