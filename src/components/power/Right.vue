<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-25 20:48:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-25 21:28:24
 * @LastEditors: Harry
-->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsLists" stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level - 0 + 1 == 1" type="">{{
              scope.row.level - 0 + 1 + "级"
            }}</el-tag>
            <el-tag v-else-if="scope.row.level - 0 + 1 == 2" type="success">{{
              scope.row.level - 0 + 1 + "级"
            }}</el-tag>
            <el-tag v-else type="warning">{{
              scope.row.level - 0 + 1 + "级"
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Rights',
  data() {
    return {
      rightsLists: []
    }
  },
  created() {
    this.getRightsLists()
  },
  methods: {
    async getRightsLists() {
      const type = 'list'
      const { data: res } = await this.$http.get(`rights/${type}`)
      if (res.meta.status === 200) {
        this.rightsLists = res.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
