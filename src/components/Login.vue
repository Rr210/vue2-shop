<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-22 21:06:10
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-09-23 15:00:12
 * @LastEditors: Harry
-->
<template>
  <div class="login_containter">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        :rules="LoginFormRoles"
        :model="LoginForm"
        label-width="0px"
        class="login_form"
        ref="LoginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="LoginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="LoginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="reset" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HrLogin',
  data() {
    return {
      LoginForm: {
        username: 'admin',
        password: '123456'
      },
      LoginFormRoles: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在3到10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入登录的密码', trigger: 'blurs' },
          {
            min: 6,
            max: 16,
            message: '长度在6到16个字符之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.LoginFormRef.validate(async (valid) => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/login', this.LoginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
    reset() {
      console.log(this)
      this.$refs.LoginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_containter {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: rgb(42, 75, 105);
}
.login_box {
  position: absolute;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.avatar_box {
  width: 130px;
  height: 130px;
  position: absolute;
  left: calc(50% - 65px);
  top: -65px;
  background-color: #fff;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  text-align: right;
}
</style>
