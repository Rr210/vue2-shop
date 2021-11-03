<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-23 19:00:48
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-02 22:41:44
 * @LastEditors: Harry
-->
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="query"
            clearable
            @clear="clearSearchInput"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="SearchQuery"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            style="font-size: 12px"
            type="primary"
            @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="userLists">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="state">
            <el-switch
              v-model="state.row.mg_state"
              active-color="rgb(64,158,255)"
              inactive-color="#ccc"
              @change="editUserState(state.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editCurrentUser(scope.row.id)"
              circle
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteUser(scope.row.id)"
              circle
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
                circle
                @click="addAssignmentUser(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户列表 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="ruleForm"
        :rules="addForm"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsers('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑用户列表 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editdialogVisible"
      width="50%"
    >
      <el-form
        :model="currentEdit"
        :rules="addForm"
        ref="ruleForms"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户" prop="username">
          <el-input v-model="currentEdit.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="currentEdit.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="currentEdit.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUsermessage('ruleForms')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="添加分配角色"
      :visible.sync="addaVisible"
      width="50%"
      @close="addassginmentClose"
    >
      <el-form
        :model="addAssignments"
        :rules="addForm"
        ref="ruleForma"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-row> 当前用户：{{ addAssignments.username }}</el-row>
        <el-row> 当前角色：{{ addAssignments.role_name }}</el-row>
        <el-form-item label="用户">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addaVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAddAssginment('ruleForma')"
          >确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const { formRules } = require('../../plugin/el-rules.js')
export default {
  name: 'User',
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userLists: [],
      pagenum: 1,
      pagesize: 2,
      query: '',
      total: 0,
      dialogVisible: false,
      // 编辑显示隐藏
      editdialogVisible: false,
      addaVisible: false,
      currentEdit: {},
      addAssignments: {},
      addForm: formRules,
      // 表示删除用户的提示框
      deleVisible: false,
      options: [],
      value: ''
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async updateAddAssginment() {
      if (this.value) {
        const { data: res } = await this.$http.put(
          `users/${this.addAssignments.id}/role`,
          {
            rid: this.value
          }
        )
        if (res.meta.status === 200) {
          this.getUserList()
          this.$message.success(res.meta.msg)
        } else {
          this.$message.error(res.meta.msg)
        }
      }
    },
    addassginmentClose() {
      this.value = ''
      this.options = []
    },
    // 加入分配决策事件
    async addAssignmentUser(row) {
      this.addAssignments = row
      // console.log(row)
      // eslint-disable-next-line camelcase
      const { id, role_name, username } = row
      this.addAssignments = {
        id,
        role_name,
        username
      }
      const { data: res } = await this.$http.get('/roles')
      if (res.meta.status === 200) {
        this.rolesLists = res.data
        this.options = res.data
        this.$message.success(res.meta.msg)
      }
      this.addaVisible = !this.addaVisible
    },
    // 删除当前的用户
    deleteUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(`users/${id}`)
          if (res.meta.status === 200) {
            this.$message.success(res.meta.msg)
            this.getUserList()
          } else {
            this.$message.error(res.meta.msg)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 更改用户的信息
    async updateUsermessage(ref) {
      this.editdialogVisible = !this.editdialogVisible
      // this.$refs[ref].validate(async (valid) => {
      //   console.log(valid)
      //   if (valid) {
      const { data: res } = await this.$http.put(
        `users/${this.currentEdit.id}`,
        {
          email: this.currentEdit.email,
          mobile: this.currentEdit.mobile
        }
      )
      if (res.meta.status === 200) {
        this.getUserList()
        this.$message.success(res.meta.msg)
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    // 根据id的信息查询当前点击的用户的详细情况
    async queryUser(id) {
      const { data: res } = await this.$http.get(`users/${id}`)
      if (res.meta.status === 200) {
        this.currentEdit = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    // 编辑当前的用户
    editCurrentUser(id) {
      this.queryUser(id)
      this.editdialogVisible = !this.editdialogVisible
    },
    clearSearchInput() {
      this.getUserList()
    },
    // 添加新的用户
    addUsers(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post('/users', this.ruleForm)
          this.dialogVisible = false
          if (res.meta.status === 201) {
            this.$refs.ruleForm.resetFields()
            return this.$message.success('添加成功')
          }
          return this.$message.error('添加失败')
        } else {
          this.$message.error('添加失败，请仔细填写')
          return false
        }
      })
    },
    async getUserList() {
      const params = {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      }
      const { data: res } = await this.$http.get('/users', { params })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.userLists = res.data.users
      this.total = res.data.total
    },
    handleSizeChange(name) {
      this.pagesize = name
      this.getUserList()
    },
    handleCurrentChange(newname) {
      this.pagenum = newname
      this.getUserList()
    },
    // 对用户的状态进行请求更新
    async editUserState(e) {
      // console.log(e)
      // 进行数据的请求
      const { data: res } = await this.$http.put(
        `users/${e.id}/state/${e.mg_state}`
      )
      // console.log(res)
      if (res.meta.status !== 200) {
        e.mg_state = !e.mg_state
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    },
    SearchQuery() {
      this.getUserList()
    },
    async getRolesLists() {
      const { data: res } = await this.$http.get('/roles')
      if (res.meta.status === 200) {
        this.rolesLists = res.data
        this.$message.success(res.meta.msg)
        return res.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
