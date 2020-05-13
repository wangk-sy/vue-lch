<template>
  <div id="login">
    <div id="loginBox">
      <h4>欢迎登录Lch后台管理系统</h4>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
      >
        <el-form-item
          label=""
          prop="username"
          style="margin-top:40px;"
        >
          <el-row>
            <el-col :span='2'>
              <span class="fa fa-user-circle-o"></span>
            </el-col>
            <el-col :span='22'>
              <el-input
                class="inps"
                placeholder='用户名'
                v-model="loginForm.username"
                value="admin"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label=""
          prop="password"
        >
          <el-row>
            <el-col :span='2'>
              <span class="fa fa-lock"></span>
            </el-col>
            <el-col :span='22'>
              <el-input
                type="password"
                class="inps"
                placeholder='密码'
                v-model="loginForm.password"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span='2'>
            <span class="fa fa-barcode"></span>
          </el-col>
          <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off"
                    placeholder="点击图片更换验证码" @keydown.enter.native="submitForm" style="width: 200px"></el-input>
          <img :src="vcUrl" @click="updateVerifyCode" alt="" style="cursor: pointer;vertical-align: middle;border-radius: 4px;">
        </el-form-item>
        <el-form-item style="margin-top:55px;margin-left:23%;">
          <el-button
            type="primary"
            round
            class="submitBtn"
            @click="submitForm"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        vcUrl: '/verifyCode?time='+new Date(),
        loginForm: {
          username: "admin",
          password: "123456"
        },
        loginRules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" }
          ],
          password: [{ required: true, message: "请输入密码", trigger: "blur" }],
          code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
        }
      };
    },
    methods: {
      updateVerifyCode() {
        this.vcUrl = '/verifyCode?time='+new Date();
      },
      //提交登录
      submitForm() {
          this.$refs.loginForm.validate((valid)=>{
              if(valid){
                  this.postRequest("/login",this.loginForm).then((resp)=>{
                   console.log(resp);
                  })
              }
          })
      },
    },
    mounted() {
      document.querySelector('body').setAttribute('style','margin:0')
    }
  };
</script>

<style>
  #login {
    width: 100vw;
    padding: 0;
    margin: 0;
    height: 100vh;
    font-size: 16px;
    background-repeat: no-repeat;
    background-position: left top;
    background-color: #242645;
    color: #fff;
    font-family: "Source Sans Pro";
    background-size: 100%;
    background-image: url("../assets/star.jpg");
    position: relative;
  }
    #loginBox {
      width: 340px;
      height: 320px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      padding: 50px 40px 40px 40px;
      box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
      opacity: 1;
      background: linear-gradient(
        230deg,
        rgba(53, 57, 74, 0) 0%,
        rgb(0, 0, 0) 100%
      );
    }
      /deep/ .inps input {
        border: none;
        color: #fff;
        background-color: transparent;
        font-size: 12px;
      }
      .submitBtn {
        background-color: transparent;
        color: #39f;
        width: 200px;
      }
</style>
