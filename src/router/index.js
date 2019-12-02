import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login';
import Index from '@/components/Index';
import ErrorApp from '@/components/common/error';  // 错误页面

/** 业务代码 */
// 工作台页面
import myApplication from '@/components/pages/workBench/myApplication/index.vue';
import myApproval from '@/components/pages/workBench/myApproval/index.vue';
import approvalQuery from '@/components/pages/workBench/approvalQuery/index.vue';
import news from '@/components/pages/workBench/news/index.vue';
// 出差申请页面
import travelEntry from '@/components/pages/travelApply/travelEntry/index.vue';
import travelQuery from '@/components/pages/travelApply/travelQuery/index.vue';
// 费用报销页面
import feeEntry from '@/components/pages/reimbursement/feeEntry/index.vue';
import feeQuery from '@/components/pages/reimbursement/feeQuery/index.vue';
// 预算管理页面
import budgetApproval from '@/components/pages/budgetManage/budgetApproval/index.vue';
import budgetChange from '@/components/pages/budgetManage/budgetChange/index.vue';
import budgetEntry from '@/components/pages/budgetManage/budgetEntry/index.vue';
import classMaintenance from '@/components/pages/budgetManage/classMaintenance/index.vue';
import liveSetting from '@/components/pages/budgetManage/liveSetting/index.vue';
import rightSetting from '@/components/pages/budgetManage/rightSetting/index.vue';
import subsidySetting from '@/components/pages/budgetManage/subsidySetting/index.vue';
import transSetting from '@/components/pages/budgetManage/transSetting/index.vue';
// 报表分析页面
import budget from '@/components/pages/reportAnalysis/budget/index.vue';
import fee from '@/components/pages/reportAnalysis/fee/index.vue';
import travel from '@/components/pages/reportAnalysis/travel/index.vue';
// 人事资料页面
import userInfo from '@/components/pages/personInfo/userInfo/index.vue';
import depart from '@/components/pages/personInfo/depart/index.vue';
import rank from '@/components/pages/personInfo/rank/index.vue';
import position from '@/components/pages/personInfo/position/index.vue';
import role from '@/components/pages/personInfo/roleManage/index.vue';
import roleAdd from '@/components/pages/personInfo/roleManage/add.vue';
import roleEdit from '@/components/pages/personInfo/roleManage/edit.vue';
// 系统管理页面
import globalData from '@/components/pages/sysManage/globalData/index.vue';
import comCode from '@/components/pages/sysManage/comCode/index.vue';
import accountSubject from '@/components/pages/sysManage/accountSubject/index.vue';
import costCenter from '@/components/pages/sysManage/costCenter/index.vue';
import zone from '@/components/pages/sysManage/zone/index.vue';

Vue.use(Router)

export default new Router({
  routes: [
    { // 错误页面
      path: "*",
      redirect: "/error"
    },{ // 登录页面
      path: '/',
      name: 'Login',
      component: Login
    },{ // 主页面
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        // 工作台页面路由
        {
          path: '/myApplication',
          name: '我的申请',
          component: myApplication,
        },
        {
          path: '/myApproval',
          name: '我的审批',
          component: myApproval,
        },
        {
          path: '/approvalQuery',
          name: '审批查询',
          component: approvalQuery,
        },
        {
          path: '/news',
          name: '消息公告',
          component: news,
        },
        // 出差申请页面路由
        {
          path: '/travelEntry',
          name: '出差申请录入',
          component: travelEntry,
        },
        {
          path: '/travelQuery',
          name: '出差申请查询',
          component: travelQuery,
        },
        // 费用报销页面路由
        {
          path: '/feeEntry',
          name: '费用报销录入',
          component: feeEntry,
        },
        {
          path: '/feeQuery',
          name: '费用报销查询',
          component: feeQuery,
        },
        // 预算管理页面路由
        {
          path: '/budgetEntry',
          name: '预算录入',
          component: budgetEntry,
        },
        {
          path: '/budgetChange',
          name: '预算调整',
          component: budgetChange,
        },
        {
          path: '/budgetApproval',
          name: '预算审批',
          component: budgetApproval,
        },
        {
          path: '/rightSetting',
          name: '审批签权设定',
          component: rightSetting,
        },
        {
          path: '/transSetting',
          name: '出差交通费设定',
          component: transSetting,
        },
        {
          path: '/subsidySetting',
          name: '出差补助设定',
          component: subsidySetting,
        },
        {
          path: '/liveSetting',
          name: '出差住宿费设定',
          component: liveSetting,
        },
        {
          path: '/classMaintenance',
          name: '预算类别维护',
          component: classMaintenance,
        },
        // 报表分析页面路由
        {
          path: '/budget',
          name: '预算执行状况',
          component: budget,
        },
        {
          path: '/fee',
          name: '费用报销明细',
          component: fee,
        },
        {
          path: '/travel',
          name: '出差申请明细',
          component: travel,
        },
        // 人事资料页面路由
        {
          path: '/userInfo',
          name: '人员信息',
          component: userInfo,
        },
        {
          path: '/depart',
          name: '部门组织结构',
          component: depart,
        },
        {
          path: '/rank',
          name: '职级维护',
          component: rank,
        },
        {
          path: '/position',
          name: '岗位维护',
          component: position,
        },
        {
          path: '/role',
          name: '角色管理',
          component: role,
        },
        { // 在nav.json不需要配置，不用新开tab
          path: '/roleAdd',
          name: '新增角色',
          component: roleAdd,
        },
        { // 在nav.json不需要配置，不用新开tab
          path: '/roleEdit',
          name: '编辑角色',
          component: roleEdit,
        },
        // 系统管理页面路由
        {
          path: '/globalData',
          name: '系统全局参数设定',
          component: globalData,
        },
        {
          path: '/comCode',
          name: '公司代码维护',
          component: comCode,
        },
        {
          path: '/accountSubject',
          name: '会计科目维护',
          component: accountSubject,
        },
        {
          path: '/costCenter',
          name: '成本中心维护',
          component: costCenter,
        },
        {
          path: '/zone',
          name: '地区区域维护',
          component: zone,
        },
        // 错误页面路由
        {
          path: '/error',
          name: '错误页面',
          component: ErrorApp,
        }
      ]
    }
  ]
})
