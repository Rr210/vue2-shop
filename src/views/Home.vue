<template>
  <div>
    <el-container class="container-ht">
      <el-header class="header-container">
        <div class="logo-w">
          <img src="../assets/logo.png" alt="" srcset="" />
          电商管理系统
        </div>
        <el-button class="btn-w" type="info" @click="layout"> 退出 </el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapsed ? '64px' : '200px'" class="aside-con">
          <div class="isCollapsed" @click="isCollapsed = !isCollapsed">
            {{ isCollapsed ? "&gt;" : "&lt;" }}
          </div>
          <el-menu
            :default-active="ispathActive"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapsed"
            :collapse-transition="false"
            router
          >
            <el-submenu
              :index="item.id + ''"
              v-for="(item, index) in menuLists"
              :key="item.id"
            >
              <template slot="title">
                <i :class="iconClass[index] && iconClass[index]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item
                :index="item1.path"
                v-for="item1 in item.children"
                :key="item1.id"
                @click="pathActive(item1.path)"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ item1.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main-con">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      menuLists: [],
      iconClass: [
        'el-icon-user',
        'el-icon-s-check',
        'el-icon-s-shop',
        'el-icon-document',
        'el-icon-s-marketing'
      ],
      isCollapsed: false,
      ispathActive: ''
    }
  },
  components: {},
  created() {
    this.getMenuList()
    this.getPathActive()
  },
  methods: {
    layout() {
      sessionStorage.clear()
      this.$router.replace('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('/menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuLists = res.data
      // console.log(res)
    },
    pathActive(path) {
      sessionStorage.setItem('ispathActive', path)
      this.ispathActive = path
    },
    getPathActive() {
      const ispathActive = sessionStorage.getItem('ispathActive')
      if (ispathActive) {
        this.ispathActive = ispathActive
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.aside-con {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
  .isCollapsed {
    text-align: center;
    line-height: 24px;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    background-color: #4a5064;
    cursor: pointer;
  }
}
.main-con {
  background-color: rgb(234, 237, 241);
}
.container-ht {
  height: 100vh;
}
.logo-w {
  width: 200px;
  height: 100%;
  text-align: left;
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  line-height: 60px;
  img {
    flex: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
