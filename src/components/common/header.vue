<template>
    <div class="header-app">
        <div class="header-left">
            <img src="../../assets/img/logo.gif"/>
            <!-- <span>闻泰科技</span>
            <span class="shu">|</span>
            <span>报账系统</span> -->
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" background-color="#303133" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            <el-menu-item :index="String(index)" v-for="(item, index) in navArr" :key="item.id" v-if="$auths(item.routerName)">{{item.authorityName}}</el-menu-item>
        </el-menu>
        <el-dropdown class="header-center" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                {{$t('message.personalCenter')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changePsd">{{$t('message.changePassword')}}</el-dropdown-item>
                <el-dropdown-item command="longinOut">{{$t('message.signOut')}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: 'headerApp',
        props: ["navArr"],
        data (){
            return {
                activeIndex: '0',
            }
        },
        mounted() {
            // 默认选中的头部tab, 因为权限会过滤掉一些tab, 所以需要如下重置默认权限内的第一个
            for (let i=0; i < this.navArr.length; i++) {
                if (this.navArr[i].authorityName === '工作台' && this.$auths(this.navArr[i].routerName)) {
                    this.activeIndex = '0'
                    this.$emit("left-aside", this.navArr[0]);
                    break
                }
                if (this.navArr[i].authorityName === '出差申请' && this.$auths(this.navArr[i].routerName)) {
                    this.activeIndex = '1'
                    this.$emit("left-aside", this.navArr[1]);
                    break
                }
                if (this.navArr[i].authorityName === '费用报销' && this.$auths(this.navArr[i].routerName)) {
                    this.activeIndex = '2'
                    this.$emit("left-aside", this.navArr[2]);
                    break
                }
                if (this.navArr[i].authorityName === '预算管理' && this.$auths(this.navArr[i].routerName)) {
                    this.activeIndex = '3'
                    this.$emit("left-aside", this.navArr[3]);
                    break
                }
                if (this.navArr[i].authorityName === '报表分析' && this.$auths(this.navArr[i].routerName)) {
                    this.activeIndex = '4'
                    this.$emit("left-aside", this.navArr[4]);
                    break
                }
                if (this.navArr[i].authorityName === '人事资料' && this.$auths(this.navArr[i].routerName)) {
                    this.activeIndex = '5'
                    this.$emit("left-aside", this.navArr[5]);
                    break
                }
                if (this.navArr[i].authorityName === '系统管理' && this.$auths(this.navArr[i].routerName)) {
                    this.activeIndex = '6'
                    this.$emit("left-aside", this.navArr[6]);
                    break
                }
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$emit("left-aside", this.navArr[Number(key)]);
            },
            handleCommand(val){
                if(val == 'longinOut'){  // 退出登录
                    this.$confirm(this.$t('message.tipsTitle'), this.$t('message.tips'), {
                        confirmButtonText: this.$t('message.okBtn'),
                        cancelButtonText: this.$t('message.cancelBtn'),
                        type: 'warning'
                    }).then(() => {
                        this.$router.push("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: this.$t('message.cancelledTips'),
                        });          
                    });
                }else if(val == 'changePsd'){  // 修改密码

                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header-app {
        width: 100%;
        height:60px;
        background-color: #303133;
        // padding: 0 40px;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        .header-left {
            width: 240px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            .shu {
                display: inline-block;
                margin: 0 5px;
            }
            > span {
                font-family: MicrosoftYaHei-Bold;
                font-size: 20px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0px;
                color: rgb(255, 208, 75);
            }
        }
        .el-menu-header{
            justify-content: flex-end;
            background-color: #303133;
            background-color: rgba(0,0,0,0.7);
            border-bottom: none;
            flex-grow: 1;
        }
        .header-center{
            margin-right: 40px;
            //margin-left: 50px;
            color: #fff;
            font-size: 14px;
            justify-content: flex-end;
        }
    }
</style>
