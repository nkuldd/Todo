<template>
  <div>
    <div style="marigin:50px;text-align:center">
      <span style="color:#409EFF;font-size:5Vh">TodoList</span>
    </div>
    <div class="c_margin">
      <el-input v-model="todoitem" class="class_input" placeholder="请添加内容">
        <el-button type="primary" @click="ItemAppend" slot="append">添加</el-button>
      </el-input>
      <el-button type="primary" @click="ItemSearch" >查询</el-button>
      <el-button type="info" @click="ItemSearchClear" >清空查询</el-button>
    </div>  
    <div class="c_margin">
      <span style="margin-right:20px">所有事项： {{list.length}}</span>
      <span style="margin-right:20px">已完成事项： {{done}}</span>
      <span>待做事项： {{undone}}</span>
    </div>
    <div v-if="list.length>0" class="c_margin">
      <el-table
        max-height="400"
        border
        :data="list"
        style="width: 60%">
        <el-table-column
          prop="status"
          label="当前状态"
          width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @change="statusChange(scope.row)"
                >
              </el-switch>
            </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="事项">
            <template slot-scope="scope">
              <span>{{scope.row.content}}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="todoitem"
          label="删除事项">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="danger"
                @click="ItemDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="searchList.length>0" class="c_margin">
      <span style="margin-bottom:20px">查询结果</span>
      <el-table
        max-height="400"
        border
        :data="searchList"
        style="width: 60%">
        <el-table-column
          prop="status"
          label="当前状态"
          width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @change="statusChange(scope.row)"
                >
              </el-switch>
            </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="事项">
            <template slot-scope="scope">
              <span>{{scope.row.content}}</span>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="c_margin" v-if="searchItem">查询事项不存在！</div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      todoitem:'',
      list:[],
      done:0,
      undone:0,
      searchList:[],
      searchItem:'',
    }
  },
  created () {
    this.fetchContent();
  },
  methods:{
    //获取列表
    async fetchContent(){
      let res = await this.$ajax.get('/api/todo/getList');
      if(res.data.code == 1){
        console.log('获取数据失败')
      }else{
        this.list = res.data.result;
      } 
      console.log(this.list)
      for(let item of this.list){
        if(item.status){
          this.done+=1;
        }else{
          this.undone+=1
        }
      }
    },
    //添加事项
    async ItemAppend(){      
      let obj = {};
      obj.status = false;
      obj.content = this.todoitem;
      let res =await this.$ajax.post('/api/todo/create',obj);
      if(res.code == '1'){
        console.log('添加失败')
      }else{
        let newitem = res.data.result;
        this.list.push(newitem);
        this.undone+=1;
        this.todoitem='';
      }
      this.ItemSearchClear();
    },
    //查找事项
    ItemSearch(){
      this.searchItem='';
      this.searchList=[];
      for(let item of this.list){
        if(item.content.search(this.todoitem)!=-1){
          this.searchList.push(item)
        }
      };
      if(this.searchList.length==0){
        this.searchItem = true;
      }
      this.todoitem=''
    },
    //状态更改
    async statusChange(item){
      let res = await this.$ajax.post('/api/todo/edit',item);
      if(res.code == '1'){
        console.log(res.msg)
      }else{
        if(item.status){
          this.undone-=1
          this.done+=1
        }else{
          this.undone+=1;
          this.done-=1;
        }
        //this.ItemSearchClear();
      }      
    },
    //删除事项
    async ItemDelete(index,item){
      let res = await this.$ajax.post('/api/todo/delete',item);
      if(res.code == '1'){
        console.log(res.msg)
      }else{
        this.list.splice(index,1);
        console.log(this.list)
        if(item.status){
          this.done-=1;
        }else{
          this.undone-=1
        }
      }      
    },
    //清空搜索栏
    ItemSearchClear(){
      this.searchList=[];
      this.todoitem='';
      this.searchItem='';
    },
  }
}
</script>
<style scoped>
.class_input{
  margin-top: 20px;
  width: 40%
}
.c_margin{
  margin-left:10%;
  margin-top:20px
}
</style>
