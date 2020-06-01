<template>
  <div class="hello">
    <el-container>
      <el-header class="homeHeader">
        <div class="title">Lch</div>
        <div>
          <el-dropdown>
          <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided>注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px;">
          <el-menu class="el-menu-vertical-demo" style="min-height:900px" @select="handleSelect">
            <el-menu-item index="1"><i class="fa fa-chrome"></i>网址浏览</el-menu-item>
            <el-menu-item index="2"><i class="fa fa-th-list"></i>网址管理</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!=='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path==='/home'">
            欢迎来到Lch系统
          </div>
          <router-view class="homeRouterView"/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {}
    },
    methods: {
      handleSelect (key, keyPath) {
        switch (key) {
          case '1':
            this.$router.push('/home')
            break
          case '2':
            this.$router.push('/htmlManage')
            break
        }
      },

    },
  }
</script>

<style>
  .homeHeader {
    background-color: #409eff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    box-sizing: border-box;
  }

  .homeHeader .title {
    font-size: 30px;
    font-family: 华文行楷;
    color: #ffffff
  }
  .homeWelcome {
    text-align: center;
    font-size: 30px;
    font-family: 华文行楷;
    color: #409eff;
    padding-top: 50px;
  }
</style>
