<template>
  <div class="top-bar content">
    <div class="slot"
      ref="reference">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.$refs.reference.querySelectorAll('section').forEach((item) => {
      item.style.width = this.width;
    });
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 12px 12px 5px;
}
.top {
  > p {
    color: #70829a;
    font-size: 14px;
    > span {
      color: #70829a;
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
.slot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  > section {
    /* width: 260px; */
    margin-right: 7px;
    margin-bottom: 7px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #70829a;
    > label {
      font-size: 12px;
      color: #909399;
      background-color: #f5f7fa;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      height: 30px;
      line-height: 30px;
      padding: 0 8px;
      white-space: nowrap;
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    /deep/ .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      padding: 0 8px;
    }
    /deep/ .el-range-editor .el-range-input {
        font-size: 12px;
        width: 45%;
    }
    /deep/ .el-date-editor .el-range-separator {
        font-size: 12px;
        width: 12%;
    }
    /deep/ .el-select {
      width: 100%;
    }
    /deep/ .el-cascader {
      width: 100%;
    }
    /deep/ .el-input-group__prepend {
      padding: 0 8px;
    }
    /deep/ .el-range__icon {
      display: none;
    }
    /deep/ .el-range-separator {
      line-height: 30px;
      height: 30px;
    }
  }
}
</style>
