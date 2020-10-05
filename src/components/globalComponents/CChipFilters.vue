<template>
  <v-chip
      class="ma-1"
      close
      color="primary darken-2"
      label
      outlined
      @click:close="$emit('close')"
  >
    {{ text }}
  </v-chip>
</template>

<script>
export default {
  name: 'CChipFilters',
  props: {
    value: {
      type: [Number, String, Object, Array],
      default: null
    },
    text: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>

</style>