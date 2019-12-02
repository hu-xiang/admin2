<template>
  <div>
    <div :class="s.mainRightTop">
          <div :class="s.back"
            @click="$router.go(-1)">
            <img src="../../assets/img/Return.png" />
            <span>返回</span>
          </div>
          <ul>
            <li v-for="(item,index) in pathArr"
              :key="index">{{item}}<i>></i></li>
          </ul>
    </div>
    <div :class="s.content">
      <header :class="s.title" v-show="title">
      <p>{{title}}</p>
      <i></i>
    </header>
    <main :class="s.body">
      <slot></slot>
    </main>
    <footer :class="s.footer"
      v-show="footer">
      <i></i>
      <el-button type="primary"
        @click="confirm" :disabled="disabled" size="mini">{{confirmButtonText}}</el-button>
      <el-button @click="cancel" size="mini">{{cancelButtonText}}</el-button>
    </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    confirmButtonText: {
      type: String,
      default: '保存',
    },
    cancelButtonText: {
      type: String,
      default: '取消',
    },
    footer: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    pathArr: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
    };
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" module="s">
.content {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0 20px ;
}
.title {
  position: relative;
  font-size: 14px;
  letter-spacing: 2px;
  color: #70829a;
  font-weight: 600;
  padding: 13px 0;
  > i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      to right,
      #ebf0f9 0%,
      #ebf0f9 50%,
      transparent 50%
    );
    background-size: 25px 1px;
    background-repeat: repeat-x;
  }
}
.body {
  position: relative;
  padding: 13px 0;
}
.footer {
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 13px;
  > i {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      to right,
      #ebf0f9 0%,
      #ebf0f9 50%,
      transparent 50%
    );
    background-size: 25px 1px;
    background-repeat: repeat-x;
  }
}
.mainRightTop {
    margin-bottom: 1px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    height: 32px;
    background-color: #ffffff;
    > ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > li {
        font-size: 12px;
        color: #76879d;
        cursor: not-allowed;
        > i {
          padding: 0 5px;
        }
        &:last-child {
          color: #f45d2f;
          cursor: auto;
          > i {
            display: none;
          }
        }
      }
    }
  }
  .back {
  width: 60px;
  height: 22px;
  margin-right: 10px;
  background-color: #ffffff;
  border-radius: 11px;
  border: solid 1px #aeb7c4;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  > span {
    font-size: 12px;
    color: #70829a;
  }
}
.back:hover {
  > span {
    color: #f45d2f;
  }
}
</style>
