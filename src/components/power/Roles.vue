<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-25 21:34:13
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-27 11:45:10
 * @LastEditors: Harry
-->
<template>
  <div>
    <!-- 顶部的添加权限的事件 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogVisible1 = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>

      <el-table :data="rolesLists">
        <el-table-column type="expand" label="">
          <template slot-scope="scope">
            <el-row
              :class="[index !== 0 ? 'tbtop' : '']"
              v-for="(item, index) in scope.row.children"
              :key="item.id"
            >
              <el-col :span="5">
                <el-tag
                  @close="removeRightById(scope.row, item.id)"
                  effect="dark"
                  closable
                  >{{ item.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  v-for="(item1, index1) in item.children"
                  :key="item1.id"
                  :class="[index1 !== 0 ? 'tbtop' : '']"
                >
                  <el-col :span="6">
                    <el-tag
                      @close="removeRightById(scope.row, item1.id)"
                      effect="dark"
                      closable
                      type="success"
                      >{{ item1.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="item2 in item1.children"
                      :key="item2.id"
                      effect="dark"
                      @close="removeRightById(scope.row, item2.id)"
                      closable
                      type="warning"
                      >{{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" prop="">
          <template slot-scope="scope">
            <el-row>
              <el-button
                type="primary"
                size="mini"
                @click="updateRoles(scope.row)"
              >
                <i class="el-icon-edit"></i>编辑
              </el-button>
              <el-button
                type="warning"
                size="mini"
                @click="deleteRoles(scope.row.id)"
              >
                <i class="el-icon-delete"></i>删除
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="getTreeLists(scope.row)"
              >
                <i class="el-icon-s-tools"></i>分配权限
              </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户列表 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible1"
      width="50%"
      @close="dialogClose"
    >
      <el-form
        :model="ruleForm1"
        :rules="addForms"
        ref="ruleForm1"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.trim="ruleForm1.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model.trim="ruleForm1.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addUsers('ruleForm1')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 更新用户的信息 -->
    <!-- 添加用户列表 -->
    <el-dialog
      title="更新角色信息"
      :visible.sync="updateDialogVisible"
      width="50%"
    >
      <el-form
        :model="ruleForm2"
        :rules="addForms"
        ref="ruleForm3"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.trim="ruleForm2.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model.trim="ruleForm2.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="1">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 树形 -->
    <el-dialog
      title="分配权限"
      :visible.sync="rightVisible"
      width="50%"
      @close="rightDialogClosed"
    >
      <el-tree
        :data="treeList"
        show-checkbox
        default-expand-all
        :props="defaultProps"
        node-key="id"
        :default-checked-keys="defaultSelected"
        @node-click="handleNodeClick"
        ref="treechecked"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightVisible = false">取 消</el-button>
        <el-button type="primary" @click="getListSelected">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  data() {
    return {
      rolesLists: [],
      ruleForm1: {
        roleName: '',
        roleDesc: ''
      },
      ruleForm2: {
        roleName: '',
        roleDesc: ''
      },
      dialogVisible1: false,
      rightVisible: false,
      updateDialogVisible: false,
      currentRolesId: '',
      addForms: {
        roleName: [
          { required: true, message: '请填写角色信息', trigger: 'blur' },
          {
            min: 3,
            max: 8,
            message: '请填写3-8个字符',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          { required: true, message: '请填写角色信息', trigger: 'blur' },
          {
            min: 3,
            max: 8,
            message: '请填写3-8个字符',
            trigger: 'blur'
          }
        ]
      },
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      defaultSelected: []
    }
  },
  created() {
    this.getRolesLists()
  },
  methods: {
    // 获取角色信息列表
    async getRolesLists() {
      const { data: res } = await this.$http.get('/roles')
      if (res.meta.status === 200) {
        this.rolesLists = res.data
        this.$message.success(res.meta.msg)
        console.log(res)
      }
    },
    // 加入新的角色信息
    addUsers(role) {
      this.$refs[role].validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post('/roles', {
            roleName: this.ruleForm1.roleName,
            roleDesc: this.ruleForm1.roleDesc
          })
          console.log(res)
          if (res.meta.status === 201) {
            this.dialogVisible1 = false
            this.$message.success(res.meta.msg)
            this.getRolesLists()
          } else {
            this.$message.error(res.meta.msg)
          }
        }
      })
    },
    dialogClose() {
      this.$refs.ruleForm1.resetFields()
    },
    // 删除角色信息
    deleteRoles(id) {
      if (id) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$http.delete(`/roles/${id}`).then(() => this.getRolesLists())
            this.$message({
              type: 'info',
              message: '删除成功!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 删除单个权限的
    async removeRightById(rolesId, cid) {
      console.log(rolesId, cid)
      const rolesResult = await this.$confirm(
        '此操作将永久删除指定的角色权限, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (rolesResult === 'confirm') {
        const { data: res } = await this.$http.delete(
          `roles/${rolesId.id}/rights/${cid}`
        )
        if (res.meta.status === 200) {
          rolesId.children = res.data
          this.$message.success(res.meta.msg)
        }
      }
    },
    // 获取全部的树形数据
    async getTreeLists(e) {
      const { data: res } = await this.$http.get('rights/tree')
      this.currentRolesId = e.id
      if (res.meta.status === 200) {
        this.treeList = res.data
        this.getDefaultId(e, this.defaultSelected)
        this.rightVisible = !this.rightVisible
      }
    },
    rightDialogClosed() {
      this.defaultSelected = []
      this.getRolesLists()
    },
    // 编辑角色的权限信息
    async updateRoles(row) {
      // console.log(row.id)
      if (row) {
        const { data: res } = await this.$http.get(`roles/${row.id}`)
        console.log(res)
        if (res.meta.staus === 200) {
          this.ruleForm2 = res.data
        }
        this.updateDialogVisible = !this.updateDialogVisible
      }
    },
    // 通过递归来进行判断是否存在数组种
    getDefaultId(node, arr) {
      if (!node.children) {
        return this.defaultSelected.push(node.id)
      }
      node.children.forEach((item) => {
        this.getDefaultId(item, arr)
      })
    },
    async getListSelected() {
      console.log(this.$refs.treechecked)
      const list1 = [
        ...this.$refs.treechecked.getCheckedKeys(),
        ...this.$refs.treechecked.getHalfCheckedKeys()
      ]
      const { data: res } = await this.$http.post(
        `roles/${this.currentRolesId}/rights`,
        {
          rids: list1.join(',')
        }
      )
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
      } else {
        this.$message.error(res.meta.msg)
      }
      this.rightVisible = false
    },
    handleNodeClick() {}
  }
}
</script>
<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.el-row {
  display: flex;
  align-items: center;
}
.tbtop {
  border-top: 1px solid #ebeef5;
}
</style>
