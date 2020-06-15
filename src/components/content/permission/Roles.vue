<template>
  <div>
    <breadcrumb :breadPath="breadPath"></breadcrumb>

    <el-card>
      <el-table :data="rolesInfo" border stripe highlight-current-row>
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row v-for="(itemx,index) in scope.row.children" :key="index" :class="['bdbotm',index === 0 ? 'bdtop':'','vcenter']">
              <el-col :span="5">
                <el-tag closable @close="removeRightsById(scope.row,itemx.id)">{{itemx.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(itemy,indey) in itemx.children" :key="indey" :class="[indey === 0 ? '':'bdtop','vcenter']">
                  <el-col :span="8">
                    <el-tag type="success" closable @close="removeRightsById(scope.row,itemy.id)">{{itemy.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag v-for="(itemz,indez) in itemy.children" :key="indez" type="warning" closable @close="removeRightsById(scope.row,itemz.id)">
                      {{itemz.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
            <el-button type="warning" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


  </div>
</template>

<script>
  import Breadcrumb from "components/common/Breadcrumb";
  import {getRoles,removeRights} from "network/permission";

  export default {
    name: "Roles",
    components: {Breadcrumb},
    data(){
      return{
        breadPath:['权限管理','角色列表'],
        rolesInfo:[]
      }
    },
    created() {
      getRoles()
        .then(res=>{
          if(res.meta.status !== 200)
            return this.$message.error(res.meta.msg)
          this.rolesInfo = res.data
        })
    },

    methods:{
      //移除权限
      removeRightsById(role,rightsId){
        this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeRights(role.id,rightsId)
            .then(res=>{
              if(res.meta.status !==200)
                return this.$message.error(res.meta.msg)
              role.children = res.data
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>

  .bdbotm{
    border-bottom: 1px solid #eee;
  }
  .el-tag{
    margin:7px;
  }
  .bdtop{
    border-top: 1px solid #eee;
  }
  .vcenter{
    display: flex;
    align-items: center;
  }
</style>