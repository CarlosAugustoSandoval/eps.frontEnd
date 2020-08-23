<template>
  <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="value"
      :color="color"
  >
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    absolute: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 0.7
    },
    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>

<style scoped>

</style>