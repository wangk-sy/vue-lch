<template>
  <div class="right">
    <div>
      <el-button icon="el-icon-right" type="success" @click="nextUrl" size="mini">下一个</el-button>
      <el-select v-model="lch.typeId" placeholder="请选择" size="mini" @change="changeUrl(lch.typeId)">
        <el-option
          v-for="item in types"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <iframe :src="currentPage.path" :style="{height: (boxHeight)+'px'}"
            frameborder="0"
            id="rightBox"
            name="rightBox"
            scrolling="true"
            width="100%">
    </iframe>

  </div>
</template>

<script>
  export default {
    name: 'EmpAdv',
    data() {
      return {
        pageId: "pageId",
        boxHeight: 0,
        //网址类型
        types:[],
        //菜单列表
        urls: [],
        index:0,
        //当前被点中的菜单对应的页面
        currentPage: {
          id: 0,
          name: "后台首页",
          path: "http://sthj.shandong.gov.cn/zwgk/spq/202004/t20200414_3072730.html"
        },
        title: '',
        dialogVisible: false,
        lch: {
          id:"",
          name: "2020年4月10日建设项目环评文件受理公示",
          url: "http://sthj.shandong.gov.cn/zwgk/spq/202004/t20200414_3072730.html",
          typeId:""
        }
      }
    },
    created() {
      this.initType();
      this.init();
    },
    methods: {
      init() {
        this.getRequest("/lch/getUrlByTypeId?typeId="+this.lch.typeId).then(resp=>{
          let data=resp.data;
          this.urls=data;
          this.currentPage.path =data[0].url;
        });

        //计算并获得右侧页面高度
        this.getBoxHeight();
      },
      initType(){
        this.getRequest("/lch/getType").then(resp=>{
          this.types = resp.data;
        })
      },
      getBoxHeight() {
        let clientHeight = document.documentElement.clientHeight;
        this.boxHeight = clientHeight - 60;
      },

      nextUrl(){
        this.index++;
        this.currentPage.path=this.urls[this.index].url;
      },
      changeUrl(type){
        this.init();
      }
    }
  }
</script>

<style scoped>
  .right {
    width: 100%;
    padding: 5px 20px 0px 20px;
    background-color: #f9f9f9;
  }

  .right_nav {
    background-repeat: no-repeat;
    background-size: contain;
    font-weight: bold;
    margin-left: 8px;
    padding-left: 30px;
  }
</style>
