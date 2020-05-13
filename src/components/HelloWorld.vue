<template>
  <div class="hello">
    <el-header class="homeHeader">
      <div class="title">Lch</div>
    </el-header>
    <el-row :gutter="10">
      <el-col :xs="4" :sm="4" :md="4" :lg="4">
        <div>
          <el-menu  class="el-menu-vertical-demo" style="min-height:900px" @select="handleSelect">
            <el-menu-item index="1"><i class="fa fa-chrome"></i>网址浏览</el-menu-item>
            <el-menu-item index="2"><i class="fa fa-th-list"></i>网址管理</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :xs="20" :sm="20" :md="20" :lg="20">
        <div style="margin-top:10px">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        searchCriteria: '',
      }
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

</style>
