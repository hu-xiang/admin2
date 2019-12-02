<template>
    <content-bar v-loading="loading"
    footer
    :pathArr="pathArr"
    confirmButtonText="提交"
    @confirm="submit"
    @cancel="$router.go(-1)">
    <el-form :model="form"
      ref="form"
      :rules="rules"
      label-width="150px">
      <content-item title="基本信息"
        width="1100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="角色名称"
              prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="角色编码"
              prop="roleCode">
              <el-input v-model="form.roleCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="描述"
              prop="remark">
              <el-input placeholder="请输入描述"
                type="textarea"
                v-model="form.description">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </content-item>
      <content-item title="分配权限"
        width="1100px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="功能菜单"
              prop="resourceCodes">
              <el-tree ref="resTree" class="treeClass"
                :data="treeList"
                show-checkbox
                :default-expand-all="false"
                :default-checked-keys="defaultCheckedKeys"
                :props="defaultProps"
                :filter-node-method="filterNode"
                @check-change="handleCheckChange"
                node-key="path">
                <div slot-scope="{ node, data }"
                  placement="right"
                  trigger="hover"
                  effect="light">
                    <span class="node-name">{{ data.name}}</span>
                </div>
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>
      </content-item>
    </el-form>
  </content-bar>
</template>

<script>
    import permissionList from  '../../../../assets/json/permission.json';
    export default {
        name: 'roleAdd',
        data (){
            return {
                pathArr: ['人事资料', '角色管理', '新增角色'],
                loading: false,
                form: {
                    roleName: '',
                    roleCode: '',
                    description: '',
                    resourceCodes: [],
                },
                defaultProps: {
                    children: 'children',
                    label: 'path',
                },
                treeList: permissionList, // 在权限json里维护权限菜单列表
                filterText: '',
                defaultCheckedKeys: [],
                rules: {
                    roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    ],
                    roleCode: [
                    { required: true, message: '请输入角色编码', trigger: 'blur' },
                    ],
                    resourceCodes: [
                    { required: true, message: '请选择功能菜单', trigger: 'change' },
                    ],
                },
            }
        },
        mounted() {
            console.log(this.$router)
			this.$nextTick(function() {
                
            });
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            handleCheckChange() {
                const list = this.$refs.resTree.getCheckedKeys();
                const listHal = this.$refs.resTree.getHalfCheckedKeys();
                this.form.resourceCodes = list.concat(listHal);
                console.log(this.form.resourceCodes);
            },
            submit() {

            },
        }
    }
</script>

<style lang="scss" scoped>
    .treeClass {
        line-height: 40px;
    }
    /deep/ .el-tree-node__content {
        margin-top: 7px;
    }
</style>