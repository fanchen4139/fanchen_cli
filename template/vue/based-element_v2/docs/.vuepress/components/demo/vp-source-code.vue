<template>
  <div class="example-source-wrapper">
    <div class="example-source language-vue" v-html="decoded" />
  </div>
</template>

<script>
export default {
  name: 'vp-source-code',
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  computed: {
    decoded() {
      return decodeURIComponent(this.source)
    }
  },
  data() {
    return {

    }
  },
  methods:{

  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.language-vue {
  background-color: rgba(0,0,0, .8);
  margin: 0;
  border-radius: 0;
}
</style>