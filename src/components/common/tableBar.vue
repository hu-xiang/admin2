<template>
  <div class="table-bar">
    <div class="top">
      <slot name="top"></slot>
    </div>
    <div class="table">
      <slot name='table'></slot>
    </div>
    <div class="page">
      <slot name='page'></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.table-bar {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 12px;
  margin-top: 7px;
}
.table {
  margin-top: 7px;
}
.page {
  margin-top: 7px;
}
</style>
