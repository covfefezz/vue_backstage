<template>
  <div>
    <breadcrumb :breadPath="breadPath"></breadcrumb>

    <el-card>
      <!--添加角色-->
      <el-row>
        <el-button type="primary" @click="addRoleBtn">添加角色</el-button>
      </el-row>
      <!--角色展示区-->
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
            <el-button type="primary" icon="el-icon-edit" @click="editRoleById(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteRoleById(scope.row)">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" @click="setRightsDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--分配权限的弹窗-->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="30%">
      <el-tree
        :data="rightsList"
        :props="defProps"
        :default-checked-keys="defKeys"
        default-expand-all
        node-key="id"
        show-checkbox
        check-on-click-node
        ref="setRightRefs">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑角色的弹窗-->
    <el-dialog title="修改角色" :visible.sync="editRoleDialogVisible" width="50%">
      <el-form :model="currentRole" ref="editRoleFormRef" label-width="80px" :rules="editRoleFormRule">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="currentRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="currentRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!--添加角色的弹窗-->
    <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible" width="50%" @close="addRoleDialogClose">
      <el-form :model="newRole" ref="addRoleFormRef" label-width="80px" :rules="editRoleFormRule">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="newRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="newRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Breadcrumb from "components/common/Breadcrumb";
  import {getRoles,removeRights,getRights,setRights,removeRole,editRole,addRole} from "network/permission";

  export default {
    name: "Roles",
    components: {Breadcrumb},
    data(){
      return{
        breadPath:['权限管理','角色列表'],
        rolesInfo:[],
        setRightDialogVisible:false,
        rightsList:[],
        defProps:{
          children:'children',
          label:'authName'
        },
        defKeys:[],
        currentRole:{},
        editRoleDialogVisible:false,
        editRoleFormRule:{
          roleName:[
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ]
        },
        addRoleDialogVisible:false,
        newRole:{
          roleName:'',
          roleDesc:''
        }
      }
    },
    created() {
      this.getRolesList()
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
      },

      // 分配权限
      setRightsDialog(role){
        //获取所有权限列表
        this.defKeys=[]
        this.currentRole = role
        getRights('tree')
          .then(res=>{
            if(res.meta.status !==200)
              return this.$message.error(res.meta.msg)
            this.rightsList = res.data
          })
        this.getRightsId(role,this.defKeys)
        this.setRightDialogVisible = true;

      },

      //获取角色已有权限的id
      getRightsId(node,arr){
        if(!node.children)
          return arr.push(node.id)
        node.children.forEach(item=>{
          this.getRightsId(item,arr)
        })
      },

      //分配权限提交
      setRightSubmit(){
        const keys=[...this.$refs.setRightRefs.getCheckedKeys(),...this.$refs.setRightRefs.getHalfCheckedKeys()]
        const keysStr = keys.join(',')
        setRights(this.currentRole.id,keysStr)
          .then(res=>{
            if(res.meta.status !==200)
              return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            this.getRolesList()
            this.setRightDialogVisible=false
          })
      },

      //获取角色列表
      getRolesList(){
        getRoles()
          .then(res=>{
            if(res.meta.status !== 200)
              return this.$message.error(res.meta.msg)
            this.rolesInfo = res.data
          })
      },

      //删除角色
      deleteRoleById(role){
        this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeRole(role.id)
            .then(res=>{
              if(res.meta.status !==200)
                return this.$message.error(res.meta.msg)
              this.$message.success(res.meta.msg)
              this.getRolesList()
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // 编辑角色
      editRoleById(role){
        this.currentRole = role
        this.editRoleDialogVisible=true
      },

      //编辑角色提交
      editRoleSubmit(){
        editRole(this.currentRole)
          .then(res=>{
            if(res.meta.status !== 200)
              return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            this.getRolesList()
            this.editRoleDialogVisible=false
          })
      },

      //添加角色
      addRoleBtn(){
        this.addRoleDialogVisible = true
      },

      //添加角色提交
      addRoleSubmit(){
        addRole(this.newRole)
          .then(res=>{
            if(res.meta.status !==201)
              return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            this.getRolesList()
            this.addRoleDialogVisible = false
          })
      },

      //关闭添加角色弹窗，重置输入框
      addRoleDialogClose(){
        this.$refs.addRoleFormRef.resetFields()
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
  .el-table{
    margin-top: 20px;
  }
</style>