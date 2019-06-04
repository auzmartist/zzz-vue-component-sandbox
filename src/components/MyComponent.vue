<template>
  <div class="my-component">
    <code>{{typeof bool}} &nbsp; &nbsp; {{bool}}</code><br>
    <code>{{typeof num}} &nbsp; &nbsp; {{num}}</code><br>
    <code>{{typeof str}} &nbsp; &nbsp; {{str}}</code><br>
    <code>{{typeof obj}} &nbsp; &nbsp; {{obj}}</code><br>
    <code>{{typeof arr}} &nbsp; &nbsp; {{arr}}</code><br>
  </div>
</template>

<script>
export default {
  name: 'my-component',
  props: {
    bool: Boolean,
    num: {
      type: Number,
      default: 0,
    },
    str: String,
    obj: {
      type: Object,
      default: () => ({}),
    },
    arr: {
      type: Array,
      required: true,
    },
  }
}
</script>

<style lang="stylus" scoped>
.my-component {
  padding: 16px
  border: 1px solid #aaa
  border-radius: 6px
  color: white
}
</style>
