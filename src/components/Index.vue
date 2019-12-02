<template>
    <div class="index-app">
        <el-container>
            <el-header>
                <header-app :navArr="navArr" @left-aside="changeLeftAside" />
            </el-header>
            <el-container>
                <el-aside :width="isCollapse ? '64px' :'240px'"><left-aside :leftArr="leftArr" :isCollapse="isCollapse" @select-menu="handleSelectMenu" /></el-aside>
                <el-container>
                    <el-main>
                        <el-tabs class="header-nav" :closable="editableTabs.length > 1" v-show="editableTabs.length > 0" v-model="editableTabsValue" type="card" @edit="handleTabsEdit" @tab-click="handleMenuChange">
                            <el-tab-pane :key="item.id" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
                            </el-tab-pane>
                        </el-tabs>
                        <div class="main-box">
                            <router-view></router-view>
                        </div>
                    </el-main>
                    <el-footer><footer-app /></el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import header from './common/header.vue';
    import leftAside from './common/leftside.vue';
    import footer from './common/footer.vue';
    import navData from  '../assets/json/nav.json';
    export default {
        name: 'index',
        components: {
            'left-aside' : leftAside,
            "footer-app": footer,
            "header-app": header,
        },
        data (){
            return {
                navArr: navData, // tab标签页列表在nav.json中维护
                leftArr: [],
                editableTabsValue: '',
                editableTabs: [],
                isCollapse: false,
            }
        },
        created() {
            
        },
        mounted() {
			this.$nextTick(function() {
                this.editableTabs = [{title: this.leftArr[0].authorityName, name: this.leftArr[0].routerName, id: this.leftArr[0].id}];
                this.editableTabsValue = this.leftArr[0].routerName;
                this.$router.push(this.leftArr[0].routerName);
            });
        },
        methods: {
            changeLeftAside(data){
                this.leftArr = data.childAuthorities ? data.childAuthorities : [];
            },
            handleSelectMenu(data){
                this.handleTabsEdit(data.routerName, 'add', data);
            },
            handleTabsEdit(targetName, action, data) {
                if (action === 'add') {
                    let newTabName = targetName;
                    let flag = true;
                    for(let i = 0; i < this.editableTabs.length; i++){
                        let item = this.editableTabs[i];
                        if(item.name === targetName){
                            flag = false;
                            break;
                        }
                    }
                    if(flag){
                        this.editableTabs.push({
                            title: data.authorityName,
                            name: newTabName,
                            id: data.id
                        });
                    }
                    this.editableTabsValue = newTabName;
                }
                if (action === 'remove') {
                    let tabs = this.editableTabs;
                    let activeName = this.editableTabsValue;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        });
                    }
                    this.editableTabsValue = activeName;
                    this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                    if(this.editableTabs.length === 0){
                        this.$router.push('/index');
                    }else{
                        this.$router.push(activeName);
                    }
                }
            },
            handleMenuChange(tab, event){
                let targetName = tab.name;
                this.$router.push(targetName);
            },
            changeIsCollapse(){
                this.isCollapse = !this.isCollapse;
            }
        },
        watch: {
            $route(to, from) {
                let targetName = to.path;
                for(let i = 0; i < this.editableTabs.length; i++){
                    let item = this.editableTabs[i];
                    if(item.name === targetName){
                        this.editableTabsValue = targetName;
                        break;
                    }
                }
			}
        }
    }
</script>

<style lang="scss" scoped>
    .index-app {
        width: 100%;
        height: 100%;
        .el-container{
            height: 100%;
            .el-main {
                position: relative;
                background-color: #f0f2f5;
                color: #333;
                padding: 46px 0px 10px;
                height: 100%;
                overflow: hidden;
                .header-nav{
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    height: 36px;
                    width: 100%;
                    background-color: #fff;
                    /deep/ .el-tabs__item {
                        height: 36px;
                        line-height: 36px;
                    }
                }
                .main-box{
                    height: 100%;
                    margin: 0 10px;
                    overflow-x: hidden;
                    overflow-y: auto;
                    //background-color: #fff;
                }
            }
            .el-footer {
                //background-color: #fff;
                background-color: rgba(256,256,256,0.5);
                text-align: center;
                line-height: 60px;
            }
            .el-header {
                padding: 0;
            }
        }   
    }
</style>
