<template>
  <div class="login-container pull-height" @keyup.enter.native="submitForm('ruleForm')">
    <div class="video_wrapper">
      <video autoplay muted loop>
        <source src="../assets/img/login/login-bg.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="login-info text-whit fadeInLeft">
      <h2 class="login-info-title">{{$t('message.comName')}} - {{$t('message.systemName')}}</h2>
      <ul class="login-info-list">
        <li class="login-info-item">
          <i class="el-icon-check"></i>&nbsp;{{$t('message.systemInfo1')}}
        </li>
        <li class="login-info-item">
          <i class="el-icon-check"></i>&nbsp;{{$t('message.systemInfo2')}}
        </li>
      </ul>
    </div>
    <div class="login-border fadeInRight">
      <div class="login-main">
        <h2 class="login-title">{{$t('message.comName')}}-{{$t('message.systemName')}}</h2>
        <el-form
          class="login-form"
          status-icon
          :rules="rules"
          ref="ruleForm"
          :model="ruleForm"
          label-width="0"
        >
          <el-form-item prop="username">
            <el-input
              size="small"
              @keyup.enter.native="submitForm('ruleForm')"
              v-model="ruleForm.username"
              auto-complete="off"
              :placeholder="$t('message.userNameTips')"
            >
              <i slot="prefix" class="el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              size="small"
              @keyup.enter.native="submitForm('ruleForm')"
              :type="passwordType"
              v-model="ruleForm.password"
              auto-complete="off"
              :placeholder="$t('message.passwordTips')"
            >
              <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
              <i slot="prefix" class="el-icon-unlock"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              @click.native.prevent="submitForm('ruleForm')"
              class="login-submit"
            >{{$t('message.login')}}</el-button>
          </el-form-item>
        </el-form>
        <el-select v-model="lang" placeholder="请选择" class="login-language" @change="changeLang">
          <el-option
            v-for="item in $t('message.languageArr')"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
  </div>
  <!-- <div class="login-app">
		<div class="login-outbox">
			<div class="login-box">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" class="login-ruleForm">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="ruleForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="ruleForm.password"></el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" @click="submitForm('ruleForm')" class="login-btn">登录</el-button>
			</div>
		</div>
  </div>-->
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // 目前写死的路由权限配置数据
      resourceCodes: [
        "/workBench",
        "/myApplication",
        "/myApproval",
        "/approvalQuery",
        "/news",
        "/travelApply",
        "/travelEntry",
        "/travelQuery",
        "/reimbursement",
        "/feeEntry",
        "/feeQuery",
        "/budgetManage",
        "/budgetEntry",
        "/budgetChange",
        "/budgetApproval",
        "/rightSetting",
        "/transSetting",
        "/subsidySetting",
        "/liveSetting",
        "/classMaintenance",
        "/reportAnalysis",
        "/budget",
        "/fee",
        "/travel",
        "/personInfo",
        "/userInfo",
        "/depart",
        "/rank",
        "/position",
        "/role",
        "/role",
        "/roleAdd",
        "/roleEdit",
        "/roleDelete",
        "/sysManage",
        "/globalData",
        "/comCode",
        "/accountSubject",
        "/costCenter",
        "/zone"
      ],
      ruleForm: {
        username: "",
        password: ""
      },
      passwordType: "password",
      lang: ""
    };
  },
  computed: {
    rules() {
      return {
        username: [
          {
            required: true,
            message: this.$t("message.userNameTips"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("message.passwordTips"),
            trigger: "blur"
          }
        ]
      };
    }
  },
  mounted() {
    this.lang = this.$i18n.locale;
    this.$nextTick(function() {
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    login() {
      // 登录
      this.$axios.post("/sys/login", this.ruleForm).then(res => {
        if (res && res.success) {
          sessionStorage.setItem("token", res.result.token);
          sessionStorage.setItem("resourceCodes", this.resourceCodes); // 后台还没提供目前写死的数据
          this.$router.push("/index");
        }
      });
    },
    showPassword() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    changeLang(val) {
      this.$i18n.locale = val;
      sessionStorage.setItem('lang', val)

    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
// .login-app{
// 	width: 100%;
// 	height: 100%;
// 	background-image: url('../../src/assets/img/login/login_bg.png');
// 	background-repeat: no-repeat;
// 	background-color: #b8e5f8;
// 	background-size: cover;
// 	overflow: auto;
// 	.login-outbox{
// 		flex: 1 1;
// 		display: flex;
// 		flex-direction: column;
// 		align-items: center;
// 		justify-content: center;
// 		min-height: 688px;
// 		height: calc(100% - 42px);
// 		.login-box {
// 			width: 432px;
// 			margin: 0 auto;
// 		    background: #FFFFFF;
// 			overflow: hidden;
// 			border-radius: 2px;
// 			padding: 30px;
// 			box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
// 			.login-ruleForm{
// 			}
// 			.login-btn{
// 				display: block;
// 				margin: 0 auto;
// 			}
// 		}
// 	}
// }

.login-container {
  min-width: 1000px;
  min-height: 450px;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
  > footer {
    position: absolute;
    bottom: 40px;
    left: 0;
    height: 60px;
    width: 100%;
    text-align: center;
    text-shadow: 2px 2px 2px #999;
    color: #fff;
    > p {
      font-size: 12px;
    }
  }
}

.video_wrapper {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  > video {
    object-fit: cover;
    background-size: cover;
  }
}
.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/login/login.jpg");
  background-size: cover;
}

.login-info {
  z-index: 1;
  padding-left: 60px;
  width: 380px;
}

.login-info-title {
  line-height: 90px;
  display: flex;
  justify-content: flex-start;
  color: #fff;
}

.login-info-item {
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  color: #fff;
}

.login-border {
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 40px 25px 40px;
  background-color: rgba(0,0,0,0.5);
  box-shadow: 1px 1px 2px #eee;
  border-radius: 6px;
}

.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  //background-color: #fff;
}

.login-main > h3 {
  margin-bottom: 20px;
}

.login-main > p {
  color: #76838f;
}
.login-language {
  width: 100px;
  margin-left: 95px;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  color: #f45d2f;
  letter-spacing: 3px;
}

.login-submit {
  margin-top: 20px;
  width: 100%;
  border-radius: 28px;
}

.login-form {
  margin: 10px 0;
  .el-form-item {
    margin-bottom: 16px;
    & /deep/ .el-form-item__content {
      width: 290px;
    }
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
</style>