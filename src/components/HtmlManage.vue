<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-plus" @click="showAddLchView" size="mini">
        添加
      </el-button>
      <el-upload
        :on-success="onSuccess"
        style="display: inline-flex;margin-right: 8px"
        action="/lch/import">
        <el-button type="success" icon="el-icon-upload2" size="mini">
          导入数据
        </el-button>
      </el-upload>
      <el-button type="warning" icon="el-icon-delete" size="mini" @click="delBulk"
                 :disabled="batchDeleteArr.length===0">批量删除
      </el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delAll">全部删除</el-button>

      <el-input
        placeholder="输入关键字查询"
        clearable
        @clear="initHtmls"
        style="width: 350px;margin-right: 10px" v-model="keyword"
        @keydown-enter-native="initHtmls"
        size="mini"
      ></el-input>

      <el-button type="primary" icon="el-icon-search" size="mini" @click="initHtmls"> 搜索</el-button>
    </div>
    <div style="margin-top: 10px">
      <el-table
        :data="htmls"
        stripe
        border
        v-loading="loading"
        element-loading-text="正在加载..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="name"
          align="center"
          label="文件名称"
          width="450">
          <template slot-scope="scope">
            <span v-html="scope.row.name" class="title"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="网址"
          align="center"
          width="550">
          <template slot-scope="scope">
            <a :href="scope.row.url" target="_blank" style="text-decoration: none">{{scope.row.url}}</a>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="100"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteHtml(scope.row)" style="padding: 3px" size="mini" type="danger">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;justify-content: flex-end">
        <el-pagination
          background
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="80%">
      <div>
        <el-form :model="lch" ref="empForm">
          <el-row>
            <el-col :span="6">
              <el-form-item label="网站名称:" prop="name">
                <el-input size="mini" style="width: 350px" prefix-icon="el-icon-edit" v-model="lch.name"
                          placeholder="请输入网址名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="网站地址:" prop="name">
                <el-input size="mini" style="width: 450px" prefix-icon="el-icon-edit" v-model="lch.url"
                          placeholder="请输入网站地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddLch">确 定</el-button>
     </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'html',
    data () {
      return {
        htmls: [],
        total: 0,
        page: 1,
        size: 10,
        dialogVisible: false,
        batchDeleteArr: [],
        batchDeleteIds: '',
        title: '',
        loading: false,
        lch: {
          id: '',
          name: '',
          url: ''
        },
        keyword:''
      }
    },
    mounted () {
      this.initHtmls()
    },
    methods: {
      showAddLchView () {
        this.title = '添加网址'
        this.dialogVisible = true
      },
      doAddLch () {
        this.postRequest('/lch/', this.lch).then(resp => {
          this.dialogVisible = false
        })
      },
      sizeChange (currentSize) {
        this.size = currentSize
        this.initHtmls()
      },
      currentChange (currentPage) {
        this.page = currentPage
        this.initHtmls()
      },
      initHtmls () {
        let url = '/lch/page?page=' + this.page + '&size=' + this.size;
        if(this.keyword){
          url+="&name="+this.keyword;
        }
        this.getRequest(url).then(resp => {
          this.htmls = resp.data.data
          this.total = resp.data.total
        })
      },
      onSuccess () {
        this.initHtmls()
      },
      deleteHtml (data) {
        this.batchDeleteIds=data.id;
        this.delBulk();
      },
      delBulk () {
        this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/lch/delBatch?Ids='+this.batchDeleteIds).then(resp => {
            if (resp) {
              this.initHtmls();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      delAll () {
        this.$confirm('此操作将删除全部数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/lch/delAll').then(resp => {
            if (resp) {
              this.initHtmls();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleSelectionChange (val) {
        this.batchDeleteArr = val
        for (let i = 0; i < this.batchDeleteArr.length; i++) {
          if (this.batchDeleteArr.length===1){
            this.batchDeleteIds = this.batchDeleteArr[i].id;
          } else {
            if (i === 0) {
              this.batchDeleteIds = this.batchDeleteArr[i].id+",";
            } else if (i === this.batchDeleteArr.length - 1) {
              this.batchDeleteIds += this.batchDeleteArr[i].id;
            } else {
              this.batchDeleteIds += this.batchDeleteArr[i].id + ',';
            }
          }
        }
      }
    }
  }
</script>

<style>
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }
  .title em{
    font-style: normal;
    color:red;
  }
</style>
