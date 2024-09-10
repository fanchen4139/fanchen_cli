<template>
  <div id="app">
    <router-view></router-view>
    <DIcon color="#357cff" :size="88"></DIcon>
    <div v-for="item in list">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import "@element-fc_v2/utils/demo/overload/index"
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      list: []
    }
  },
  methods:{

  },
  mounted() {
  }
}
</script>

<style lang='scss' scoped>

</style>