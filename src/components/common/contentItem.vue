<template>
  <div :class="s.content">
    <h3>{{title}}</h3>
    <div :class="s.wrap" :style="{width: width}">
      <slot :class="s.slot"></slot>
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
    width: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" module="s">
.content {
  min-width: 800px;
  > h3 {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0px;
    color: #000000;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    &::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 14px;
      background-color: #ffc000;
      border-radius: 2px;
      margin-right: 10px;
    }
  }
}
</style>
