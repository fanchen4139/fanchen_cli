<template>
  <div class="example-showcase">
    <ClientOnly>
      <component :is="demo" v-if="demo" v-bind="$attrs" />
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: 'vp-example',
  props: {
    file: {
      type: String,
      required: true,
    },
    demo: {
      type: String,
      required: true,
    },
  },
  methods:{

  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.example-showcase {
  padding: .5em 1em;
  margin: 0.5px;
  background-color: var(--bg-color);
}
</style>