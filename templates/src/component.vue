<template>
  <div class="{{componentName}}" v-bind="$attrs" v-on="$listeners">
    hello
  </div>
</template>

<script>
export default {
  name: '{{componentNamePascal}}',
  props: {},
  data() {
    return {}
  }
}
</script>

<style lang="less"></style>
